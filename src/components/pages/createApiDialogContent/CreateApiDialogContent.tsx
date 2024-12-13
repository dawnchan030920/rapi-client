import { ID } from "@/api/schema/id";
import CreateCrudGroupDialogContent from "./CreateCrudGroupDialogContent";
import CreateRestfulEndpointDialogContent from "./CreateRestfulEndpointDialogContent";
import CreateGrpcEndpointDialogContent from "./CreateGrpcEndpointDialogContent";
import CreateStructureDialogContent from "./CreateStructureDialogContent";

export default function CreateApiDialogContent({
  api,
}: {
  api:
    | {
        type: "REST";
        createRestfulEndpoint: (
          name: string,
          httpMethod: string,
          description: string
        ) => void;
      }
    | {
        type: "GRPC";
        createGrpcEndpoint: (
          name: string,
          service: string,
          description: string,
          isParamStream: boolean,
          isResultStream: boolean
        ) => void;
      }
    | { type: "CRUD"; createCrudGroup: (sourceStructure: ID) => void }
    | { type: "STRUCTURE"; createStructure: (name: string) => void };
}) {
  switch (api.type) {
    case "CRUD":
      return (
        <CreateCrudGroupDialogContent createCrudGroup={api.createCrudGroup} />
      );
    case "REST":
      return (
        <CreateRestfulEndpointDialogContent
          createRestfulEndpoint={api.createRestfulEndpoint}
        />
      );
    case "GRPC":
      return (
        <CreateGrpcEndpointDialogContent
          createGrpcEndpoint={api.createGrpcEndpoint}
        />
      );
    case "STRUCTURE":
      return (
        <CreateStructureDialogContent createStructure={api.createStructure} />
      );
  }
}
