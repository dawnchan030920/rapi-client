import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { restfulEndpointSchema } from "../schema/restfulEndpoint";

const updateRestfulEndpointRequest = z
  .object({
    id: idSchema,
  })
  .and(restfulEndpointSchema);

type UpdateRestfulEndpointRequest = z.infer<
  typeof updateRestfulEndpointRequest
>;

const updateRestfulEndpointResponse = z.object({
  id: idSchema,
});

type UpdateRestfulEndpointResponse = z.infer<
  typeof updateRestfulEndpointResponse
>;

export default async function updateRestfulEndpoint(
  projectId: ID,
  endpointId: ID,
  data: UpdateRestfulEndpointRequest
): Promise<UpdateRestfulEndpointResponse> {
  updateRestfulEndpointRequest.parse(data);
  const response = await client.put(
    `/project/${projectId}/restful_endpoint/${endpointId}`,
    data
  );
  return updateRestfulEndpointResponse.parse(response.data);
}
