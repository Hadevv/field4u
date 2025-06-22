import { z } from "zod";

export const AnnouncementSchema = z
  .object({
    title: z
      .string()
      .min(3, "le titre doit contenir au moins 3 caractères")
      .max(100, "Le titre doit contenir au maximum 100 caractères"),
    description: z
      .string()
      .min(10, "la description doit contenir au moins 10 caractères")
      .max(2000, "La description doit contenir au maximum 2000 caractères"),
    fieldId: z.string().min(1, "veuillez sélectionner un champ"),
    cropTypeId: z.string().min(1, "veuillez sélectionner un type de culture"),
    quantityAvailable: z
      .number()
      .int("la quantité doit être un nombre entier")
      .positive("la quantité doit être positive")
      .min(1, "la quantité doit être d'au moins 1")
      .optional(),
    startDate: z.date({
      required_error: "La date de début est requise",
      invalid_type_error: "Format de date invalide",
    }),
    endDate: z.date({
      required_error: "La date de fin est requise",
      invalid_type_error: "Format de date invalide",
    }),
    suggestedPrice: z
      .number()
      .min(0, "le prix ne peut pas être négatif")
      .max(500, "le prix ne peut pas dépasser 500€")
      .transform((val) => (val === 0 ? undefined : val))
      .nullish()
      .transform((val) => (val === null ? undefined : val)),
    imageFiles: z.array(z.instanceof(File)).optional(),
    images: z.array(z.string()).optional(),
  })
  .refine(
    (data) => !data.startDate || !data.endDate || data.endDate > data.startDate,
    {
      message: "la date de fin doit être postérieure à la date de début",
      path: ["endDate"],
    },
  );

export type AnnouncementSchemaType = z.infer<typeof AnnouncementSchema>;
