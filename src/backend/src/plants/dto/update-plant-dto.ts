import {z} from 'zod'


// on rajoute nullable pour pouvoir enlever une infos de l'objet

export const updatePlantSchema = z.object({
    name:z.string().trim().min(1).optional(),
    purchase: z.coerce.date().nullable().optional(),
    featuredImage: z.string().nullable().optional()
})

export type UpdatePlantDto = z.infer<typeof updatePlantSchema>