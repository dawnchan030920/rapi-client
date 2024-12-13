import { ID } from "@/api/schema/id";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Blocks,
  Boxes,
  ChevronRight,
  Cog,
  Fingerprint,
  Plug,
  Plus,
  SendToBack,
  Tag,
  UserRound,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

type RestfulEndpointOverview = {
  id: ID;
  name: string;
  httpMethod: string;
};

type GrpcEndpointOverview = {
  id: ID;
  name: string;
  service: string;
};

type StructureOverview = {
  id: ID;
  name: string;
};

type GroupOverview = {
  id: ID;
  type: "JWT" | "CRUD";
  endpoints: RestfulEndpointOverview[];
};

type CrewOverview = {
  id: ID;
  username: string;
  isAdmin: boolean;
};

type StateOverview = {
  id: ID;
  name: string;
  isDefault: boolean;
};

export default function Project({
  grpcEndpoints,
  restfulEndpoints,
  structures,
  groups,
  crew,
  states,
}: {
  grpcEndpoints: GrpcEndpointOverview[];
  restfulEndpoints: RestfulEndpointOverview[];
  structures: StructureOverview[];
  groups: GroupOverview[];
  crew: CrewOverview[];
  states: StateOverview[];
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>API</SidebarGroupLabel>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarGroupAction title="Add API">
                  <Plus />
                </SidebarGroupAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="right" align="start">
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>CRUD</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>JWT</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>RESTful</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>gRPC</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <span>Structure</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <SidebarGroupContent>
              <SidebarMenu>
                {groups.map((group) => (
                  <Collapsible
                    defaultOpen={false}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem key={group.id}>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton>
                          <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                          {group.type === "CRUD" ? <Blocks /> : <Fingerprint />}
                          <span>{group.type}</span>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <SidebarMenuBadge>
                        {group.endpoints.length}
                      </SidebarMenuBadge>
                      <CollapsibleContent>
                        <SidebarMenuSub className="mr-0 pr-0">
                          {group.endpoints.map((endpoint) => (
                            <SidebarMenuItem key={endpoint.id}>
                              <SidebarMenuButton>
                                <Plug />
                                <span>{endpoint.name}</span>
                              </SidebarMenuButton>
                              <SidebarMenuBadge>
                                {endpoint.httpMethod}
                              </SidebarMenuBadge>
                            </SidebarMenuItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ))}
                {restfulEndpoints.map((endpoint) => (
                  <SidebarMenuItem key={endpoint.id}>
                    <SidebarMenuButton>
                      <Plug />
                      <span>{endpoint.name}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{endpoint.httpMethod}</SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}
                {grpcEndpoints.map((endpoint) => (
                  <SidebarMenuItem key={endpoint.id}>
                    <SidebarMenuButton>
                      <SendToBack />
                      <span>{endpoint.name}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{endpoint.service}</SidebarMenuBadge>
                  </SidebarMenuItem>
                ))}

                {structures.map((structure) => (
                  <SidebarMenuItem key={structure.id}>
                    <SidebarMenuButton>
                      <Boxes />
                      <span>{structure.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>Crew</SidebarGroupLabel>
            <SidebarGroupAction title="Invite Crew">
              <Plus />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {crew.map((crew) => (
                  <SidebarMenuItem key={crew.id}>
                    <SidebarMenuButton>
                      {crew.isAdmin ? <Cog /> : <UserRound />}
                      <span>{crew.username}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>State</SidebarGroupLabel>
            <SidebarGroupAction title="Add State">
              <Plus />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {states.map((state) => (
                  <SidebarMenuItem key={state.id}>
                    <SidebarMenuButton>
                      <Tag />
                      <span>{state.name}</span>
                    </SidebarMenuButton>
                    {state.isDefault && (
                      <SidebarMenuBadge>Default</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <main>
        <SidebarTrigger />
      </main>
    </SidebarProvider>
  );
}
