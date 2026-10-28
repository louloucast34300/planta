
// import * as ReqPlantDto from './dto/request-plant-dto.js';

import {z} from 'zod'

export const create = z.object({
    name: z.string().trim().min(1),
    purchase: z.coerce.date().optional(),
    featuredImage: z.string().optional(),
    specieId: z.uuid().optional()
})

export type CreateType = z.infer<typeof create>

// on rajoute nullable pour pouvoir enlever une infos de l'objet

export const update = z.object({
    name:z.string().trim().min(1).optional(),
    purchase: z.coerce.date().nullable().optional(),
    featuredImage: z.string().nullable().optional(),
    specieId: z.uuid().nullable().optional()
})

export type UpdateType= z.infer<typeof update>