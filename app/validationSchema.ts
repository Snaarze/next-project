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
    .max(255, "Description character max is 255 only!"),
});
