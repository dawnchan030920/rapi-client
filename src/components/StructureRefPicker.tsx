import { useEffect, useState } from "react";
import { ID } from "@/api/schema/id";
import structureList from "@/api/structure/structureList";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function StructureRefPicker({
  refId,
  onRefChanged,
}: {
  refId: ID;
  onRefChanged: (id: ID) => void;
}) {
  const [structures, setStructures] = useState<{ id: ID; name: string }[]>([]);
  useEffect(() => {
    async function fetchStructures() {
      try {
        const data = await structureList(refId);
        setStructures(data);
      } catch (error) {
        console.error("Failed to fetch structures", error);
      }
    }

    fetchStructures();
  }, [refId]);

  return (
    <Select onValueChange={(value) => onRefChanged(value)}>
      <SelectTrigger>
        <SelectValue placeholder="Select a structure" />
      </SelectTrigger>
      <SelectContent>
        {structures.map((structure) => (
          <SelectItem key={structure.id} value={structure.id}>
            {structure.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
