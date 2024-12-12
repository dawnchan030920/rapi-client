import { z } from "zod";
import client from "../client";
import { ID } from "../schema/id";

const dissolveJwtGroupResponse = z.object({});
type DissolveJwtGroupResponse = z.infer<typeof dissolveJwtGroupResponse>;

export default async function dissolveJwtGroup(
  projectId: ID,
  jwtGroupId: ID
): Promise<DissolveJwtGroupResponse> {
  const response = await client.delete(
    `/project/${projectId}/jwt_group/${jwtGroupId}`
  );
  return dissolveJwtGroupResponse.parse(response.data);
}
