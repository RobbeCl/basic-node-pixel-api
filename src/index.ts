import { ExecOptionsWithStringEncoding } from "child_process";
import Fastify, {
  FastifyRequest,
  RawRequestDefaultExpression,
  RawServerDefault,
  RouteHandler,
  RouteHandlerMethod,
} from "fastify";
import FastifyCors from "fastify-cors";
import { RouteGenericInterface } from "fastify/types/route";
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

interface ImageName extends RouteGenericInterface {
  Params: {
    imageName: string;
  };
  Querystring: {
    longitude: string;
    latitude: string;
  };
}

fastify.get(
  "/image/:imageName",
  (request: FastifyRequest<ImageName>, response) => {
    const imageName = request.params.imageName;
    const name = imageName.split(":")[0]; // Remove extension

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

    response.send(
      createReadStream(path.join(process.cwd(), "src", "assets", "pixel.png"))
    );
  }
);

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
