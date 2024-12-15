import { ID } from "@/api/schema/id";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newConversation } from "@/api/discussion/newConversation";
import { postComment as postCommentRemote } from "@/api/discussion/postComment";
import { changeConversationState as changeConversationStateRemote } from "@/api/discussion/changeConversationState";

export default function DiscussionPanel({
  endpointId,
  conversations,
}: // addConversation,
// postComment,
// closeConversation,
// reopenConversation,
{
  endpointId: ID;
  conversations: {
    id: ID;
    title: string;
    open: boolean;
    comments: {
      id: ID;
      content: string;
      author: string;
    }[];
  }[];
  // addConversation: (title: string) => void;
  // postComment: (conversationId: ID, content: string) => void;
  // closeConversation: (conversationId: ID) => void;
  // reopenConversation: (conversationId: ID) => void;
}) {
  const queryClient = useQueryClient();
  const addConversationMutation = useMutation({
    mutationKey: ["addConversation", endpointId],
    mutationFn: (title: string) => {
      newConversation(endpointId, { title });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations", endpointId]);
    },
  });
  const addConversation = (title: string) => {
    addConversationMutation.mutate(title);
  };
  const postCommentMutation = useMutation({
    mutationKey: ["postComment", endpointId],
    mutationFn: ({
      conversationId,
      content,
    }: {
      conversationId: ID;
      content: string;
    }) => {
      postCommentRemote(endpointId, conversationId, { content });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations", endpointId]);
    },
  });
  const changeConversationStatusMutation = useMutation({
    mutationKey: ["changeConversationStatus", endpointId],
    mutationFn: ({
      conversationId,
      action,
    }: {
      conversationId: ID;
      action: "close" | "reopen";
    }) => {
      changeConversationStateRemote(endpointId, conversationId, { action });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations", endpointId]);
    },
  });
  const closeConversation = (conversationId: ID) => {
    changeConversationStatusMutation.mutate({
      conversationId,
      action: "close",
    });
  };
  const reopenConversation = (conversationId: ID) => {
    changeConversationStatusMutation.mutate({
      conversationId,
      action: "reopen",
    });
  };
  const postComment = (conversationId: ID, content: string) => {
    postCommentMutation.mutate({ conversationId, content });
  };
  const [conversationId, setConversationId] = useState<ID | undefined>(
    undefined
  );
  const [newConversationTitle, setNewConversationTitle] = useState("");
  const [commentContent, setCommentContent] = useState("");
  return (
    <Card className="w-96">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Discussion</span>{" "}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-fit">New Conversation</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Conversation</DialogTitle>
              </DialogHeader>
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Title"
                  value={newConversationTitle}
                  onChange={(e) => setNewConversationTitle(e.target.value)}
                />
              </div>
              <DialogFooter>
                <Button
                  onClick={() => {
                    addConversation(newConversationTitle);
                    setNewConversationTitle("");
                  }}
                >
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={conversationId} onValueChange={setConversationId}>
          <TabsList className="w-full overflow-auto justify-start">
            {conversations.map((conversation) => (
              <TabsTrigger value={conversation.id}>
                {conversation.title}
              </TabsTrigger>
            ))}
          </TabsList>
          {conversations.map((conversation) => (
            <TabsContent value={conversation.id}>
              <div className="grid gap-2 px-2 overflow-auto">
                {conversation.comments.map((comment) => (
                  <div className="grid gap-1">
                    <div className="text-sm text-muted-foreground">
                      {comment.author}
                    </div>
                    <div>{comment.content}</div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        <Input
          placeholder="Add a comment"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
        />
        <Button
          onClick={() => {
            if (conversationId) {
              postComment(conversationId, commentContent);
              setCommentContent("");
            }
          }}
        >
          Post
        </Button>
        {conversations.find((c) => c.id === conversationId)?.open ? (
          <>
            {conversationId && (
              <Button onClick={() => closeConversation(conversationId)}>
                Close
              </Button>
            )}
          </>
        ) : (
          <>
            {conversationId && (
              <Button onClick={() => reopenConversation(conversationId)}>
                Reopen
              </Button>
            )}
          </>
        )}
      </CardFooter>
    </Card>
  );
}
