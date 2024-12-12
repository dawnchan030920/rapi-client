/**
 * GET discussion/{endpointId}/conversation
 * show all conversation names
 */

import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";

const allConversationsResponse = z.array(
  z.object({
    id: idSchema,
    title: z.string(),
    open: z.boolean(),
  })
);

type AllConversationsResponse = z.infer<typeof allConversationsResponse>;

export async function allConversations(
  endpointId: ID
): Promise<AllConversationsResponse> {
  const response = await client.get(`discussion/${endpointId}/conversation`);
  return allConversationsResponse.parse(response.data);
}
