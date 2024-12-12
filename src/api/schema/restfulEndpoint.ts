import { z } from "zod";
import { httpMethodSchema } from "./httpMethod";
import { rapiSchemaSchema } from "./schema";

const restfulEndpointSchema = z.object({
  name: z.string(),
  httpMethod: httpMethodSchema,
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
  request: rapiSchemaSchema,
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
