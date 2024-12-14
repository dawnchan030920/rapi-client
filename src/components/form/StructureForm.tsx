import { ID } from "@/api/schema/id";
import { Structure } from "@/api/structure/structure";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import SchemaEditor from "../schemaEditor/SchemaEditor";
import { useState } from "react";
import { RapiSchema } from "@/api/schema/schema";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import updateStructureRemote from "@/api/structure/updateStructure";
import deleteStructureRemote from "@/api/structure/deleteStructure";

export default function StructureForm({
  projectId,
  structureId,
  structure,
  onCanceled,
}: {
  projectId: ID;
  structureId: ID;
  structure: Structure;
  onCanceled: () => void;
}) {
  const [schema, setSchema] = useState<RapiSchema>(structure.schema);
  const updateStructureMutation = useMutation({
    mutationFn: (newStructure: Structure) =>
      updateStructureRemote(projectId, { ...newStructure, id: structureId }),
    onSuccess: () => {},
  });
  const updateStructure = (
    _projectId: ID,
    _structureId: ID,
    newStructure: Structure
  ) => {
    updateStructureMutation.mutate(newStructure);
  };
  const deleteStructureMutation = useMutation({
    mutationFn: () => deleteStructureRemote(projectId, structureId),
    onSuccess: () => {},
  });
  const deleteStructure = (_projectId: ID, _structureId: ID) => {
    deleteStructureMutation.mutate();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Structure</CardTitle>
      </CardHeader>

      <CardContent>
        <SchemaEditor
          projectId={projectId}
          schema={schema}
          onSchemaChange={setSchema}
        />
      </CardContent>

      <CardFooter className="flex gap-4">
        <Button
          className="mr-auto"
          variant="destructive"
          onClick={() => deleteStructure(projectId, structureId)}
        >
          Dissolve
        </Button>
        <Button variant="outline" onClick={() => onCanceled()}>
          Cancel
        </Button>
        {structureId && (
          <Button
            onClick={() => {
              const newStructure = { ...structure, schema: schema };
              updateStructure(projectId, structureId, newStructure);
            }}
          >
            Save
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
