import { z } from 'zod'
import { Plant } from '../plants.entity.js'

export const ResponsePlantSchema = z.object({
  id: z.string(),
  name: z.string(),
  dates: z.object({
    purchase: z.date().nullable(),
  }),
  images: z.object({
    featuredImage: z.string().nullable(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ResponsePlantDto = z.infer<typeof ResponsePlantSchema>

export function toPlantResponse(plant: Plant): ResponsePlantDto {
  return {
    id: plant.id,
    name: plant.name,
    dates: {
      purchase: plant.purchase,
    },
    images: {
      featuredImage: plant.featuredImage,
    },
    createdAt: plant.createdAt,
    updatedAt: plant.updatedAt,
  }
}