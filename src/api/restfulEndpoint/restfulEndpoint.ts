import { z } from "zod";
import { httpMethodSchema } from "../schema/httpMethod";
import { rapiSchemaSchema } from "../schema/schema";

const restfulEndpointSchema = z.object({
  name: z.string(),
  httpMethod: httpMethodSchema,
  header: rapiSchemaSchema.optional(),
  query: rapiSchemaSchema.optional(),
  RoutePath: z.array(
    z.union([
      z.object({
        constant: z.string(),
      }),
      z.object({
        name: z.string(),
        schema: rapiSchemaSchema,
      }),
    ])
  ),
  request: rapiSchemaSchema.optional(),
  response: z.array(
    z.object({
      statusCode: z.number().min(100).max(599),
      description: z.string(),
      schema: rapiSchemaSchema,
    })
  ),
  description: z.string(),
  state: z.string(),
});

type RestfulEndpoint = z.infer<typeof restfulEndpointSchema>;

export { type RestfulEndpoint, restfulEndpointSchema };
