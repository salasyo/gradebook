import * as z from "zod"

export const sectionFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  description: z.string().min(3, 'Description must be at least 3 characters').max(40, 'Description must be less than 400 characters'),
  room: z.string().min(3, 'Room must be at least 3 characters').max(40, 'Room must be less than 400 characters'),
  startDateTime: z.date(),
  endDateTime: z.date(),
  categoryId: z.string(),
  // isEnrolled: z.boolean(),
})