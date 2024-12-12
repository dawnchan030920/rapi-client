/**
 * GET discussion/{endpointId}/conversation/{conversationId}
 * show conversation detail, including comments
 */

import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";

const conversationDetailResponse = z.object({
  id: idSchema,
  comments: z.array(
    z.object({
      id: idSchema,
      content: z.string(),
      author: z.string(),
    })
  ),
});

type ConversationDetailResponse = z.infer<typeof conversationDetailResponse>;

export default async function conversationDetail(
  endpointId: ID,
  conversationId: ID
): Promise<ConversationDetailResponse> {
  const response = await client.get(
    `discussion/${endpointId}/conversation/${conversationId}`
  );
  return conversationDetailResponse.parse(response.data);
}
