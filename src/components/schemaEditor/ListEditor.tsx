import { RapiSchema } from "@/api/schema/schema";
import SchemaEditor from "./SchemaEditor";

export default function ListEditor({
  item,
  onSchemaChange,
}: {
  item: RapiSchema;
  onSchemaChange: (schema: RapiSchema) => void;
}) {
  return (
    <SchemaEditor
      schema={item}
      onSchemaChange={(schema) =>
        onSchemaChange({ type: "list", item: schema })
      }
    />
  );
}
