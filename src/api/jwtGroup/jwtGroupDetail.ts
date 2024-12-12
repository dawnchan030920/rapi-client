import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { jwtGroupSchema } from "./jwtGroup";

const jwtGroupDetailResponse = z
  .object({
    id: idSchema,
  })
  .and(jwtGroupSchema);

type JwtGroupDetailResponse = z.infer<typeof jwtGroupDetailResponse>;

export default async function jwtGroupDetail(
  projectId: ID,
  jwtGroupId: ID
): Promise<JwtGroupDetailResponse> {
  const response = await client.get(
    `/project/${projectId}/jwt_group/${jwtGroupId}`
  );
  return jwtGroupDetailResponse.parse(response.data);
}
