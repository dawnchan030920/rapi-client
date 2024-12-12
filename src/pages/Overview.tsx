import { useAuth } from "@/components/auth/useAuth";
import ProjectGridItem from "@/components/ProjectGridItem";
import projectList from "@/api/project/projectList";
import { joinProject } from "@/api/crew/joinProject";
import { allInvitations } from "@/api/crew/allInvitations";
import { useEffect, useState } from "react";
import { ID } from "@/api/schema/id";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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

  return (
    <div className="flex h-screen w-full p-4">
      {user && (
        <>
          <div className="flex flex-col gap-4">
            <div className="flex justify-start gap-4">
              <div className="text-3xl font-semibold">
                Hello, {user.username}
              </div>
              <Button onClick={logout}>Log out</Button>
            </div>
            <div className="flex justify-start gap-4">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {invitations.map((invitation) => (
                      <SelectItem
                        key={invitation.projectId}
                        value={invitation.projectId}
                      >
                        <SelectLabel>{invitation.projectName}</SelectLabel>
                        <Button
                          onClick={() =>
                            joinProject(invitation.projectId, {
                              username: user.username,
                            }).catch(console.error)
                          }
                        >
                          Accept
                        </Button>
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Separator />
        </>
      )}
      <div className="grid grid-flow-row auto-rows-auto gap-4">
        {projects.map((project) => (
          <ProjectGridItem key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
