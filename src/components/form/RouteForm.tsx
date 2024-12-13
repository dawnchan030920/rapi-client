import { RapiSchema } from "@/api/schema/schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import SchemaEditor from "../schemaEditor/SchemaEditor";
import { Button } from "../ui/button";

export default function RouteForm({
  route,
  setRoute,
}: {
  route: (
    | { constant: string; type: "constant" }
    | { name: string; schema: RapiSchema; type: "schema" }
  )[];
  setRoute: (
    route: (
      | { constant: string; type: "constant" }
      | { name: string; schema: RapiSchema; type: "schema" }
    )[]
  ) => void;
}) {
  const removeItem = (index: number) => {
    const newRoute = route.filter((_, i) => i !== index);
    setRoute(newRoute);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Route</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          {route.map((item, index) => {
            if (item.type === "constant") {
              return (
                <div key={index} className="flex gap-2 justify-start">
                  <Input
                    className="w-auto"
                    id="constant"
                    value={item.constant}
                    onChange={(e) => {
                      const newRoute = [...route];
                      newRoute[index] = {
                        constant: e.target.value,
                        type: "constant",
                      };
                      setRoute(newRoute);
                    }}
                  />
                  <Button onClick={() => removeItem(index)} className="ml-auto">
                    Remove
                  </Button>
                </div>
              );
            } else {
              return (
                <div key={index} className="flex gap-2 justify-start">
                  <Input
                    className="w-auto"
                    id="name"
                    value={item.name}
                    onChange={(e) => {
                      const newRoute = [...route];
                      newRoute[index] = {
                        name: e.target.value,
                        schema: item.schema,
                        type: "schema",
                      };
                      setRoute(newRoute);
                    }}
                  />
                  <SchemaEditor
                    schema={item.schema}
                    onSchemaChange={(schema) => {
                      const newRoute = [...route];
                      newRoute[index] = {
                        name: item.name,
                        schema,
                        type: "schema",
                      };
                      setRoute(newRoute);
                    }}
                  />
                  <Button onClick={() => removeItem(index)} className="ml-auto">
                    Remove
                  </Button>
                </div>
              );
            }
          })}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button
          onClick={() => {
            setRoute([...route, { constant: "", type: "constant" }]);
          }}
        >
          Add Constant
        </Button>
        <Button
          onClick={() => {
            setRoute([
              ...route,
              {
                name: "",
                schema: { type: "string" },
                type: "schema",
              },
            ]);
          }}
        >
          Add Schema
        </Button>
      </CardFooter>
    </Card>
  );
}
