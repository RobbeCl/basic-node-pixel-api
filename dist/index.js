"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fastify_1 = __importDefault(require("fastify"));
var fastify_cors_1 = __importDefault(require("fastify-cors"));
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
var fastify = (0, fastify_1["default"])({
    logger: true
});
fastify.register(fastify_cors_1["default"], {
// put your options here
});
fastify.server.addListener("request", function (req) {
    console.log("------------------New request!");
});
// Todo:
// Links endpoint:
// Create link
// Delete link
// update link
// Statistics endpoint
var tracking = {
    name: "name of the link",
    userId: "user who created the link"
};
var trackingPixel = {
    trackingId: "trackingId",
    url: "url"
};
var statistics = [
    {
        ip: "xxxx",
        browser: "yyyy",
        date: "zzz"
    },
];
// User endpoint:
// Create
// Login
fastify.get("/image/:imageName", function (request, response) {
    var imageName = request.params.imageName;
    var name = imageName.split(":")[0]; // Remove extension
    console.log({ name: name });
    function addInfoToPixel() {
        return __awaiter(this, void 0, void 0, function () {
            var coordinates;
            return __generator(this, function (_a) {
                coordinates = {
                    longitude: request.query.longitude,
                    latitude: request.query.latitude
                };
                console.log({ coordinates: coordinates });
                console.log({ ip: request.ip });
                console.log({ headers: request.headers });
                return [2 /*return*/];
            });
        });
    }
    // Can perfectly run async
    addInfoToPixel();
    // 3. send image back
    response.headers({
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: 0
    });
    response.send((0, fs_1.createReadStream)(path_1["default"].join(process.cwd(), "src", "assets", "pixel.png")));
});
// Run the server!
fastify.listen({
    port: 3000,
    host: "0.0.0.0"
}, function (err, address) {
    if (err) {
        fastify.log.error(err);
        process.exit(1);
    }
    // Server is now listening on ${address}
});
//# sourceMappingURL=index.js.map