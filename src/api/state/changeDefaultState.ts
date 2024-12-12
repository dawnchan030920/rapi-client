import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";

const changeDefaultStateRequest = z.object({
  stateId: idSchema,
});

type ChangeDefaultStateRequest = z.infer<typeof changeDefaultStateRequest>;

const changeDefaultStateResponse = z.object({});

type ChangeDefaultStateResponse = z.infer<typeof changeDefaultStateResponse>;

export const changeDefaultState = async (
  projectId: ID,
  data: ChangeDefaultStateRequest
): Promise<ChangeDefaultStateResponse> => {
  changeDefaultStateRequest.parse(data);
  const response = await client.patch(
    `/project/${projectId}/state/default`,
    data
  );
  return changeDefaultStateResponse.parse(response.data);
};
