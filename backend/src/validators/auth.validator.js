import {z} from "zod";

const loginSchema = z.object({
    username:z.string().trim()
})