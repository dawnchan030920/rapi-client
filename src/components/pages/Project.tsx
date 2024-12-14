import { ID } from "@/api/schema/id";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
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
  MoreHorizontal,
  Pin,
  Plug,
  Plus,
  SendToBack,
  Tag,
  Trash2,
  UserRound,
  UserRoundPen,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Dialog, DialogTrigger } from "../ui/dialog";
import CreateApiDialogContent from "./createApiDialogContent/CreateApiDialogContent";
import { useState } from "react";
import InviteCrewDialogContent from "./InviteCrewDialogContent";
import AddStateDialogContent from "./AddStateDialogContent";

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
  projectId,
  grpcEndpoints,
  restfulEndpoints,
  structures,
  groups,
  crew,
  states,
  createRestfulEndpoint,
  createGrpcEndpoint,
  createCrudGroup,
  createStructure,
  createJwtGroup,
  inviteCrew,
  addState,
  removeState,
  changeDefaultState,
  promoteCrew,
  demoteCrew,
}: {
  projectId: ID;
  grpcEndpoints: GrpcEndpointOverview[];
  restfulEndpoints: RestfulEndpointOverview[];
  structures: StructureOverview[];
  groups: GroupOverview[];
  crew: CrewOverview[];
  states: StateOverview[];
  createRestfulEndpoint: (
    name: string,
    httpMethod: string,
    description: string
  ) => void;
  createGrpcEndpoint: (
    name: string,
    service: string,
    description: string,
    isParamStream: boolean,
    isResultStream: boolean
  ) => void;
  createCrudGroup: (sourceStructure: ID) => void;
  createStructure: (name: string) => void;
  createJwtGroup: () => void;
  inviteCrew: (projectId: ID, email: string) => void;
  addState: (projectId: ID, name: string) => void;
  removeState: (projectId: ID, stateId: ID) => void;
  changeDefaultState: (projectId: ID, stateId: ID) => void;
  promoteCrew: (projectId: ID, crewId: ID) => void;
  demoteCrew: (projectId: ID, crewId: ID) => void;
}) {
  const [createApiDialogProps, setCreateApiDialogProps] = useState<{
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
      | {
          type: "CRUD";
          createCrudGroup: (sourceStructure: ID) => void;
          projectId: ID;
        }
      | { type: "STRUCTURE"; createStructure: (name: string) => void };
  } | null>(null);
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>API</SidebarGroupLabel>
            <Dialog>
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <SidebarGroupAction title="Add API">
                    <Plus />
                  </SidebarGroupAction>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                  <DropdownMenuGroup>
                    <DialogTrigger asChild>
                      <DropdownMenuItem
                        onClick={() => {
                          setCreateApiDialogProps({
                            api: {
                              projectId: projectId,
                              type: "CRUD",
                              createCrudGroup,
                            },
                          });
                        }}
                      >
                        <span>CRUD</span>
                      </DropdownMenuItem>
                    </DialogTrigger>

                    <DropdownMenuItem
                      onClick={() => {
                        createJwtGroup();
                      }}
                    >
                      <span>JWT</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DialogTrigger asChild>
                      <DropdownMenuItem
                        onClick={() => {
                          setCreateApiDialogProps({
                            api: {
                              type: "REST",
                              createRestfulEndpoint,
                            },
                          });
                        }}
                      >
                        <span>RESTful</span>
                      </DropdownMenuItem>
                    </DialogTrigger>

                    <DialogTrigger asChild>
                      <DropdownMenuItem
                        onClick={() => {
                          setCreateApiDialogProps({
                            api: {
                              type: "GRPC",
                              createGrpcEndpoint,
                            },
                          });
                        }}
                      >
                        <span>gRPC</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DialogTrigger asChild>
                      <DropdownMenuItem
                        onClick={() => {
                          setCreateApiDialogProps({
                            api: {
                              type: "STRUCTURE",
                              createStructure,
                            },
                          });
                        }}
                      >
                        <span>Structure</span>
                      </DropdownMenuItem>
                    </DialogTrigger>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              {createApiDialogProps && (
                <CreateApiDialogContent api={createApiDialogProps.api} />
              )}
            </Dialog>

            <SidebarGroupContent>
              <SidebarMenu>
                {groups.map((group) => (
                  <Collapsible
                    key={group.id}
                    defaultOpen={false}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
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
            <Dialog>
              <DialogTrigger>
                <SidebarGroupAction title="Invite Crew">
                  <Plus />
                </SidebarGroupAction>
              </DialogTrigger>
              <InviteCrewDialogContent
                projectId={projectId}
                inviteCrew={inviteCrew}
              />
            </Dialog>
            <SidebarGroupContent>
              <SidebarMenu>
                {crew.map((crew) => (
                  <SidebarMenuItem key={crew.id}>
                    <SidebarMenuButton>
                      {crew.isAdmin ? <Cog /> : <UserRound />}
                      <span>{crew.username}</span>
                    </SidebarMenuButton>
                    <SidebarMenuAction
                      onClick={() => {
                        if (crew.isAdmin) {
                          demoteCrew(projectId, crew.id);
                        } else {
                          promoteCrew(projectId, crew.id);
                        }
                      }}
                    >
                      <UserRoundPen />
                    </SidebarMenuAction>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarSeparator />

          <SidebarGroup>
            <SidebarGroupLabel>State</SidebarGroupLabel>
            <Dialog>
              <DialogTrigger>
                <SidebarGroupAction title="Add State">
                  <Plus />
                </SidebarGroupAction>
              </DialogTrigger>
              <AddStateDialogContent
                projectId={projectId}
                addState={addState}
              />
            </Dialog>

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
                    {!state.isDefault && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <SidebarMenuAction title="More">
                            <MoreHorizontal />
                          </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start">
                          <DropdownMenuItem
                            onClick={() =>
                              changeDefaultState(projectId, state.id)
                            }
                          >
                            <Pin />
                            <span>Set as Default</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => removeState(projectId, state.id)}
                          >
                            <Trash2 />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
