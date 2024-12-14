import { ID } from "@/api/schema/id";
import StructurePicker from "@/components/StructurePicker";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export default function CreateCrudGroupDialogContent({
  projectId,
  createCrudGroup,
}: {
  projectId: ID;
  createCrudGroup: (sourceStructure: ID) => void;
}) {
  const [sourceStructure, setSourceStructure] = useState("");
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Create CRUD Group</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4">
        <div className="grid gap-2">
          
          <StructurePicker
            projectId={projectId}
            structureId={sourceStructure}
            onStructureIdChanged={(sourceStructureId) =>
              setSourceStructure(sourceStructureId)
            }
          />
        </div>
      </div>
      <DialogFooter>
        <Button onClick={() => createCrudGroup(sourceStructure)}>Create</Button>
      </DialogFooter>
    </DialogContent>
  );
}
