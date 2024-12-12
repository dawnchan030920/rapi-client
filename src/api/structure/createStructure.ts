import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { structureSchema } from "../schema/structure";

const createStructureRequest = structureSchema.pick({
  name: true,
});

type CreateStructureRequest = z.infer<typeof createStructureRequest>;

const createStructureResponseSchema = z.object({
  id: idSchema,
});

type CreateStructureResponse = z.infer<typeof createStructureResponseSchema>;

export default async function createStructure(
  projectId: ID,
  request: CreateStructureRequest
): Promise<CreateStructureResponse> {
  createStructureRequest.parse(request);

  const response = await client.post(
    `/project/${projectId}/structure`,
    request
  );
  return createStructureResponseSchema.parse(response.data);
}
