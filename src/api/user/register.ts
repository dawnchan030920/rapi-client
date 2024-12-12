import { z } from "zod";
import client from "../client";

type RegisterRequest = {
  username: string;
  password: string;
  email: string;
};

const registerResponse = z.object({});

type RegisterResponse = z.infer<typeof registerResponse>;

export default async function register(
  data: RegisterRequest
): Promise<RegisterResponse> {
  const response = await client.post("/auth/register", data);
  return registerResponse.parse(response.data);
}
