import { RapiSchema } from "@/api/schema/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SchemaEditor from "./SchemaEditor";
import { ID } from "@/api/schema/id";

export default function ObjectEditor({
  fields,
  onSchemaChange,
  projectId,
}: {
  projectId: ID;
  fields: { key: string; value: RapiSchema }[];
  onSchemaChange: (schema: RapiSchema) => void;
}) {
  return (
    <div className="grid gap-2">
      {/**
       * Render the fields of the object
       * Able to add and remove fields
       */}
      {fields.map((field, i) => (
        <div className="flex gap-2" key={i}>
          <Input
            className="w-[180px]"
            value={field.key}
            onChange={(key) => {
              onSchemaChange({
                type: "object",
                fields: fields.map((f, j) => {
                  if (i === j) {
                    return { key: key.target.value, value: f.value };
                  }
                  return f;
                }),
              });
            }}
          />
          <SchemaEditor
            projectId={projectId}
            schema={field.value}
            onSchemaChange={(value) => {
              onSchemaChange({
                type: "object",
                fields: fields.map((f, j) => {
                  if (i === j) {
                    return { key: f.key, value };
                  }
                  return f;
                }),
              });
            }}
          />
          <Button
            onClick={() => {
              onSchemaChange({
                type: "object",
                fields: fields.filter((_, j) => i !== j),
              });
            }}
          >
            Remove
          </Button>
        </div>
      ))}
      <div className="w-auto">
        <Button
          onClick={() => {
            onSchemaChange({
              type: "object",
              fields: [...fields, { key: "", value: { type: "string" } }],
            });
          }}
        >
          Add
        </Button>
      </div>
    </div>
  );
}
