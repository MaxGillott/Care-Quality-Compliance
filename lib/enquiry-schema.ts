import { z } from "zod";
// Use the interpreted validator under the site's strict CSP. Zod's optional
// dynamic-code probe otherwise raises a browser security issue on form pages.
z.config({ jitless: true });
export const audiences = [
  "Care provider",
  "Family member / relative",
  "Social care professional",
  "Organisation",
  "Other",
] as const;
export const interests = [
  "Consultancy",
  "Quality & compliance",
  "Procurement / tendering",
  "Training",
  "Independent assessment",
  "Family support",
  "Other",
] as const;
export const enquirySchema = z.object({
  audience: z.enum(audiences, {
    error: "Please select the option that best describes you.",
  }),
  interest: z.enum(interests, {
    error: "Please choose the support you are interested in.",
  }),
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(100, "Please use no more than 100 characters."),
  email: z.email("Please enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .max(30, "Please check your phone number.")
    .regex(/^[+()\d\s.-]*$/, "Please enter a valid phone number.")
    .optional()
    .default(""),
  organisation: z
    .string()
    .trim()
    .max(150, "Please use no more than 150 characters.")
    .optional()
    .default(""),
  message: z
    .string()
    .trim()
    .min(15, "Please give us a brief outline of at least 15 characters.")
    .max(1500, "Please keep your message to 1,500 characters."),
  consent: z.literal(true, {
    error: "Please confirm you have read the privacy notice.",
  }),
  website: z.string().max(0).optional().default(""),
});
export type Enquiry = z.infer<typeof enquirySchema>;
export const serviceInterests: Record<string, (typeof interests)[number]> = {
  "care-provider-consultancy": "Consultancy",
  "quality-and-compliance": "Quality & compliance",
  "procurement-and-contracts": "Procurement / tendering",
  "training-and-development": "Training",
  "independent-assessments": "Independent assessment",
  "family-support": "Family support",
};
