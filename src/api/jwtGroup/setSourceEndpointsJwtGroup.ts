import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";

const setSourceEndpointsJwtGroupRequest = z.object({
  sourceEndpoints: z.array(idSchema),
});

type SetSourceEndpointsJwtGroupRequest = z.infer<
  typeof setSourceEndpointsJwtGroupRequest
>;

const setSourceEndpointsJwtGroupResponse = z.object({});

type SetSourceEndpointsJwtGroupResponse = z.infer<
  typeof setSourceEndpointsJwtGroupResponse
>;

export default async function setSourceEndpointsJwtGroup(
  projectId: ID,
  jwtGroupId: ID,
  request: SetSourceEndpointsJwtGroupRequest
): Promise<SetSourceEndpointsJwtGroupResponse> {
  setSourceEndpointsJwtGroupRequest.parse(request);

  const response = await client.patch(
    `project/${projectId}/jwt_group/${jwtGroupId}`,
    request
  );
  return setSourceEndpointsJwtGroupResponse.parse(response.data);
}
