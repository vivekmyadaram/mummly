import { log } from "../../utils/logger.js";
async function getProducts(req, res) {
    try {
        return res.status(200).jsonp([{ name: "Apple" }]);
    }
    catch (err) {
        console.log("error", err);
        log.error("Internal Servce Error");
        res.status(500).send("Internal Servce Error");
    }
}
export { getProducts };
//# sourceMappingURL=products.service.js.map