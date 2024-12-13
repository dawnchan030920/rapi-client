import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ID } from "@/api/schema/id";
import stateList from "@/api/state/allStates";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

export default function StatePicker({
  stateId,
  onStateIdChanged,
}: {
  stateId: ID;
  onStateIdChanged: (id: ID) => void;
}) {
  const { data: states = [], error } = useQuery({
    queryKey: ["states", stateId],
    queryFn: () => stateList(stateId),
    enabled: !!stateId,
  });

  useEffect(() => {
    if (error) {
      console.error("Failed to fetch states", error);
    }
  }, [error]);

  return (
    <Select
      onValueChange={(value) => onStateIdChanged(value)}
      value={
        states.map((state) => state.id).includes(stateId) ? stateId : undefined
      }
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a state" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Source State</SelectLabel>
          {states.map((state) => (
            <SelectItem key={state.id} value={state.id}>
              {state.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
