import { useAuth } from "@/components/auth/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import projectList from "@/api/project/projectList";
import { joinProject } from "@/api/crew/joinProject";
import { allInvitations } from "@/api/crew/allInvitations";
import { ID } from "@/api/schema/id";
import OvewviewRender from "@/components/pages/Overview";

export default function Overview() {
  const { logout, user } = useAuth();
  const queryClient = useQueryClient();

  const { data: projects = [], error: projectsError } = useQuery({
    queryKey: ["projects"],
    queryFn: projectList,
  });

  const { data: invitations = [], error: invitationsError } = useQuery({
    queryKey: ["invitations"],
    queryFn: allInvitations,
  });

  const joinProjectMutation = useMutation({
    mutationFn: ({
      projectId,
      username,
    }: {
      projectId: string;
      username: string;
    }) => joinProject(projectId, { username }),
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      queryClient.invalidateQueries(["invitations"]);
    },
  });

  function handleJoinProject(projectId: ID, username: string) {
    joinProjectMutation.mutate({ projectId, username });
  }

  if (projectsError || invitationsError) {
    console.error(projectsError || invitationsError);
    return <div>Error loading data</div>;
  }

  return (
    user && (
      <OvewviewRender
        logout={logout}
        username={user.username}
        projects={projects}
        invitations={invitations}
        joinProject={handleJoinProject}
      />
    )
  );
}
