import { z } from "zod";
import client from "../client";
import { ID } from "../schema/id";
const changeRoleRequest = z.object({
  action: z.enum(["promote", "demote"]),
});

type ChangeRoleRequest = z.infer<typeof changeRoleRequest>;

const changeRoleResponse = z.object({});

type ChangeRoleResponse = z.infer<typeof changeRoleResponse>;

export const changeRole = async (
  projectId: ID,
  crewId: ID,
  request: ChangeRoleRequest
): Promise<ChangeRoleResponse> => {
  changeRoleRequest.parse(request);
  const response = await client.patch(
    `/project/${projectId}/crew/${crewId}`,
    request
  );
  return changeRoleResponse.parse(response.data);
};
