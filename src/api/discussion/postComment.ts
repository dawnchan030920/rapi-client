/**
 * POST /discussion/{endpointId}/conversation/{conversationId}/comment
 */

import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";

const postCommentRequest = z.object({
  content: z.string(),
});

type PostCommentRequest = z.infer<typeof postCommentRequest>;

const postCommentResponse = z.object({
  id: idSchema,
});

type PostCommentResponse = z.infer<typeof postCommentResponse>;

export const postComment = async (
  endpointId: ID,
  conversationId: ID,
  request: PostCommentRequest
): Promise<PostCommentResponse> => {
  postCommentRequest.parse(request);
  const response = await client.post(
    `discussion/${endpointId}/conversation/${conversationId}/comment`,
    request
  );
  return postCommentResponse.parse(response.data);
};
