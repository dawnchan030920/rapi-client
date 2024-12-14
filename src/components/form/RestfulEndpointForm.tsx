import { RestfulEndpoint } from "@/api/restfulEndpoint/restfulEndpoint";
import { ID } from "@/api/schema/id";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { Input } from "../ui/input";
import StatePicker from "../StatePicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { RapiObjectSchema, RapiSchema } from "@/api/schema/schema";
import SchemaEditor from "../schemaEditor/SchemaEditor";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import ResponsesForm from "./ResponsesForm";
import RouteForm from "./RouteForm";
import { Checkbox } from "../ui/checkbox";
import ObjectEditor from "../schemaEditor/ObjectEditor";
import { useMutation } from "@tanstack/react-query";
import deleteRestfulEndpoint from "@/api/restfulEndpoint/deleteRestfulEndpoint";
import updateRestfulEndpoint from "@/api/restfulEndpoint/updateRestfulEndpoint";

function transformRoute(
  input: (
    | {
        constant: string;
      }
    | {
        name: string;
        schema?: unknown;
      }
  )[]
): (
  | { constant: string; type: "constant" }
  | { name: string; schema: RapiSchema; type: "schema" }
)[] {
  return input.map((item) => {
    if ("constant" in item) {
      return { constant: item.constant, type: "constant" };
    } else if ("name" in item) {
      return {
        name: item.name,
        schema: item.schema as RapiSchema,
        type: "schema",
      };
    } else {
      throw new Error("Invalid input item");
    }
  });
}

export default function RestfulEndpointForm({
  endpoint,
  endpointId,
  projectId,
  onCanceled,
}: {
  endpointId: ID;
  projectId: ID;
  endpoint: RestfulEndpoint;
  onCanceled: () => void;
}) {
  const deleteMutation = useMutation({
    mutationFn: () => deleteRestfulEndpoint(projectId, endpointId),
    onSuccess: () => {},
  });
  const deleteEndpoint = (_projectId: ID, _endpointId: ID) => {
    deleteMutation.mutate();
  };
  const updateMutation = useMutation({
    mutationFn: (newEndpoint: RestfulEndpoint) =>
      updateRestfulEndpoint(projectId, endpointId, {
        ...newEndpoint,
        id: endpointId,
      }),
    onSuccess: () => {},
  });
  const updateEndpoint = (
    _projectId: ID,
    _endpointId: ID,
    newEndpoint: RestfulEndpoint
  ) => {
    updateMutation.mutate(newEndpoint);
  };
  const [httpMethod, setHttpMethod] = useState<
    | "GET"
    | "POST"
    | "PUT"
    | "DELETE"
    | "PATCH"
    | "OPTIONS"
    | "HEAD"
    | "TRACE"
    | "CONNECT"
  >(
    endpoint.httpMethod as
      | "GET"
      | "POST"
      | "PUT"
      | "DELETE"
      | "PATCH"
      | "OPTIONS"
      | "HEAD"
      | "TRACE"
      | "CONNECT"
  );
  const [name, setName] = useState(endpoint.name);
  const [stateId, setStateId] = useState(endpoint.state);
  const [description, setDescription] = useState(endpoint.description);
  const [request, setRequest] = useState<RapiSchema | undefined>(
    endpoint.request
  );
  const [responses, setResponses] = useState(
    endpoint.response.map((res) => ({
      ...res,
      schema: res.schema as RapiSchema,
    }))
  );
  const [route, setRoute] = useState(transformRoute(endpoint.routePath));
  const [header, setHeader] = useState<RapiObjectSchema | undefined>(
    endpoint.header
  );
  const [query, setQuery] = useState<RapiObjectSchema | undefined>(
    endpoint.query
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
      <CardContent>
        <div className="grid gap-4">
          <div className="flex gap-4">
            <div className="grid gap-2">
              <Label>HTTP Method</Label>
              <Select
                value={httpMethod}
                onValueChange={(value) =>
                  setHttpMethod(
                    value as
                      | "GET"
                      | "POST"
                      | "PUT"
                      | "DELETE"
                      | "PATCH"
                      | "OPTIONS"
                      | "HEAD"
                      | "TRACE"
                      | "CONNECT"
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an HTTP method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="GET">GET</SelectItem>
                  <SelectItem value="POST">POST</SelectItem>
                  <SelectItem value="PUT">PUT</SelectItem>
                  <SelectItem value="PATCH">PATCH</SelectItem>
                  <SelectItem value="DELETE">DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 flex-grow">
              <Label>Route</Label>
              <Input
                disabled
                value={route
                  .map((fragment) => {
                    if (fragment.type === "constant") {
                      return fragment.constant;
                    } else {
                      return `:${fragment.name}`;
                    }
                  })
                  .join("/")}
              />
            </div>
          </div>

          <div className="flex gap-4 items-end">
            <div className="w-[160px]">
              <StatePicker
                projectId={projectId}
                stateId={stateId}
                onStateIdChanged={setStateId}
              />
            </div>

            <div className="grid gap-2 w-[400px]">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>

          <Tabs className="w-full" defaultValue="request">
            <TabsList>
              <TabsTrigger value="request">Request</TabsTrigger>
              <TabsTrigger value="response">Response</TabsTrigger>
              <TabsTrigger value="route">Route</TabsTrigger>
              <TabsTrigger value="header">Header</TabsTrigger>
              <TabsTrigger value="query">Query</TabsTrigger>
            </TabsList>
            <TabsContent value="request">
              <Card>
                <CardHeader>
                  <CardTitle>Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="request"
                        checked={request !== undefined}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setRequest({ type: "object", fields: [] });
                          } else {
                            setRequest(undefined);
                          }
                        }}
                      />
                      <label
                        htmlFor="request"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include request
                      </label>
                    </div>

                    {request && (
                      <SchemaEditor
                        projectId={projectId}
                        schema={request}
                        onSchemaChange={(schema) => setRequest(schema)}
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="response">
              <ResponsesForm
                projectId={projectId}
                responses={responses}
                setResponses={setResponses}
              />
            </TabsContent>
            <TabsContent value="route">
              <RouteForm
                projectId={projectId}
                route={route}
                setRoute={setRoute}
              />
            </TabsContent>
            <TabsContent value="header">
              <Card>
                <CardHeader>
                  <CardTitle>Header</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="header"
                        checked={header !== undefined}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setHeader({ type: "object", fields: [] });
                          } else {
                            setHeader(undefined);
                          }
                        }}
                      />
                      <label
                        htmlFor="header"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include header
                      </label>
                    </div>

                    {header && (
                      <ObjectEditor
                        projectId={projectId}
                        fields={header.fields}
                        onSchemaChange={(schema) =>
                          setHeader(schema as RapiObjectSchema)
                        }
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="query">
              <Card>
                <CardHeader>
                  <CardTitle>Query</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="query"
                        checked={query !== undefined}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setQuery({ type: "object", fields: [] });
                          } else {
                            setQuery(undefined);
                          }
                        }}
                      />
                      <label
                        htmlFor="query"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Include query
                      </label>
                    </div>

                    {query && (
                      <ObjectEditor
                        projectId={projectId}
                        fields={query.fields}
                        onSchemaChange={(schema) =>
                          setQuery(schema as RapiObjectSchema)
                        }
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
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
              httpMethod,
              name,
              state: stateId,
              description,
              request,
              response: responses,
              routePath: route,
              header,
              query,
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
