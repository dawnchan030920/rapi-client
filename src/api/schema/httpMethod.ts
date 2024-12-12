import { z } from "zod";

const httpMethodSchema = z.enum([
  "GET",
  "POST",
  "PUT",
  "DELETE",
  "PATCH",
  "OPTIONS",
  "HEAD",
  "TRACE",
  "CONNECT",
]);

type HttpMethod = z.infer<typeof httpMethodSchema>;

export { httpMethodSchema, type HttpMethod };
