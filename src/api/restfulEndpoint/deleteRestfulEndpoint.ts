import { z } from "zod";
import { ID } from "../schema/id";
import client from "../client";

const deleteRestfulEndpointResponse = z.object({});
type DeleteRestfulEndpointResponse = z.infer<
  typeof deleteRestfulEndpointResponse
>;

export default async function deleteRestfulEndpoint(
  projectId: ID,
  endpointId: ID
): Promise<DeleteRestfulEndpointResponse> {
  const response = await client.delete(
    `/project/${projectId}/restful_endpoint/${endpointId}`
  );
  return deleteRestfulEndpointResponse.parse(response.data);
}
