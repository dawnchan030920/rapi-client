import { useQuery } from "@tanstack/react-query";
import projectOverview from "@/api/project/projectOverview";
import ProjectRender from "@/components/pages/Project";
import { useParams } from "react-router-dom";

export default function Project() {
  const { projectId } = useParams<{ projectId: string }>();

  if (!projectId) {
    return <div>Project ID is missing</div>;
  }

  const { data, error, isLoading } = useQuery({
    queryKey: ["projectOverview", projectId],
    queryFn: () => projectOverview(projectId),
    enabled: !!projectId,
  });

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
          isAdmin: crew.role === "ADMIN",
        }))}
        states={data.states}
      />
    );
  return null;
}
