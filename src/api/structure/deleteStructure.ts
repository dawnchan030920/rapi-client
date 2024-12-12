import { z } from "zod";
import { ID } from "../schema/id";
import client from "../client";

const deleteStructureResponse = z.object({});
type DeleteStructureResponse = z.infer<typeof deleteStructureResponse>;

export default async function deleteStructure(
  projectId: ID,
  structureId: ID
): Promise<DeleteStructureResponse> {
  const response = await client.delete(
    `/project/${projectId}/structure/${structureId}`
  );
  return deleteStructureResponse.parse(response.data);
}
