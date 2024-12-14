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
import ProjectGridItem from "../ProjectGridItem";
import { useState } from "react";

export default function Overview({
  logout,
  username,
  projects,
  invitations,
  joinProject,
}: {
  logout: () => void;
  username: string;
  projects: {
    id: ID;
    title: string;
    role: string;
    endpointCount: number;
    structureCount: number;
    groupCount: number;
  }[];
  invitations: {
    projectId: ID;
    projectName: string;
  }[];
  joinProject: (projectId: ID, username: string) => void;
}) {
  const [selectedProjectId, setSelectedProjectId] = useState<ID | undefined>(
    undefined
  );

  return (
    <div className="flex flex-col h-screen w-full p-4 gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex justify-start gap-4">
          <div className="text-3xl font-semibold">Hello, {username}</div>
          <Button onClick={logout}>Log out</Button>
        </div>
        <div className="flex justify-start gap-4">
          <Select
            value={selectedProjectId}
            onValueChange={setSelectedProjectId}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Invitations" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {invitations.map((invitation) => (
                  <SelectItem
                    key={invitation.projectId}
                    value={invitation.projectId}
                  >
                    <SelectLabel>{invitation.projectName}</SelectLabel>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            onClick={() =>
              selectedProjectId && joinProject(selectedProjectId, username)
            }
          >
            Join
          </Button>
        </div>
      </div>
      <Separator />
      <div className="grid grid-flow-row auto-rows-auto gap-4">
        {projects.map((project) => (
          <ProjectGridItem key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}
