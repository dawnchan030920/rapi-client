import { z } from "zod";
import client from "../client";
import { idSchema } from "../schema/id";

const createProjectRequest = z.object({
  name: z.string().min(1, "Project name is required"),
});

type CreateProjectRequest = z.infer<typeof createProjectRequest>;

const createProjectResponse = z.object({
  id: idSchema,
});

type CreateProjectResponse = z.infer<typeof createProjectResponse>;

export default async function createProject(
  data: CreateProjectRequest
): Promise<CreateProjectResponse> {
  createProjectRequest.parse(data);

  const response = await client.post("/project", data);
  return createProjectResponse.parse(response.data);
}
