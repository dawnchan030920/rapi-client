import { z } from "zod";
import { idSchema } from "../schema/id";
import client from "../client";

const allInvitationsResponse = z.array(
  z.object({
    projectId: idSchema,
    projectName: z.string(),
  })
);
type AllInvitationsResponse = z.infer<typeof allInvitationsResponse>;

export const allInvitations = async (): Promise<AllInvitationsResponse> => {
  const response = await client.get("/invitations");
  return allInvitationsResponse.parse(response.data);
};
