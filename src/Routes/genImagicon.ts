import { FastifyInstance, FastifyRequest, FastifyServerOptions } from "fastify"

type Req = FastifyRequest<{
  Params: {
    string: string
  }
}>

const genImagicon = async (app: FastifyInstance) => {
  app.get("/", (_req, res) => {
    res.send({ data: "Hello" })
  })
  app.get("/genImagicon/:string", (req: Req, res) => {
    res.send(req.params.string)
  })
}

export default genImagicon
