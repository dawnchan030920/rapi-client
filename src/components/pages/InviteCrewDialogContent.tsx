import { ID } from "@/api/schema/id";
import { Button } from "../ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";

export default function InviteCrewDialogContent({
  projectId,
  inviteCrew,
}: {
  projectId: ID;
  inviteCrew: (projectId: string, email: string) => void;
}) {
  const [invitedCrewEmail, setInvitedCrewEmail] = useState("");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Invite Crew</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setInvitedCrewEmail(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={() => {
            inviteCrew(projectId, invitedCrewEmail);
          }}
        >
          Invite
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
