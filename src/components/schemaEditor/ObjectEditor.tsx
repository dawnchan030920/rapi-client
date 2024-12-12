import { RapiSchema } from "@/api/schema/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SchemaEditor from "./SchemaEditor";

export default function ObjectEditor({
  fields,
  onSchemaChange,
}: {
  fields: { key: string; value: RapiSchema }[];
  onSchemaChange: (schema: RapiSchema) => void;
}) {
  return (
    <>
      {/**
       * Render the fields of the object
       * Able to add and remove fields
       */}
      {fields.map((field, i) => (
        <div className="flex" key={i}>
          <Input
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
    </>
  );
}
