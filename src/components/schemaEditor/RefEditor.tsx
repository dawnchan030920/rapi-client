import { ID } from "@/api/schema/id";
import { RapiSchema } from "@/api/schema/schema";
import StructurePicker from "../StructurePicker";

export default function RefEditor({
  projectId,
  reference,
  onSchemaChange,
}: {
  projectId: ID;
  reference: ID;
  onSchemaChange: (schema: RapiSchema) => void;
}) {
  console.log("ref editor");
  return (
    <>
      <StructurePicker
        projectId={projectId}
        onStructureIdChanged={(reference) =>
          onSchemaChange({ type: "ref", ref: reference })
        }
        structureId={reference}
      />
    </>
  );
}
