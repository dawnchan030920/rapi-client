import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { structureSchema } from "./structure";

const createStructureRequest = structureSchema.pick({
  name: true,
});

type CreateStructureRequest = z.infer<typeof createStructureRequest>;

const createStructureResponse = z.object({
  id: idSchema,
});

type CreateStructureResponse = z.infer<typeof createStructureResponse>;

export default async function createStructure(
  projectId: ID,
  request: CreateStructureRequest
): Promise<CreateStructureResponse> {
  createStructureRequest.parse(request);

  const response = await client.post(
    `/project/${projectId}/structure`,
    request
  );
  return createStructureResponse.parse(response.data);
}
