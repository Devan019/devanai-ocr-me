import z from "zod";

const extractRequestModel = z.object({
  provider : z.enum(["openai", "google"]),
  fileUrl : z.string(),
  isLocal : z.boolean(),
  fileCategory: z.enum(["image", "pdf", "doc"]),
  mimeType: z.string(),
})

export type ExtractRequest = z.infer<typeof extractRequestModel>;

export { extractRequestModel };