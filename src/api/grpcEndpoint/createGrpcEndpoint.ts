import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { grpcEndpointSchema } from "./grpcEndpoint";

const createGrpcRequest = grpcEndpointSchema.pick({
  name: true,
  description: true,
  service: true,
  paramStream: true,
  resultStream: true,
});

type CreateGrpcRequest = z.infer<typeof createGrpcRequest>;

const createGrpcResponseSchema = z.object({
  id: idSchema,
});

type CreateGrpcResponse = z.infer<typeof createGrpcResponseSchema>;

export default async function createGrpc(
  projectId: ID,
  request: CreateGrpcRequest
): Promise<CreateGrpcResponse> {
  createGrpcRequest.parse(request);

  const response = await client.post(`/project/${projectId}/grpc_endpoint`, request);
  return createGrpcResponseSchema.parse(response.data);
}
