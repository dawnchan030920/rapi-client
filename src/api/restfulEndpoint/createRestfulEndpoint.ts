import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { restfulEndpointSchema } from "../schema/restfulEndpoint";

const createRestfulEndpointRequest = restfulEndpointSchema.pick({
  name: true,
  httpMethod: true,
  description: true,
});

type CreateRestfulEndpointRequest = z.infer<
  typeof createRestfulEndpointRequest
>;

const createRestfulEndpointResponseSchema = z.object({
  id: idSchema,
});

type CreateRestfulEndpointResponse = z.infer<
  typeof createRestfulEndpointResponseSchema
>;

export default async function createRestfulEndpoint(
  projectId: ID,
  request: CreateRestfulEndpointRequest
): Promise<CreateRestfulEndpointResponse> {
  createRestfulEndpointRequest.parse(request);

  const response = await client.post(
    `/project/${projectId}/restful_endpoint`,
    request
  );
  return createRestfulEndpointResponseSchema.parse(response.data);
}
