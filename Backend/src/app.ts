import express from "express";
import cors from "cors";
import expressFileUpload from "express-fileupload";
import vacationRoutes from "./6-routes/vacation-routes";
import followRoutes from "./6-routes/follow-routes";
import authRoutes from "./6-routes/auth-routes"
import routeNotFound from "./3-middleware/route-not-found"
import catchAll from "./3-middleware/catch-all";
import appConfig from "./4-utils/app-config"
import expressRateLimit from "express-rate-limit";
import helmet from "helmet";
import preventXss from "./3-middleware/prevent-xss";
import fileLogger from "./2-models/file-logger";



const server = express();

server.use(cors());
server.use(express.json());
server.use(expressFileUpload());
server.use(fileLogger);



server.use(expressRateLimit({
    windowMs: 1000 * 60,
    limit: 500,
    message: "You have exceeded your requests per minute limit."
}));
server.use(helmet({
    crossOriginResourcePolicy: false,
    crossOriginEmbedderPolicy: false,
}));
server.use(preventXss);



server.use("/api/vacations", vacationRoutes);
server.use("/api/follows", followRoutes);
server.use("/api", authRoutes);


server.use("*", routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () => console.log(`Listening on ${appConfig.serverUrl}`));

