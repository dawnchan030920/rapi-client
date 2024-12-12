import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";

const setSourceStructureCrudGroupRequest = z.object({
  sourceStructure: idSchema,
});

type SetSourceStructureCrudGroupRequest = z.infer<
  typeof setSourceStructureCrudGroupRequest
>;

const setSourceStructureCrudGroupResponse = z.object({});

type SetSourceStructureCrudGroupResponse = z.infer<
  typeof setSourceStructureCrudGroupResponse
>;

export default async function setSourceStructureCrudGroup(
  projectId: ID,
  crudGroupId: ID,
  request: SetSourceStructureCrudGroupRequest
): Promise<SetSourceStructureCrudGroupResponse> {
  setSourceStructureCrudGroupRequest.parse(request);

  const response = await client.patch(
    `project/${projectId}/crud_group/${crudGroupId}`,
    request
  );
  return setSourceStructureCrudGroupResponse.parse(response.data);
}
