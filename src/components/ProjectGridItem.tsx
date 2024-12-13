import { ID } from "@/api/schema/id";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import disband from "@/api/project/disband";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ProjectGridItem({
  id,
  title,
  role,
  endpointCount,
  structureCount,
  groupCount,
}: {
  id: ID;
  title: string;
  role: string;
  endpointCount: number;
  structureCount: number;
  groupCount: number;
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const disbandMutation = useMutation({
    mutationFn: () => disband(id),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      window.location.reload();
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return (
    <Card className="w-[360px]">
      <CardContent>
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-sm">{role}</div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <div className="text-sm text-gray-500">
            {endpointCount} endpoint{endpointCount !== 1 ? "s" : ""}
          </div>
          <div className="text-sm text-gray-500">
            {structureCount} structure{structureCount !== 1 ? "s" : ""}
          </div>
          <div className="text-sm text-gray-500">
            {groupCount} group{groupCount !== 1 ? "s" : ""}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="destructive" onClick={() => disbandMutation.mutate()}>
          Disband
        </Button>
        <Button variant="link" onClick={() => navigate(`/project/${id}`)}>
          Enter
        </Button>
      </CardFooter>
    </Card>
  );
}
