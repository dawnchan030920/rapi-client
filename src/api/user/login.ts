import { z } from "zod";
import client from "../client";

type LoginRequest = {
  username: string;
  password: string;
};

const loginResponse = z.object({
  token: z.string(),
});

type LoginResponse = z.infer<typeof loginResponse>;

export default async function login(
  data: LoginRequest
): Promise<LoginResponse> {
  const response = await client.post("/auth/login", data);
  return loginResponse.parse(response.data);
}
