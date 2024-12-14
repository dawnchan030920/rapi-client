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
import { useMutation } from "@tanstack/react-query";
import setSourceStructureCrudGroup from "@/api/crudGroup/setSourceStructureCrudGroup";
import dissolveCrudGroup from "@/api/crudGroup/dissolveCrudGroup";

export default function CrudGroupForm({
  projectId,
  groupId,
  group,
  onCanceled,
}: {
  projectId: ID;
  groupId: ID;
  group: CrudGroup;
  onCanceled: () => void;
}) {
  const [structureId, setStructureId] = useState(group.sourceStructure?.id);
  const setSourceStructureMutation = useMutation({
    mutationFn: () =>
      setSourceStructureCrudGroup(projectId, groupId, {
        sourceStructure: structureId ?? "",
      }),
    onSuccess: () => {},
  });
  const setSourceStructure = (
    _projectId: ID,
    _groupId: ID,
    _sourceStructureId: ID
  ) => {
    setSourceStructureMutation.mutate();
  };
  const dissolveMutation = useMutation({
    mutationFn: () => dissolveCrudGroup(projectId, groupId),
    onSuccess: () => {},
  });
  const dissolve = (_projectId: ID, _groupId: ID) => {
    dissolveMutation.mutate();
  };
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
          projectId={projectId}
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
