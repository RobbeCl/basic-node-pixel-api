import Fastify from "fastify";
import FastifyCors from "fastify-cors";
import { createReadStream, fstat, readFile, readFileSync } from "fs";

const fastify = Fastify({
  logger: true,
});

fastify.register(FastifyCors, {
  // put your options here
});

fastify.server.addListener("request", (req) => {
  console.log("------------------New request!");
});

fastify.get("/image/:imageName", (request, response) => {
  const imageName = request.params.imageName;
  const name = imageName.split(":")[0]; // Remove extension

  console.log({ name });

  async function addInfoToPixel() {
    // 1. Lookup db for imageName

    // 2. Add statistics
    const coordinates = {
      longitude: request.query.longitude,
      latitude: request.query.latitude,
    };

    console.log({ coordinates });
    console.log({ ip: request.ip });
    console.log({ headers: request.headers });
  }

  // Can perfectly run async
  addInfoToPixel();

  // 3. send image back
  response.headers({
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-cache",
    Expires: 0,
  });

  response.send(createReadStream("./pixel.png"));
});

// Run the server!
fastify.listen(3000, function (err, address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  // Server is now listening on ${address}
});
