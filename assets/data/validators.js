import {z} from "zod";

{/* Dashboard */}
export const usernameSchema = z.object({
  username: z
    .string()
    .min(3,"Username must contain at least 3 characters")
    .max(20,"Username cannot be more than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    ),
});

{/* create event */}
export const eventSchema = z.object({
  title : z
          .string()
          .min(1,"Title is required")
          .max(50,"Title must be less than 50 characters"),

  description : z
                .string()
                .min(1,"Description is required")
                .max(500,"Description must be less than 500 characters"),

  duration : z
              .number()
              .int()
              .positive("Duration must be a positive number"),

  isPrivate : z.boolean()
})