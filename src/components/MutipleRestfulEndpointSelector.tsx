import { useQuery } from "@tanstack/react-query";
import MultipleSelector from "./ui/mutiple-selector";
import restfulEndpointList from "@/api/restfulEndpoint/restfulEndpointList";
import { ID } from "@/api/schema/id";

export default function MultipleRestfulEndpointSelector({
  projectId,
  endpoints,
  setEndpoints,
}: {
  projectId: ID;
  endpoints: { id: string; name: string }[];
  setEndpoints: (endpoints: { id: string; name: string }[]) => void;
}) {
  const { data } = useQuery({
    queryKey: ["restfulEndpoints", projectId],
    queryFn: () => restfulEndpointList(projectId),
  });
  if (data) return (
    <MultipleSelector
      defaultOptions={data.map(({ id, name }) => {
        return { label: name, value: id };
      })}
      value={endpoints.map(({ id, name }) => {
        return { label: name, value: id };
      })}
      onChange={(selected) => {
        setEndpoints(
          selected.map(({ label, value }) => {
            return { id: value, name: label };
          })
        );
      }}
    />
  );
}
