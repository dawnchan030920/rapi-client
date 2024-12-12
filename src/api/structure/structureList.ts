/**
 * GET /project/{projectId}/structure
 */

import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { structureSchema } from "./structure";

const structureListResponse = z.array(
  structureSchema
    .pick({
      name: true,
    })
    .and(z.object({ id: idSchema }))
);

type StructureListResponse = z.infer<typeof structureListResponse>;

export default async function structureList(
  projectId: ID
): Promise<StructureListResponse> {
  const response = await client.get(`/project/${projectId}/structure`);
  return structureListResponse.parse(response.data);
}
