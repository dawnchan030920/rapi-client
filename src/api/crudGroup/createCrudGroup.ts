import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";

const createCrudGroupRequest = z.object({
  sourceStructure: idSchema,
});

type CreateCrudGroupRequest = z.infer<typeof createCrudGroupRequest>;

const createCrudGroupResponse = z.object({
  id: idSchema,
});

type CreateCrudGroupResponse = z.infer<typeof createCrudGroupResponse>;

export default async function createCrudGroup(
  projectId: ID,
  request: CreateCrudGroupRequest
): Promise<CreateCrudGroupResponse> {
  createCrudGroupRequest.parse(request);
  const response = await client.post(
    `/project/${projectId}/crud_group`,
    request
  );
  return createCrudGroupResponse.parse(response.data);
}
