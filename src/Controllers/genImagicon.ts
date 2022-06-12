import canvas from "canvas"
import crypto from "crypto"
import { FastifyReply, FastifyRequest } from "fastify"
const { createCanvas } = canvas



const memoizedData: { [key: string]: Buffer } = {}

const hashString = (string: string) =>
  crypto.createHash("md5").update(string).digest("hex")

const genColor = (string: string): string => {
  let r = 0,
    g = 0,
    b = 0
  const length = string.length

  for (let i = 0; i < length; i++)
    if (i % 3 === 0) r += string.charCodeAt(i)
    else if (i % 3 === 1) g += string.charCodeAt(i)
    else b += string.charCodeAt(i)

  r %= 255
  g %= 255
  b %= 255

  const rgb = `rgb(${r},${g},${b})`

  return rgb === "rgb(0,0,0)" ? genColor(string) : rgb
}

const genImage = (size: number, string: string) => {
  const width = size,
    height = size
  const canvas = createCanvas(width, height)
  const ctx = canvas.getContext("2d")
  ctx.fillStyle = "#fff"
  ctx.fillRect(0, 0, width, height)

  genGrid(ctx, width, height, string)

  return canvas.toBuffer("image/png")
}

const genGrid = (
  ctx: canvas.CanvasRenderingContext2D,
  width: number,
  height: number,
  string: string
) => {
  const size = Math.floor(Math.sqrt(string.length))

  const spacingX = Math.round(width / size),
    spacingY = Math.round(height / size)

  const color = genColor(string)
  for (let i = 0; i < size; i++)
    for (let j = 0; j < size / 2; j++) {
      if (string.charCodeAt((size - 1) * i + j) % 2 === 0) ctx.fillStyle = color
      else ctx.fillStyle = "#fff"
      ctx.fillRect(j * spacingX, i * spacingY, spacingX, spacingY)
      ctx.fillRect((size - j - 1) * spacingX, i * spacingY, spacingX, spacingY)
    }
}

export const genImagiconController = async (req: FastifyRequest<{
  Querystring: {
    size: number,
    seed: string
  }
}>, res: FastifyReply) => {
  const size = Math.min(req.query.size as number || 200, 1080)
  const seed = req.query.seed
  console.log({ memoizedData })

  if (memoizedData[seed])
    return res
      .headers({ "Content-Type": "image/png" })
      .send(memoizedData[seed])

  const hashedString = hashString(seed)
  const image = genImage(size, hashedString)

  memoizedData[seed] = image

  return res
    .headers({ "Content-Type": "image/png", "accept-ranges": "bytes" })
    .send(image)
}
