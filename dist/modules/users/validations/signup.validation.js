import z from "zod";
const schema = z.object({
    email: z.string().email(),
    fullName: z
        .string({ required_error: "Fullname is required" })
        .min(3, "Fullname must contain at least 3 character(s)")
        .max(30, "Fullname must contain at most 30 character(s)"),
    password: z
        .string({ required_error: "Password is required" })
        .min(8, "Password should be at least of length 3")
        .max(15, "Passoword should be at most of length 15"),
});
function validateSignupData(req, res, next) {
    try {
        schema.parse(req.body);
        next();
    }
    catch (err) {
        const message = err?.issues[0]?.message || "Bad Request";
        return res.status(400).json({ message });
    }
}
export { validateSignupData };
//# sourceMappingURL=signup.validation.js.map