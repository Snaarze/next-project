// import { z } from "@/node_modules/zod/v4/classic/external.cjs";
import { z } from "zod";
export const issuesSchema = z.object({
  title: z
    .string()
    .min(8, "title must be 8 characters longer")
    .max(255, "Description character max is 255 only!"),
  description: z
    .string()
    .min(15, "Description must be 15 characters longer")
    .max(65535, "Description character max is 65535 only!"),
});

export const patchIssuesSchema = z.object({
  title: z
    .string()
    .min(8, "title must be 8 characters longer")
    .max(255, "Description character max is 255 only!")
    .optional(),
  description: z
    .string()
    .min(15, "Description must be 15 characters longer")
    .max(65535, "Description character max is 255 only!")
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, "AssignedToUserId is required")
    .max(255)
    .optional()
    .nullable(),
});
