import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import projectOverview from "@/api/project/projectOverview";
import ProjectRender from "@/components/pages/Project";
import { useParams } from "react-router-dom";
import createCrudGroup from "@/api/crudGroup/createCrudGroup";
import createGrpcEndpoint from "@/api/grpcEndpoint/createGrpcEndpoint";
import createJwtGroup from "@/api/jwtGroup/createJwtGroup";
import createRestfulEndpoint from "@/api/restfulEndpoint/createRestfulEndpoint";
import createStructure from "@/api/structure/createStructure";
import { inviteCrew } from "@/api/crew/inviteCrew";
import { createState as addState } from "@/api/state/createState";
import { deleteState as removeState } from "@/api/state/deleteState";
import { changeDefaultState } from "@/api/state/changeDefaultState";
import { changeRole as changeCrewRole } from "@/api/crew/changeRole";

export default function Project() {
  const { projectId } = useParams<{ projectId: string }>();
  const queryClient = useQueryClient();

  if (!projectId) {
    return <div>Project ID is missing</div>;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["projectOverview", projectId],
    queryFn: () => projectOverview(projectId),
  });

  const handleCreateRestfulEndpoint = useMutation(
    (variables: {
      projectId: string;
      request: { name: string; httpMethod: string; description: string };
    }) =>
      createRestfulEndpoint(variables.projectId, {
        ...variables.request,
        httpMethod: variables.request.httpMethod as
          | "GET"
          | "POST"
          | "PUT"
          | "DELETE"
          | "PATCH"
          | "OPTIONS"
          | "HEAD"
          | "TRACE"
          | "CONNECT",
      }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["projectOverview", projectId]),
    }
  );

  const handleCreateGrpcEndpoint = useMutation(
    (variables: {
      projectId: string;
      request: {
        name: string;
        service: string;
        description: string;
        paramStream: boolean;
        resultStream: boolean;
      };
    }) => createGrpcEndpoint(variables.projectId, variables.request),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["projectOverview", projectId]),
    }
  );

  const handleCreateStructure = useMutation(
    (variables: { projectId: string; request: { name: string } }) =>
      createStructure(variables.projectId, variables.request),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["projectOverview", projectId]),
    }
  );

  const handleCreateCrudGroup = useMutation(
    (variables: { projectId: string; request: { sourceStructure: string } }) =>
      createCrudGroup(variables.projectId, variables.request),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["projectOverview", projectId]),
    }
  );

  const handleCreateJwtGroup = useMutation(
    (variables: { projectId: string; request: {} }) =>
      createJwtGroup(variables.projectId, variables.request),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["projectOverview", projectId]),
    }
  );

  const handleInviteCrew = useMutation(
    (variables: { projectId: string; request: { email: string } }) =>
      inviteCrew(variables.projectId, variables.request),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["projectOverview", projectId]),
    }
  );

  const handleAddState = useMutation(
    (variables: { projectId: string; request: { name: string } }) =>
      addState(variables.projectId, variables.request),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["projectOverview", projectId]),
    }
  );

  const handleRemoveState = useMutation(
    (variables: { projectId: string; stateId: string }) =>
      removeState(variables.projectId, variables.stateId),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["projectOverview", projectId]),
    }
  );

  const handleChangeDefaultState = useMutation(
    (variables: { projectId: string; request: { stateId: string } }) =>
      changeDefaultState(variables.projectId, variables.request),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["projectOverview", projectId]),
    }
  );

  const handlePromoteCrew = useMutation(
    (crewId: string) =>
      changeCrewRole(projectId, crewId, { action: "promote" }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["projectOverview", projectId]),
    }
  );

  const handleDemoteCrew = useMutation(
    (crewId: string) => changeCrewRole(projectId, crewId, { action: "demote" }),
    {
      onSuccess: () =>
        queryClient.invalidateQueries(["projectOverview", projectId]),
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading project overview</div>;

  if (data)
    return (
      <ProjectRender
        grpcEndpoints={data.grpcEndpoints}
        restfulEndpoints={data.restfulEndpoints}
        structures={data.structures}
        groups={data.groups}
        crew={data.crews.map((crew) => ({
          id: crew.id,
          username: crew.username,
          isAdmin: crew.role === "admin",
        }))}
        states={data.states}
        projectId={projectId}
        createRestfulEndpoint={(
          name: string,
          httpMethod: string,
          description: string
        ) =>
          handleCreateRestfulEndpoint.mutate({
            projectId,
            request: { name, httpMethod, description },
          })
        }
        createGrpcEndpoint={(
          name: string,
          service: string,
          description: string,
          isParamStream: boolean,
          isResultStream: boolean
        ) =>
          handleCreateGrpcEndpoint.mutate({
            projectId,
            request: {
              name,
              service,
              description,
              paramStream: isParamStream,
              resultStream: isResultStream,
            },
          })
        }
        createStructure={(name: string) =>
          handleCreateStructure.mutate({ projectId, request: { name } })
        }
        createCrudGroup={(sourceStructure: string) =>
          handleCreateCrudGroup.mutate({
            projectId,
            request: { sourceStructure },
          })
        }
        createJwtGroup={() =>
          handleCreateJwtGroup.mutate({ projectId, request: {} })
        }
        inviteCrew={(email: string) =>
          handleInviteCrew.mutate({ projectId, request: { email } })
        }
        addState={(projectId: string, name: string) =>
          handleAddState.mutate({ projectId, request: { name } })
        }
        removeState={(projectId: string, stateId: string) =>
          handleRemoveState.mutate({ projectId, stateId })
        }
        changeDefaultState={(projectId: string, stateId: string) =>
          handleChangeDefaultState.mutate({ projectId, request: { stateId } })
        }
        promoteCrew={(_projectId: string, crewId: string) => handlePromoteCrew.mutate(crewId)}
        demoteCrew={(_projectId: string, crewId: string) => handleDemoteCrew.mutate(crewId)}
      />
    );
  return null;
}
