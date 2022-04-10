import Fastify from "fastify"

import RoutesGenImagicon from "./Routes/genImagicon.js"

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

app.listen(5000, function (err, _address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
})
