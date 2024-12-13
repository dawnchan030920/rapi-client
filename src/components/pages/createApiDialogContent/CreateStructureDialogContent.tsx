import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function CreateStructureDialogContent({
  createStructure,
}: {
  createStructure: (name: string) => void;
}) {
  const [name, setName] = useState("");
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create Structure</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => createStructure(name)}>Create</Button>
      </DialogFooter>
    </DialogContent>
  );
}
