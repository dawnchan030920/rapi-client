import { z } from "zod";
import client from "../client";
import { idSchema } from "../schema/id";

const profileResponse = z.object({
  username: z.string(),
  email: z.string(),
  id: idSchema,
});

type ProfileResponse = z.infer<typeof profileResponse>;

export default async function profile(): Promise<ProfileResponse> {
  const response = await client.get("/profile");
  return profileResponse.parse(response.data);
}
