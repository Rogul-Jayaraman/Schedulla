import { z } from "zod";

{
  /* Dashboard */
}
export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username must contain at least 3 characters")
    .max(20, "Username cannot be more than 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers and underscores"
    ),
});

{
  /* create event */
}
export const eventSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(50, "Title must be less than 50 characters"),

  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),

  duration: z.number().int().positive("Duration must be a positive number"),

  isPrivate: z.boolean(),
});

{
  /* day */
}
export const daySchema = z
  .object({
    isAvailable: z.boolean(),
    startTime: z.string().optional(),
    endTime: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.isAvailable) {
        return data.startTime < data.endTime;
      }
      return true;
    },
    {
      message: "End Time must be greater than Start Time",
      path: ["endTime"],
    }
  );

{
  /* availability */
}
export const availabilitySchema = z.object({
  monday: daySchema,
  tuesday: daySchema,
  wednesday: daySchema,
  thursday: daySchema,
  friday: daySchema,
  saturday: daySchema,
  sunday: daySchema,
  timeGap: z.number().min(0, "TimeGap must be more than 0 minutes").int(),
});

{
  /* booking form */
}
export const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid Email Address"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}/, "Invalid Date Format"),
  time: z.string().regex(/^\d{2}:|d{2}/, "Invalid Time Format"),
  additionalInfo: z.string().optional(),
});
