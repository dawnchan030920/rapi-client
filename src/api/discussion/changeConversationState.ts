import { z } from "zod";
import client from "../client";
import { ID } from "../schema/id";

const changeConversationStateRequest = z.object({
  action: z.enum(["close", "reopen"]),
});

type ChangeConversationStateRequest = z.infer<
  typeof changeConversationStateRequest
>;

const changeConversationStateResponse = z.object({});

type ChangeConversationStateResponse = z.infer<
  typeof changeConversationStateResponse
>;

export const changeConversationState = async (
  endpointId: ID,
  conversationId: ID,
  request: ChangeConversationStateRequest
): Promise<ChangeConversationStateResponse> => {
  changeConversationStateRequest.parse(request);
  const response = await client.post(
    `/discussion/${endpointId}/conversation/${conversationId}/state`,
    request
  );
  return changeConversationStateResponse.parse(response.data);
};
