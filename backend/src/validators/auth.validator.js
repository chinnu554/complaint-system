import {z} from "zod";

const loginSchema = z.object({
    email:z.string().trim().email("Invalid email address"),
    password:z.string().trim().min(6,"Password should be at least 6 characters long")
})

const registerSchema = z.object({
    username:z.string().trim().min(3,"Username should be at least 3 characters long"),
    email:z.string().trim().email("Invalid email address"),
    password:z.string().trim().min(6,"Password should be at least 6 characters long")
})

export {loginSchema,registerSchema}