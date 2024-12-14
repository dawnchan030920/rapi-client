import { RapiSchema } from "@/api/schema/schema";
import SchemaEditor from "./SchemaEditor";
import { ID } from "@/api/schema/id";

export default function ListEditor({
  item,
  onSchemaChange,
  projectId,
}: {
  projectId: ID
  item: RapiSchema;
  onSchemaChange: (schema: RapiSchema) => void;
}) {
  return (
    <SchemaEditor
      projectId={projectId}
      schema={item}
      onSchemaChange={(schema) =>
        onSchemaChange({ type: "list", item: schema })
      }
    />
  );
}
