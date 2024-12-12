import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { crudGroupSchema } from "./crudGroup";

const crudGroupDetailResponse = z
  .object({
    id: idSchema,
  })
  .and(crudGroupSchema);

type CrudGroupDetailResponse = z.infer<typeof crudGroupDetailResponse>;

export default async function crudGroupDetail(
  projectId: ID,
  crudGroupId: ID
): Promise<CrudGroupDetailResponse> {
  const response = await client.get(
    `/project/${projectId}/crud_group/${crudGroupId}`
  );
  return crudGroupDetailResponse.parse(response.data);
}
