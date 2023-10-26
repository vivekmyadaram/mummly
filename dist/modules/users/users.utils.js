import jwt from "jsonwebtoken";
import { JWT_TOKEN_EXPIRY } from "../../config.js";
function getEncodedToken(user) {
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, {
        expiresIn: JWT_TOKEN_EXPIRY,
    });
    return token;
}
export { getEncodedToken };
//# sourceMappingURL=users.utils.js.map