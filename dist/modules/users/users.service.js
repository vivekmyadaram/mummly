import bcrypt from "bcrypt";
import { prisma } from "../../index.js";
import { getEncodedToken } from "./users.utils.js";
import { log } from "../../utils/logger.js";
async function createUser(req, res) {
    try {
        const data = req.body;
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = await prisma.user.create({
            data: {
                email: data.email,
                fullName: data.fullName,
                password: hashedPassword,
            },
        });
        const token = getEncodedToken(user);
        res.status(200).json({ message: "Registered successfully", token });
    }
    catch (error) {
        log.error("Internal Servce Error");
        res.status(500).json({ message: "Internal Servce Error", error });
    }
}
async function signIn(req, res) {
    try {
        const data = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email: data.email,
            },
        });
        if (!user) {
            return res
                .status(401)
                .json({ message: "User with the given email doesn't exist" });
        }
        const isPassowordValid = await bcrypt.compare(data.password, user.password);
        if (!isPassowordValid) {
            return res.status(401).json({ message: "Password is wrong" });
        }
        const token = getEncodedToken(user);
        res.status(200).json({ token });
    }
    catch (error) {
        log.error("Internal Servce Error");
        res.status(500).json({ message: "Internal Servce Error", error });
    }
}
export { createUser, signIn };
//# sourceMappingURL=users.service.js.map