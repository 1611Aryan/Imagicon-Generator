import { FastifyInstance, FastifyRequest } from "fastify"
import { genImagiconController } from "../Controllers/genImagicon.js"

type Req = FastifyRequest<{
  Params: {
    string: string
  }
}>

const genImagicon = async (app: FastifyInstance) => {

  app.get("/", genImagiconController)
}

export default genImagicon
