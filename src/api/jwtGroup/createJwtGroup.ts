import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";

const createJwtGroupResquest = z.object({});

type CreateJwtGroupRequest = z.infer<typeof createJwtGroupResquest>;

const createJwtGroupResponse = z.object({
  id: idSchema,
});

type CreateJwtGroupResponse = z.infer<typeof createJwtGroupResponse>;

export default async function createJwtGroup(
  projectId: ID,
  request: CreateJwtGroupRequest
): Promise<CreateJwtGroupResponse> {
  createJwtGroupResquest.parse(request);
  const response = await client.post(
    `/project/${projectId}/jwt_group`,
    request
  );
  return createJwtGroupResponse.parse(response.data);
}
