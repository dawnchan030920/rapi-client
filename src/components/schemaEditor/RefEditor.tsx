import { ID } from "@/api/schema/id";
import { RapiSchema } from "@/api/schema/schema";
import StructurePicker from "../StructurePicker";

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
      <StructurePicker
        onStructureIdChanged={(reference) =>
          onSchemaChange({ type: "ref", ref: reference })
        }
        structureId={reference}
      />
    </>
  );
}
