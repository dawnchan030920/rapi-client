import { z } from "zod";
import { idSchema } from "../schema/id";

const jwtGroupSchema = z.object({
  sourceEndpoints: z.array(
    z.object({
      id: idSchema,
      name: z.string(),
    })
  ),
});

type JwtGroup = z.infer<typeof jwtGroupSchema>;

export { jwtGroupSchema, type JwtGroup };
