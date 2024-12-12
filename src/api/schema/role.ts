import { z } from "zod";

const roleSchema = z.enum(["admin", "member"]);

type Role = z.infer<typeof roleSchema>;

export { roleSchema, type Role };
