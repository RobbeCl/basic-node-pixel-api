import Fastify from "fastify";
import FastifyCors from "fastify-cors";
import { createReadStream, fstat, readFile, readFileSync } from "fs";
import path from "path";

const fastify = Fastify({
  logger: true,
});

fastify.register(FastifyCors, {
  // put your options here
});

fastify.server.addListener("request", (req) => {
  console.log("------------------New request!");
});

// Todo:

// Links endpoint:
// Create link
// Delete link
// update link
// Statistics endpoint

const tracking = {
  name: "name of the link",
  userId: "user who created the link",
};

const trackingPixel = {
  trackingId: "trackingId",
  url: "url",
};

const statistics = [
  {
    ip: "xxxx",
    browser: "yyyy",
    date: "zzz",
  },
];

// User endpoint:
// Create
// Login

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

  response.send(createReadStream(path.join(process.cwd(), "src", "pixel.png")));
});

// Run the server!
fastify.listen(
  {
    port: 3000,
    host: "0.0.0.0",
  },
  function (err, address) {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    // Server is now listening on ${address}
  }
);
