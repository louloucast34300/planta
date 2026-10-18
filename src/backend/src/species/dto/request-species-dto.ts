import { z } from 'zod'

export const create = z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().optional()
})

export const update = z.object({
    name: z.string().trim().min(1).optional(),
    description: z.string().nullable().optional()
})

export type CreateType = z.infer<typeof create>
export type UpdateType = z.infer<typeof update>


