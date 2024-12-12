import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { grpcEndpointSchema } from "./grpcEndpoint";

const grpcEndpointDetailResponse = z
  .object({
    id: idSchema,
  })
  .and(grpcEndpointSchema);

type GrpcEndpointDetailResponse = z.infer<typeof grpcEndpointDetailResponse>;

export default async function grpcEndpointDetail(
  projectId: ID,
  endpointId: ID
): Promise<GrpcEndpointDetailResponse> {
  const response = await client.get(
    `/project/${projectId}/grpc_endpoint/${endpointId}`
  );
  return grpcEndpointDetailResponse.parse(response.data);
}
