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
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

export default function StructurePicker({
  projectId,
  structureId,
  onStructureIdChanged,
}: {
  projectId: ID;
  structureId: ID;
  onStructureIdChanged: (id: ID) => void;
}) {
  const { data: structures = [], error } = useQuery({
    queryKey: ["structures", projectId],
    queryFn: () => structureList(projectId),
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
        <SelectGroup>
          <SelectLabel>Source Structure</SelectLabel>
          {structures.map((structure) => (
            <SelectItem key={structure.id} value={structure.id}>
              {structure.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
