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

export default function AddStateDialogContent({
  projectId,
  addState,
}: {
  projectId: ID;
  addState: (projectId: string, name: string) => void;
}) {
  const [stateName, setStateName] = useState("");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add State</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="State name"
            onChange={(e) => setStateName(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          onClick={() => {
            addState(projectId, stateName);
          }}
        >
          Invite
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
