import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Overview from "@/pages/Overview";
import { AuthProvider } from "./components/auth/AuthProvider";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Project from "./pages/Project";

import ProjectRender from "./components/pages/Project";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
                  <ProjectRender
                    projectId="1"
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
