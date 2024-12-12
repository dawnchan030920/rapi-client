/**
 * POST /discussion/{endpointId}/conversation
 */

import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";

const newConversationRequest = z.object({
  title: z.string(),
});

type NewConversationRequest = z.infer<typeof newConversationRequest>;

const newConversationResponse = z.object({
  id: idSchema,
});

type NewConversationResponse = z.infer<typeof newConversationResponse>;

export const newConversation = async (
  endpointId: ID,
  request: NewConversationRequest
): Promise<NewConversationResponse> => {
  newConversationRequest.parse(request);
  const response = await client.post(
    `discussion/${endpointId}/conversation`,
    request
  );
  return newConversationResponse.parse(response.data);
};
