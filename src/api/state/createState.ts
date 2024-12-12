import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";

const createStateRequest = z.object({
  name: z.string(),
});

type CreateStateRequest = z.infer<typeof createStateRequest>;

const createStateResponse = z.object({
  id: idSchema,
});

type CreateStateResponse = z.infer<typeof createStateResponse>;

export const createState = async (
  projectId: ID,
  data: CreateStateRequest
): Promise<CreateStateResponse> => {
  createStateRequest.parse(data);
  const response = await client.post(`/project/${projectId}/state`, data);
  return createStateResponse.parse(response.data);
};
