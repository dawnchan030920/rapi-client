import { z } from "zod";
import { idSchema } from "../schema/id";

const crudGroupSchema = z.object({
  sourceStructure: z.object({
    id: idSchema,
    name: z.string(),
  }),
});

type CrudGroup = z.infer<typeof crudGroupSchema>;

export { type CrudGroup, crudGroupSchema };
