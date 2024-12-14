import { CrudGroup } from "@/api/crudGroup/crudGroup";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import StructurePicker from "../StructurePicker";
import { useState } from "react";
import { ID } from "@/api/schema/id";
import { Button } from "../ui/button";

export default function CrudGroupForm({
  projectId,
  groupId,
  group,
  setSourceStructure,
  dissolve,
  onCanceled,
}: {
  projectId: ID;
  groupId: ID;
  group: CrudGroup;
  onCanceled: () => void;
  setSourceStructure: (projectId: ID, groupId: ID, structureId: ID) => void;
  dissolve: (projectId: ID, groupId: ID) => void;
}) {
  const [structureId, setStructureId] = useState(group.sourceStructure?.id);
  return (
    <Card>
      <CardHeader>
        <CardTitle>CRUD Group</CardTitle>
        <CardDescription>
          Generate CRUD Endpoints from{" "}
          {group.sourceStructure?.name ?? "Structure"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <StructurePicker
          structureId={structureId ?? ""}
          onStructureIdChanged={(id) => setStructureId(id)}
        />
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button
          className="mr-auto"
          variant="destructive"
          onClick={() => dissolve(projectId, groupId)}
        >
          Dissolve
        </Button>
        <Button variant="outline" onClick={() => onCanceled()}>
          Cancel
        </Button>
        {structureId && (
          <Button
            onClick={() => {
              setSourceStructure(projectId, groupId, structureId);
            }}
          >
            Save
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
