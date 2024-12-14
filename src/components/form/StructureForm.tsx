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

export default function StructureForm({
  projectId,
  structureId,
  structure,
  updateStructure,
  deleteStructure,
  onCanceled,
}: {
  projectId: ID;
  structureId: ID;
  structure: Structure;
  updateStructure: (
    projectId: ID,
    structureId: ID,
    structure: Structure
  ) => void;
  deleteStructure: (projectId: ID, structureId: ID) => void;
  onCanceled: () => void;
}) {
  const [schema, setSchema] = useState<RapiSchema>(structure.schema);
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
