import { z, ZodType } from "zod";

export class AddressValidation {
  static readonly CREATE: ZodType = z.object({
    contact_id: z.number().positive().min(1),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(255).optional(),
    province: z.string().min(1).max(255).optional(),
    country: z.string().min(1).max(255),
    postal_code: z.string().min(1).max(10)
  })

  static readonly GET: ZodType = z.object({
    contact_id: z.number().positive().min(1),
    address_id: z.number().positive().min(1),
  })

  static readonly UPDATE: ZodType = z.object({
    id: z.number().positive().min(1),
    contact_id: z.number().positive().min(1),
    street: z.string().min(1).max(255).optional(),
    city: z.string().min(1).max(255).optional(),
    province: z.string().min(1).max(255).optional(),
    country: z.string().min(1).max(255),
    postal_code: z.string().min(1).max(10)
  })

  static readonly REMOVE: ZodType = z.object({
    contact_id: z.number().positive().min(1),
    address_id: z.number().positive().min(1),
  })
}