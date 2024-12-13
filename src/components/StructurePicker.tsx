import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ID } from "@/api/schema/id";
import structureList from "@/api/structure/structureList";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function StructurePicker({
  structureId,
  onStructureIdChanged,
}: {
  structureId: ID;
  onStructureIdChanged: (id: ID) => void;
}) {
  const { data: structures = [], error } = useQuery({
    queryKey: ["structures", structureId],
    queryFn: () => structureList(structureId),
    enabled: !!structureId,
  });

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch structures", error);
    }
  }, [error]);

  return (
    <Select
      onValueChange={(value) => onStructureIdChanged(value)}
      value={
        structures.map((struct) => struct.id).includes(structureId)
          ? structureId
          : undefined
      }
    >
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
