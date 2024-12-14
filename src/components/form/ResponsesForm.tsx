import { useState } from "react";
import { RapiSchema } from "@/api/schema/schema";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "../ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import SchemaEditor from "../schemaEditor/SchemaEditor";
import { produce } from "immer";
import { ID } from "@/api/schema/id";

export default function ResponsesForm({
  responses,
  setResponses,
  projectId,
}: {
  projectId: ID;
  responses: { description: string; statusCode: number; schema: RapiSchema }[];
  setResponses: (
    responses: { description: string; statusCode: number; schema: RapiSchema }[]
  ) => void;
}) {
  const [selectedTab, setSelectedTab] = useState(0);
  const [newStatusCode, setNewStatusCode] = useState<string>("");

  return (
    <Card>
      <CardHeader className="flex gap-2">
        <CardTitle>Responses</CardTitle>
        <Input
          className="w-fit"
          id="newStatusCode"
          value={`${newStatusCode}`}
          onChange={(e) => setNewStatusCode(e.target.value)}
        />
        <Button
          className="w-fit"
          onClick={() => {
            if (newStatusCode !== undefined) {
              const code = parseInt(newStatusCode);
              if (
                !code ||
                code < 100 ||
                code > 599 ||
                responses.some((r) => r.statusCode === code)
              ) {
                return;
              }
              setResponses([
                ...responses,
                {
                  description: "",
                  statusCode: parseInt(newStatusCode),
                  schema: { type: "object", fields: [] },
                },
              ]);
              setNewStatusCode("");
            }
          }}
        >
          New Response
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={`${selectedTab}`}>
          <TabsList>
            {responses.map((response, i) => (
              <TabsTrigger
                value={`${i}`}
                key={i}
                onClick={() => setSelectedTab(i)}
              >
                {response.statusCode}
              </TabsTrigger>
            ))}
          </TabsList>
          {responses.map((response, i) => (
            <TabsContent value={`${i}`} key={i}>
              <div className="grid gap-2">
                <Input
                  id={"statusCode"}
                  value={response.statusCode}
                  className="w-fit"
                  onChange={(e) => {
                    const code = parseInt(e.target.value);
                    if (
                      !code ||
                      code < 100 ||
                      code > 599 ||
                      responses.some((r) => r.statusCode === code)
                    ) {
                      return;
                    }
                    setResponses(
                      produce(responses, (draft) => {
                        draft[i].statusCode = code;
                      })
                    );
                  }}
                />
                <Input
                  id={"description"}
                  value={response.description}
                  className="w-fit"
                  onChange={(e) =>
                    setResponses(
                      produce(responses, (draft) => {
                        draft[i].description = e.target.value;
                      })
                    )
                  }
                />
                <SchemaEditor
                  projectId={projectId}
                  schema={response.schema}
                  onSchemaChange={(schema) =>
                    setResponses(
                      produce(responses, (draft) => {
                        draft[i].schema = schema;
                      })
                    )
                  }
                />
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
