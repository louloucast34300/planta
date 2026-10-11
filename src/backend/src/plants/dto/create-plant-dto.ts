import {z} from 'zod'

export const createPlantSchema = z.object({
    name: z.string().trim().min(1),
    purchase: z.coerce.date().optional(),
    featuredImage: z.string().optional()
})

export type CreatePlantDto = z.infer<typeof createPlantSchema>