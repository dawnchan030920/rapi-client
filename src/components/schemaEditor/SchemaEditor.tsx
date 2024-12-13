import { RapiSchema } from "@/api/schema/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import ObjectEditor from "./ObjectEditor";
import ListEditor from "./ListEditor";
import RefEditor from "./RefEditor";

export default function SchemaEditor({
  schema,
  onSchemaChange,
}: {
  schema: RapiSchema;
  onSchemaChange: (schema: RapiSchema) => void;
}) {
  function onSchemaTypeChanged(type: string) {
    if (type === "object") {
      onSchemaChange({ type: "object", fields: [] });
    } else if (type === "list") {
      onSchemaChange({ type: "list", item: { type: "string" } });
    } else if (type === "ref") {
      onSchemaChange({ type: "ref", ref: "" });
    } else if (type === "string") {
      onSchemaChange({ type: "string" });
    } else if (type === "number") {
      onSchemaChange({ type: "number" });
    }
  }

  return (
    <div className="grid gap-4 w-fit min-w-36">
      <Select onValueChange={onSchemaTypeChanged} value={schema.type}>
        <SelectTrigger className="w-auto">
          <SelectValue placeholder="Schema Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="object">Object</SelectItem>
          <SelectItem value="list">List</SelectItem>
          <SelectItem value="ref">Ref</SelectItem>
          <SelectItem value="string">String</SelectItem>
          <SelectItem value="number">Number</SelectItem>
        </SelectContent>
      </Select>
      {/**
       * Render the appropriate editor based on the selected schema type
       */}
      {schema.type === "object" ? (
        <ObjectEditor fields={schema.fields} onSchemaChange={onSchemaChange} />
      ) : schema.type === "list" ? (
        <ListEditor item={schema.item} onSchemaChange={onSchemaChange} />
      ) : schema.type === "ref" ? (
        <RefEditor reference={schema.ref} onSchemaChange={onSchemaChange} />
      ) : null}
    </div>
  );
}
