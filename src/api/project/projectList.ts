import { z } from "zod";
import client from "../client";
import { idSchema } from "../schema/id";
import { roleSchema } from "../schema/role";

const projectListResponse = z.array(
  z.object({
    id: idSchema,
    title: z.string(),
    role: roleSchema,
    endpointCount: z.number(),
    structureCount: z.number(),
    groupCount: z.number(),
  })
);

type ProjectListResponse = z.infer<typeof projectListResponse>;

export default async function projectList(): Promise<ProjectListResponse> {
  const response = await client.get("/project");
  return projectListResponse.parse(response.data);
}
