import { z } from "zod";
import { rapiSchemaSchema } from "../schema/schema";

const structureSchema = z.object({
  name: z.string(),
  schema: rapiSchemaSchema,
});

type Structure = z.infer<typeof structureSchema>;

export { type Structure, structureSchema };
