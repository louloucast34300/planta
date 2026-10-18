import { z } from 'zod'
import { Specie } from '../species.entity.js'




export const ResponseSpecieSchema = z.object({
    id: z.string(),
    name: z.string(),
    description:z.string().nullable()
})

export type ResponseType = z.infer<typeof ResponseSpecieSchema>

export function parsed (specie: Specie): ResponseType {
    return {
        id: specie.id,
        name: specie.name,
        description: specie.description
    }
}