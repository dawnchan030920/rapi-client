import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Project() {
  const { projectId } = useParams<{ projectId: string }>();
  const [states, setStates] = useState<
    {
      id: string;
      name: string;
      isDefault: boolean;
    }[]
  >([]);
  const [crews, setCrews] = useState<
    {
      id: string;
      username: string;
      isAdmin: boolean;
    }[]
  >([]);

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>API</SidebarGroupLabel>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Crew</SidebarGroupLabel>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>State</SidebarGroupLabel>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
}
