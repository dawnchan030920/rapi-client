import { z } from "zod";
import client from "../client";
import { httpMethodSchema } from "../schema/httpMethod";
import { idSchema, ID } from "../schema/id";

const restfulEndpointSchema = z.object({
  id: idSchema,
  name: z.string(),
  httpMethod: httpMethodSchema,
});

const grpcEndpointSchema = z.object({
  id: idSchema,
  name: z.string(),
  service: z.string(),
});

const structureSchema = z.object({
  id: idSchema,
  name: z.string(),
});

const groupSchema = z.object({
  id: idSchema,
  type: z.enum(["JWT", "CRUD"]),
  endpoints: z.array(restfulEndpointSchema),
});

const crewSchema = z.object({
  id: idSchema,
  username: z.string(),
  role: z.string(),
});

const stateSchema = z.object({
  id: idSchema,
  name: z.string(),
  isDefault: z.boolean(),
});

const projectOverviewResponse = z.object({
  restfulEndpoints: z.array(restfulEndpointSchema),
  grpcEndpoints: z.array(grpcEndpointSchema),
  structures: z.array(structureSchema),
  groups: z.array(groupSchema),
  crews: z.array(crewSchema),
  states: z.array(stateSchema),
});

type ProjectOverviewResponse = z.infer<typeof projectOverviewResponse>;

export default async function projectOverview(
  projectId: ID
): Promise<ProjectOverviewResponse> {
  const response = await client.get(`/project/${projectId}`);
  return projectOverviewResponse.parse(response.data);
}
