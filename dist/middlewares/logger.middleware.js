import { log } from "../utils/logger.js";
function logger(_, __, next) {
    log.info(`Request: ${new Date().toISOString()}`);
    next();
}
export { logger };
//# sourceMappingURL=logger.middleware.js.map