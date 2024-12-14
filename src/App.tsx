import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "@/pages/Overview";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Project from "./pages/Project";

import ProjectRender from "./components/pages/Project";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RestfulEndpointForm from "./components/form/RestfulEndpointForm";
import GrpcEndpointForm from "./components/form/GrpcEndpointForm";
import CrudGroupForm from "./components/form/CrudGroupForm";
import JwtGroupForm from "./components/form/JwtGroupForm";
import DiscussionPanel from "./components/DiscussionPanel";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Overview />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/project/:projectId"
              element={
                <ProtectedRoute>
                  <Project />
                </ProtectedRoute>
              }
            />
            {/**
             * Test Route
             */}
            <Route
              path="/"
              element={
                <>
                  {/* <ProjectRender
                    projectId="1"
                    promoteCrew={(projectId, crewId) => {
                      console.log(
                        "promoteCrew ",
                        crewId,
                        "for project ",
                        projectId
                      );
                    }}
                    demoteCrew={(projectId, crewId) => {
                      console.log(
                        "demoteCrew ",
                        crewId,
                        "for project ",
                        projectId
                      );
                    }}
                    changeDefaultState={(projectId, stateId) => {
                      console.log(
                        "changeDefaultState ",
                        stateId,
                        "for project ",
                        projectId
                      );
                    }}
                    removeState={(projectId, stateId) => {
                      console.log(
                        "removeState ",
                        stateId,
                        "from project ",
                        projectId
                      );
                    }}
                    addState={(projectId, name) => {
                      console.log("addState ", name, "to project ", projectId);
                    }}
                    inviteCrew={(id, email) => {
                      console.log("inviteCrew ", email, "to project ", id);
                    }}
                    createCrudGroup={(source) => {
                      console.log("createCrudGroup for ", source);
                    }}
                    createStructure={(name) => {
                      console.log("createStructure named ", name);
                    }}
                    createRestfulEndpoint={(name, method, description) => {
                      console.log(
                        "createRestfulEndpoint named ",
                        name,
                        " with method ",
                        method,
                        " and description ",
                        description
                      );
                    }}
                    createGrpcEndpoint={(
                      name,
                      service,
                      description,
                      paramStream,
                      resultStream
                    ) => {
                      console.log(
                        "createGrpcEndpoint named ",
                        name,
                        " with service ",
                        service,
                        " and description ",
                        description,
                        " with paramStream ",
                        paramStream,
                        " and resultStream ",
                        resultStream
                      );
                    }}
                    createJwtGroup={() => {
                      console.log("createJwtGroup");
                    }}
                    grpcEndpoints={[
                      {
                        id: "1",
                        name: "Test gRPC",
                        service: "Test Service",
                      },
                    ]}
                    restfulEndpoints={[
                      {
                        id: "1",
                        name: "Test RESTful",
                        httpMethod: "GET",
                      },
                    ]}
                    groups={[
                      {
                        id: "1",
                        type: "JWT",
                        endpoints: [
                          {
                            id: "2",
                            name: "Gen Endpoint 1",
                            httpMethod: "GET",
                          },
                        ],
                      },
                      {
                        id: "2",
                        type: "CRUD",
                        endpoints: [
                          {
                            id: "3",
                            name: "Gen Endpoint 2",
                            httpMethod: "POST",
                          },
                        ],
                      },
                    ]}
                    structures={[
                      {
                        id: "1",
                        name: "Test Structure",
                      },
                    ]}
                    crew={[
                      {
                        id: "1",
                        username: "Test Admin",
                        isAdmin: true,
                      },
                      {
                        id: "2",
                        username: "Test Member",
                        isAdmin: false,
                      },
                    ]}
                    states={[
                      {
                        id: "1",
                        name: "Test State 1",
                        isDefault: true,
                      },
                      {
                        id: "2",
                        name: "Test State 2",
                        isDefault: false,
                      },
                    ]}
                  /> */}
                  {/* <RestfulEndpointForm
                    deleteEndpoint={(projectId, endpointId) => {
                      console.log(
                        "deleteEndpoint ",
                        endpointId,
                        "from project ",
                        projectId
                      );
                    }}
                    updateEndpoint={(projectId, endpointId, data) => {
                      console.log(
                        "updateEndpoint ",
                        endpointId,
                        "for project ",
                        projectId,
                        " with data ",
                        data
                      );
                    }}
                    onCanceled={() => {}}
                    endpoint={{
                      name: "Test RESTful",
                      httpMethod: "GET",
                      description: "Test Description",
                      state: "1",
                      request: {
                        type: "object",
                        fields: [],
                      },
                      routePath: [
                        { constant: "test" },
                        { name: "test-str", schema: { type: "string" } },
                      ],
                      response: [
                        {
                          statusCode: 200,
                          description: "Success",
                          schema: {
                            type: "object",
                            fields: [
                              {
                                key: "test",
                                value: { type: "string" },
                              },
                            ],
                          },
                        },
                        {
                          statusCode: 400,
                          description: "Bad Request",
                          schema: {
                            type: "object",
                            fields: [
                              {
                                key: "error",
                                value: { type: "string" },
                              },
                            ],
                          },
                        },
                      ],
                    }}
                    projectId="1"
                    endpointId="1"
                  /> */}
                  {/* <GrpcEndpointForm
                    endpoint={{
                      name: "Test gRPC",
                      service: "Test Service",
                      description: "Test Description",
                      paramStream: false,
                      resultStream: false,
                      paramSchema: {
                        type: "object",
                        fields: [],
                      },
                      resultSchema: {
                        type: "object",
                        fields: [],
                      },
                    }}
                    projectId="1"
                    endpointId="1"
                    updateEndpoint={(projectId, endpointId, data) => {
                      console.log(
                        "updateEndpoint ",
                        endpointId,
                        "for project ",
                        projectId,
                        " with data ",
                        data
                      );
                    }}
                    deleteEndpoint={(projectId, endpointId) => {
                      console.log(
                        "deleteEndpoint ",
                        endpointId,
                        "from project ",
                        projectId
                      );
                    }}
                    onCanceled={() => {}}
                  /> */}
                  {/* <CrudGroupForm
                    group={{
                      sourceStructure: {
                        id: "1",
                        name: "Test Structure",
                      },
                    }}
                    projectId="1"
                    groupId="1"
                    setSourceStructure={(projectId, groupId, structureId) => {
                      console.log(
                        "setSourceStructure ",
                        structureId,
                        "for project ",
                        projectId,
                        " and group ",
                        groupId
                      );
                    }}
                    dissolve={(projectId, groupId) => {
                      console.log(
                        "dissolve ",
                        groupId,
                        "from project ",
                        projectId
                      );
                    }}
                    onCanceled={() => {}}
                  /> */}
                  {/* <JwtGroupForm
                    projectId="1"
                    groupId="1"
                    group={{
                      sourceEndpoints: [
                        {
                          id: "1",
                          name: "Test Endpoint",
                        },
                      ],
                    }}
                    setSourceEndpoints={(
                      projectId,
                      groupId,
                      sourceEndpoints
                    ) => {
                      console.log(
                        "setSourceEndpoints ",
                        sourceEndpoints,
                        "for project ",
                        projectId,
                        " and group ",
                        groupId
                      );
                    }}
                    dissolve={(projectId, groupId) => {
                      console.log(
                        "dissolve ",
                        groupId,
                        "from project ",
                        projectId
                      );
                    }}
                    onCanceled={() => {}}
                  /> */}
                  <DiscussionPanel
                    addConversation={(title) => {
                      console.log("addConversation ", title);
                    }}
                    postComment={(conversationId, content) => {
                      console.log(
                        "postComment ",
                        content,
                        "for conversation ",
                        conversationId
                      );
                    }}
                    closeConversation={(conversationId) => {
                      console.log("closeConversation ", conversationId);
                    }}
                    reopenConversation={(conversationId) => {
                      console.log("reopenConversation ", conversationId);
                    }}
                    conversations={[
                      {
                        id: "1",
                        title: "Test Conversation",
                        open: true,
                        comments: [
                          {
                            id: "1",
                            content: "Test Comment",
                            author: "Test Author",
                          },
                        ],
                      },
                      {
                        id: "2",
                        title: "Test Conversation 2",
                        open: false,
                        comments: [
                          {
                            id: "2",
                            content: "Test Comment 2",
                            author: "Test Author 2",
                          },
                        ],
                      },
                      {
                        id: "3",
                        title: "Test Conversation 3",
                        open: true,
                        comments: [
                          {
                            id: "3",
                            content: "Test Comment 3",
                            author: "Test Author 3",
                          },
                        ],
                      },
                      {
                        id: "4",
                        title: "Test Conversation 4",
                        open: false,
                        comments: [
                          {
                            id: "4",
                            content: "Test Comment 4",
                            author: "Test Author 4",
                          },
                          {
                            id: "5",
                            content: "Test Comment 5",
                            author: "Test Author 5",
                          }
                        ],
                      }
                    ]}
                  />
                </>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
