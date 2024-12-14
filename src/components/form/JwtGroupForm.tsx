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

export default function JwtGroupForm({
  projectId,
  groupId,
  group,
  setSourceEndpoints,
  dissolve,
  onCanceled,
}: {
  projectId: ID;
  groupId: ID;
  group: JwtGroup;
  setSourceEndpoints: (
    projectId: ID,
    groupId: ID,
    sourceEndpoints: ID[]
  ) => void;
  dissolve: (projectId: ID, groupId: ID) => void;
  onCanceled: () => void;
}) {
  const [sources, setSources] = useState(group.sourceEndpoints);
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
