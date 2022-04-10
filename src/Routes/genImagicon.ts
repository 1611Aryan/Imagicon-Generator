import { FastifyInstance, FastifyRequest, FastifyServerOptions } from "fastify"
import { genImagiconController } from "../Controllers/genImagicon.js"

type Req = FastifyRequest<{
  Params: {
    string: string
  }
}>

const genImagicon = async (app: FastifyInstance) => {
  app.get("/", (_req, res) => {
    res.send({ data: "Hello" })
  })
  app.get("/genImagicon/:string", genImagiconController)
}

export default genImagicon
