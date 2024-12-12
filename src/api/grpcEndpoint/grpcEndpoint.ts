import { z } from "zod";
import { rapiSchemaSchema } from "../schema/schema";

const grpcEndpointSchema = z.object({
  name: z.string(),
  description: z.string(),
  service: z.string(),
  paramStream: z.boolean(),
  resultStream: z.boolean(),
  paramSchema: rapiSchemaSchema,
  resultSchema: rapiSchemaSchema,
});

type GrpcEndpoint = z.infer<typeof grpcEndpointSchema>;

export { type GrpcEndpoint, grpcEndpointSchema };
