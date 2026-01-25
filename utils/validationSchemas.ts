import { z } from 'zod'

// Wedding basic info schema
export const weddingSchema = z.object({
  slug: z.string()
    .min(3, 'validation.slug.min')
    .max(50, 'validation.slug.max')
    .regex(/^[a-z0-9-]+$/, 'validation.slug.format'),
  title: z.string()
    .min(3, 'validation.title.min')
    .max(100, 'validation.title.max')
    .optional(),
  language: z.enum(['en', 'id']),
  theme: z.string(),
  published: z.boolean(),
})

// Couple info schema
export const coupleSchema = z.object({
  bride_callname: z.string()
    .min(2, 'validation.name.min')
    .max(50, 'validation.name.max'),
  bride_fullname: z.string()
    .min(3, 'validation.fullname.min')
    .max(100, 'validation.fullname.max'),
  bride_info_1: z.string().max(200).optional(),
  bride_info_2: z.string().max(200).optional(),
  bride_info_3: z.string().max(200).optional(),
  groom_callname: z.string()
    .min(2, 'validation.name.min')
    .max(50, 'validation.name.max'),
  groom_fullname: z.string()
    .min(3, 'validation.fullname.min')
    .max(100, 'validation.fullname.max'),
  groom_info_1: z.string().max(200).optional(),
  groom_info_2: z.string().max(200).optional(),
  groom_info_3: z.string().max(200).optional(),
})

// Event schema
export const eventSchema = z.object({
  event_type: z.string().min(1, 'validation.eventType.required'),
  title: z.string()
    .min(3, 'validation.title.min')
    .max(100, 'validation.title.max'),
  start_time: z.string().min(1, 'validation.time.required'),
  end_time: z.string().optional(),
  location_name: z.string().max(200).optional(),
  location_address: z.string().max(500).optional(),
  map_url: z.string().url('validation.url.invalid').optional().or(z.literal('')),
  order_index: z.number(),
})

// Gift schema (conditional - only validate if fields are provided)
export const giftSchema = z.object({
  type: z.enum(['bank', 'ewallet', 'crypto']),
  provider: z.string().optional(),
  account_name: z.string().optional(),
  account_number: z.string().optional(),
  is_active: z.boolean(),
}).refine(
  (data) => {
    // If any field is filled, all required fields must be filled
    const hasAnyField = data.provider || data.account_name || data.account_number
    if (hasAnyField) {
      return data.provider && data.provider.length >= 1 &&
             data.account_name && data.account_name.length >= 3 &&
             data.account_number && data.account_number.length >= 3
    }
    return true
  },
  {
    message: 'validation.gift.incomplete'
  }
)

// Live stream schema
export const liveStreamSchema = z.object({
  platform: z.string().optional(),
  url: z.string().url('validation.url.invalid').optional().or(z.literal('')),
  event_date: z.string().optional(),
  start_time: z.string().optional(),
  is_active: z.boolean(),
}).optional()

// Wedding audio schema
export const weddingAudioSchema = z.object({
  system_audio_id: z.number().optional(),
  custom_audio_url: z.string().url('validation.url.invalid').optional().or(z.literal('')),
  autoplay: z.boolean(),
  loop: z.boolean(),
  is_active: z.boolean(),
}).optional()

// Complete invitation form schema
export const invitationFormSchema = z.object({
  wedding: weddingSchema,
  couple: coupleSchema,
  events: z.array(eventSchema).min(1, 'validation.events.min'),
  gifts: z.array(giftSchema).optional(),
  liveStream: liveStreamSchema,
  audio: weddingAudioSchema,
})

export type InvitationFormData = z.infer<typeof invitationFormSchema>
export type WeddingFormData = z.infer<typeof weddingSchema>
export type CoupleFormData = z.infer<typeof coupleSchema>
export type EventFormData = z.infer<typeof eventSchema>
export type GiftFormData = z.infer<typeof giftSchema>
export type LiveStreamFormData = z.infer<typeof liveStreamSchema>
export type WeddingAudioFormData = z.infer<typeof weddingAudioSchema>
