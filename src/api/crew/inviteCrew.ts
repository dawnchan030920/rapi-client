import { z } from "zod";
import { ID } from "../schema/id";
import client from "../client";

const inviteCrewRequest = z.object({
  email: z.string().email(),
});

type InviteCrewRequest = z.infer<typeof inviteCrewRequest>;

const inviteCrewResponse = z.object({});

type InviteCrewResponse = z.infer<typeof inviteCrewResponse>;

export const inviteCrew = async (
  projectId: ID,
  request: InviteCrewRequest
): Promise<InviteCrewResponse> => {
  inviteCrewRequest.parse(request);
  const response = await client.post(
    `/project/${projectId}/crew/invite`,
    request
  );
  return inviteCrewResponse.parse(response.data);
};
