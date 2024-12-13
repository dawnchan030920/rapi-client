import { useAuth } from "@/components/auth/useAuth";
import projectList from "@/api/project/projectList";
import { joinProject } from "@/api/crew/joinProject";
import { allInvitations } from "@/api/crew/allInvitations";
import { useEffect, useState } from "react";
import { ID } from "@/api/schema/id";
import OvewviewRender from "@/components/pages/Overview";

export default function Overview() {
  const { logout, user } = useAuth();

  const [projects, setProjects] = useState<
    {
      id: ID;
      title: string;
      role: string;
      endpointCount: number;
      structureCount: number;
      groupCount: number;
    }[]
  >([]);

  const [invitations, setInvitations] = useState<
    {
      projectId: ID;
      projectName: string;
    }[]
  >([]);

  useEffect(() => {
    projectList()
      .then((projects) => setProjects(projects))
      .catch(console.error);
  }, []);

  useEffect(() => {
    allInvitations()
      .then(({ invitations }) => setInvitations(invitations))
      .catch(console.error);
  }, []);

  async function handleJoinProject(projectId: ID, username: string) {
    await joinProject(projectId, { username }).catch(console.error);
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
