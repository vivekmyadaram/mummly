import { prisma } from "../index.js";
import jwt from "jsonwebtoken";
function authMiddleWare(req, res, next) {
    try {
        const authorization = req.headers["authorization"];
        if (!authorization) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        const [scheme, token] = authorization.split(" ");
        if (scheme !== "Bearer" || !token) {
            return res.status(401).send({ message: "Unauthorized" });
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, async function (err, decoded) {
            if (err) {
                return res.status(401).send({ message: "Unauthorized" });
            }
            const user = await prisma.user.findUnique({
                where: {
                    email: decoded.email,
                },
            });
            if (!user) {
                return res.status(401).send("Unauthorized");
            }
            req.user = user;
            next();
        });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Servce Error", error });
    }
}
export { authMiddleWare };
//# sourceMappingURL=auth.middleware.js.map