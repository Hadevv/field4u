import { z } from "zod";

export const ContactSupportSchema = z.object({
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export type ContactSupportSchemaType = z.infer<typeof ContactSupportSchema>;
