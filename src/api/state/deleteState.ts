import { z } from "zod";
import client from "../client";
import { ID } from "../schema/id";

const deleteStateResponse = z.object({});

type DeleteStateResponse = z.infer<typeof deleteStateResponse>;

export const deleteState = async (
  projectId: ID,
  stateId: ID
): Promise<DeleteStateResponse> => {
  const response = await client.delete(
    `/project/${projectId}/state/${stateId}`
  );
  return deleteStateResponse.parse(response.data);
};
