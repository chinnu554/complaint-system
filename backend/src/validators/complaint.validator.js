import {z} from "zod";

const complaintSchema = z.object({
    title:z.string().trim().min(3,"Title should be at least 3 characters long"),
    description:z.string().trim().min(10,"Description should be at least 10 characters long")
})

const idSchema = z.object({
    id:z.string().trim().min(24,"Invalid ID format").max(24,"Invalid ID format")
})

const commentSchema = z.object({
    comment:z.string().trim().min(1,"Comment should not be empty"),
})

export {complaintSchema,idSchema,commentSchema}