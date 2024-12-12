import { useState } from "react";
import { RapiSchema } from "./api/schema/schema";
import SchemaEditor from "./components/schemaEditor/SchemaEditor";

function App() {
  const [schema, setSchema] = useState<RapiSchema>({
    type: "object",
    fields: [],
  });

  return (
    <>
      <SchemaEditor
        schema={schema}
        onSchemaChange={(schema) => {
          setSchema(schema);
          console.log(schema);
        }}
      />
    </>
  );
}

export default App;
