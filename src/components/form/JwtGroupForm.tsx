import { JwtGroup } from "@/api/jwtGroup/jwtGroup";
import { ID } from "@/api/schema/id";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import MultipleRestfulEndpointSelector from "../MutipleRestfulEndpointSelector";
import { useMutation } from "@tanstack/react-query";
import setSourceEndpointsJwtGroup from "@/api/jwtGroup/setSourceEndpointsJwtGroup";
import dissolveJwtGroup from "@/api/jwtGroup/dissolveJwtGroup";

export default function JwtGroupForm({
  projectId,
  groupId,
  group,
  onCanceled,
}: {
  projectId: ID;
  groupId: ID;
  group: JwtGroup;
  onCanceled: () => void;
}) {
  const [sources, setSources] = useState(group.sourceEndpoints);
  const setSourceEndpointsMutation = useMutation({
    mutationFn: () =>
      setSourceEndpointsJwtGroup(projectId, groupId, {
        sourceEndpoints: sources.map((source) => source.id),
      }),
    onSuccess: () => {},
  });
  const setSourceEndpoints = (
    _projectId: ID,
    _groupId: ID,
    _sourceEndpoints: ID[]
  ) => {
    setSourceEndpointsMutation.mutate();
  };
  const dissolveMutation = useMutation({
    mutationFn: () => dissolveJwtGroup(projectId, groupId),
    onSuccess: () => {},
  });
  const dissolve = (_projectId: ID, _groupId: ID) => {
    dissolveMutation.mutate();
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>JWT Group</CardTitle>
        <CardDescription>Add JWT Auth to Endpoints</CardDescription>
      </CardHeader>
      <CardContent>
        <MultipleRestfulEndpointSelector
          projectId={projectId}
          endpoints={sources}
          setEndpoints={setSources}
        />
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button
          className="mr-auto"
          variant="destructive"
          onClick={() => dissolve(projectId, groupId)}
        >
          Dissolve
        </Button>
        <Button variant="outline" onClick={() => onCanceled()}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            setSourceEndpoints(
              projectId,
              groupId,
              sources.map((source) => source.id)
            );
          }}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
