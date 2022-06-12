import Fastify from "fastify"


import RoutesGenImagicon from "./Routes/genImagicon.js"

const PORT = process.env.PORT || 5001

const app = Fastify({
  logger: {
    prettyPrint:
      process.env.NODE_ENV === "development"
        ? {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        }
        : false,
  },
})



app.register(RoutesGenImagicon)

app.listen(PORT, process.env.HOST || "0.0.0.0", function (err, _address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
