
// import * as ResPlantDto from './dto/response-plant-dto.js';

import { z } from 'zod'
import { Plant } from '../plants.entity.js'
import * as resSpecieDto from '../../species/dto/response-species-dto.js'

export const ResponsePlantSchema = z.object({
  id: z.string(),
  name: z.string(),
  dates: z.object({
    purchase: z.date().nullable(),
  }),
  images: z.object({
    featuredImage: z.string().nullable(),
  }),
  specie: resSpecieDto.ResponseSpecieSchema.nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type ResponseType = z.infer<typeof ResponsePlantSchema>

export function parsed (plant: Plant): ResponseType {
  return {
    id: plant.id,
    name: plant.name,
    dates: {
      purchase: plant.purchase,
    },
    images: {
      featuredImage: plant.featuredImage,
    },
    specie: plant.specie ? resSpecieDto.parsed(plant.specie) : null,
    createdAt: plant.createdAt,
    updatedAt: plant.updatedAt,
  }
}