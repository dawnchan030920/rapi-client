import { GrpcEndpoint } from "@/api/grpcEndpoint/grpcEndpoint";
import { ID } from "@/api/schema/id";
import { Label } from "../ui/label";
import { useState } from "react";
import { Input } from "../ui/input";
import { RapiSchema } from "@/api/schema/schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import SchemaEditor from "../schemaEditor/SchemaEditor";
import { useMutation } from "@tanstack/react-query";
import deleteGrpcEndpoint from "@/api/grpcEndpoint/deleteGrpcEndpoint";
import updateGrpcEndpoint from "@/api/grpcEndpoint/updateGrpcEndpoint";

export default function GrpcEndpointForm({
  projectId,
  endpointId,
  endpoint,
  onCanceled,
}: {
  projectId: ID;
  endpointId: ID;
  endpoint: GrpcEndpoint;
  onCanceled: () => void;
}) {
  const deleteMutation = useMutation({
    mutationFn: () => deleteGrpcEndpoint(projectId, endpointId),
    onSuccess: () => {},
  });
  const deleteEndpoint = (_projectId: ID, _endpointId: ID) => {
    deleteMutation.mutate();
  };
  const updateMutation = useMutation({
    mutationFn: (data: GrpcEndpoint) =>
      updateGrpcEndpoint(projectId, endpointId, { ...data, id: endpointId }),
    onSuccess: () => {},
  });
  const updateEndpoint = (
    _projectId: ID,
    _endpointId: ID,
    data: GrpcEndpoint
  ) => {
    updateMutation.mutate(data);
  };
  const [name, setName] = useState(endpoint.name);
  const [description, setDescription] = useState(endpoint.description);
  const [service, setService] = useState(endpoint.service);
  const [paramStream, setParamStream] = useState(endpoint.paramStream);
  const [resultStream, setResultStream] = useState(endpoint.resultStream);
  const [paramSchema, setParamSchema] = useState<RapiSchema>(
    endpoint.paramSchema
  );
  const [resultSchema, setResultSchema] = useState<RapiSchema>(
    endpoint.resultSchema
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Input
            className="w-64"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex gap-4 items-end">
          <div className="grid gap-2 w-fit">
            <Label htmlFor="service">Service</Label>
            <Input
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
            />
          </div>
          <div className="grid gap-2 w-[360px]">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <Tabs defaultValue={"param"}>
          <TabsList>
            <TabsTrigger value="param">Parameter</TabsTrigger>
            <TabsTrigger value="result">Result</TabsTrigger>
          </TabsList>
          <TabsContent value="param">
            <Card>
              <CardHeader>
                <CardTitle>Parameter</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="paramStream"
                    checked={paramStream}
                    onCheckedChange={(checked) => {
                      setParamStream(checked === true);
                    }}
                  />
                  <label
                    htmlFor="paramStream"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Stream
                  </label>
                </div>
                <SchemaEditor
                  projectId={projectId}
                  schema={paramSchema}
                  onSchemaChange={setParamSchema}
                />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="result">
            <Card>
              <CardHeader>
                <CardTitle>Result</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="resultStream"
                    checked={resultStream}
                    onCheckedChange={(checked) => {
                      setResultStream(checked === true);
                    }}
                  />
                  <label
                    htmlFor="resultStream"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Stream
                  </label>
                </div>
                <SchemaEditor
                  projectId={projectId}
                  schema={resultSchema}
                  onSchemaChange={setResultSchema}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button
          className="mr-auto"
          variant="destructive"
          onClick={() => deleteEndpoint(projectId, endpointId)}
        >
          Delete
        </Button>
        <Button variant="outline" onClick={() => onCanceled()}>
          Cancel
        </Button>
        <Button
          onClick={() => {
            const newEndpoint = {
              ...endpoint,
              name,
              description,
              service,
              paramStream,
              resultStream,
              paramSchema,
              resultSchema,
            };
            updateEndpoint(projectId, endpointId, newEndpoint);
          }}
        >
          Save
        </Button>
      </CardFooter>
    </Card>
  );
}
