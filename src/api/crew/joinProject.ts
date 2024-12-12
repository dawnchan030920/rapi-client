import { z } from "zod";
import client from "../client";
import { ID } from "../schema/id";

const joinProjectRequest = z.object({
  username: z.string(),
});

type JoinProjectRequest = z.infer<typeof joinProjectRequest>;

const joinProjectResponse = z.object({});

type JoinProjectResponse = z.infer<typeof joinProjectResponse>;

export const joinProject = async (
  projectId: ID,
  request: JoinProjectRequest
): Promise<JoinProjectResponse> => {
  joinProjectRequest.parse(request);
  const response = await client.post(`/project/${projectId}/crew`, request);
  return joinProjectResponse.parse(response.data);
};
