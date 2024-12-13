import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";

const allStatesResponse = z.array(
  z.object({
    id: idSchema,
    name: z.string(),
  })
);

type AllStatesResponse = z.infer<typeof allStatesResponse>;

export const allStates = async (projectId: ID): Promise<AllStatesResponse> => {
  const response = await client.get(`/project/${projectId}/state`);
  return allStatesResponse.parse(response.data);
};
