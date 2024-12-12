import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { structureSchema } from "../schema/structure";

const updateStructureRequest = z
  .object({
    id: idSchema,
  })
  .and(structureSchema);

type UpdateStructureRequest = z.infer<typeof updateStructureRequest>;

const updateStructureResponse = z.object({
  id: idSchema,
});

type UpdateStructureResponse = z.infer<typeof updateStructureResponse>;

export default async function updateStructure(
  projectId: ID,
  request: UpdateStructureRequest
): Promise<UpdateStructureResponse> {
  updateStructureRequest.parse(request);

  const response = await client.put(
    `/project/${projectId}/structure/${request.id}`,
    request
  );
  return updateStructureResponse.parse(response.data);
}
