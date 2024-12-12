import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { grpcEndpointSchema } from "../schema/grpcEndpoint";

const updateGrpcEndpointRequest = z
  .object({
    id: idSchema,
  })
  .and(grpcEndpointSchema);

type UpdateGrpcEndpointRequest = z.infer<typeof updateGrpcEndpointRequest>;

const updateGrpcEndpointResponse = z.object({
  id: idSchema,
});

type UpdateGrpcEndpointResponse = z.infer<typeof updateGrpcEndpointResponse>;

export default async function updateGrpcEndpoint(
  projectId: ID,
  endpointId: ID,
  data: UpdateGrpcEndpointRequest
): Promise<UpdateGrpcEndpointResponse> {
  updateGrpcEndpointRequest.parse(data);
  const response = await client.put(
    `/project/${projectId}/grpc_endpoint/${endpointId}`,
    data
  );
  return updateGrpcEndpointResponse.parse(response.data);
}
