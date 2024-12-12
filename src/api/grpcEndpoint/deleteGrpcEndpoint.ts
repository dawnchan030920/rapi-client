import { z } from "zod";
import { ID } from "../schema/id";
import client from "../client";

const deleteGrpcEndpointResponse = z.object({});
type DeleteGrpcEndpointResponse = z.infer<typeof deleteGrpcEndpointResponse>;

export default async function deleteGrpcEndpoint(
  projectId: ID,
  endpointId: ID
): Promise<DeleteGrpcEndpointResponse> {
  const response = await client.delete(
    `/project/${projectId}/grpc_endpoint/${endpointId}`
  );
  return deleteGrpcEndpointResponse.parse(response.data);
}
