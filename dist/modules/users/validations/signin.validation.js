import z from "zod";
const schema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email"),
    password: z.string({ required_error: "Password is required" }),
});
function validateSigninData(req, res, next) {
    try {
        schema.parse(req.body);
        next();
    }
    catch (err) {
        const message = err?.issues[0]?.message || "Bad Request";
        return res.status(400).json({ message });
    }
}
export { validateSigninData };
//# sourceMappingURL=signin.validation.js.map