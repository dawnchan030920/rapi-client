import { ID } from "@/api/schema/id";
import { RapiSchema } from "@/api/schema/schema";
import StructureRefPicker from "../StructureRefPicker";

export default function RefEditor({
  reference,
  onSchemaChange,
}: {
  reference: ID;
  onSchemaChange: (schema: RapiSchema) => void;
}) {
  console.log("ref editor");
  return (
    <>
      <StructureRefPicker
        onRefChanged={(refId) => onSchemaChange({ type: "ref", ref: refId })}
        refId={reference}
      />
    </>
  );
}
