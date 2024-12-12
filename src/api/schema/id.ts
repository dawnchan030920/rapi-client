import { z } from "zod";

const idSchema = z.string();

type ID = z.infer<typeof idSchema>;

export { idSchema, type ID };
