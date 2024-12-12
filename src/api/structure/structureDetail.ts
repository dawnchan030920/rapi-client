import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { structureSchema } from "./structure";

const structureDetailResponse = z
  .object({
    id: idSchema,
  })
  .and(structureSchema);

type StructureDetailResponse = z.infer<typeof structureDetailResponse>;

export default async function structureDetail(
  projectId: ID,
  structureId: ID
): Promise<StructureDetailResponse> {
  const response = await client.get(
    `/project/${projectId}/structure/${structureId}`
  );
  return structureDetailResponse.parse(response.data);
}
