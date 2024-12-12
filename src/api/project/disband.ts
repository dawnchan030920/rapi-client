import { z } from "zod";
import client from "../client";
import { ID } from "../schema/id";

const disbandResponse = z.object({});
type DisbandResponse = z.infer<typeof disbandResponse>;

export default async function disband(projectId: ID): Promise<DisbandResponse> {
  const response = await client.delete(`/project/${projectId}`);
  return disbandResponse.parse(response.data);
}
