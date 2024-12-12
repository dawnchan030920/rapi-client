import { ID } from "@/api/schema/id";
import { RapiSchema } from "@/api/schema/schema";
import StructureRefPicker from "../StructureRefPicker";

export default function RefEditor({
  ref,
  onSchemaChange,
}: {
  ref: ID;
  onSchemaChange: (schema: RapiSchema) => void;
}) {
  return (
    <>
      <StructureRefPicker
        onRefChanged={(refId) => onSchemaChange({ type: "ref", ref: refId })}
        refId={ref}
      />
    </>
  );
}
