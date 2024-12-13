import { z } from "zod";
import { idSchema, ID } from "./id";

const ObjectSchema = z.object({
  type: z.literal("object"),
  fields: z.array(
    z.object({ key: z.string(), value: z.lazy(() => rapiSchemaSchema) })
  ),
});

const ListSchema = z.object({
  type: z.literal("list"),
  item: z.lazy(() => rapiSchemaSchema),
});

const RefSchema = z.object({
  type: z.literal("ref"),
  ref: idSchema,
});

const StringSchema = z.object({
  type: z.literal("string"),
});

const NumberSchema = z.object({
  type: z.literal("number"),
});

const rapiSchemaSchema: z.ZodTypeAny = z.lazy(() =>
  z.union([ObjectSchema, ListSchema, RefSchema, StringSchema, NumberSchema])
);

type RapiSchema =
  | { type: "object"; fields: { key: string; value: RapiSchema }[] }
  | { type: "list"; item: RapiSchema }
  | { type: "ref"; ref: ID }
  | { type: "string" }
  | { type: "number" };

type RapiObjectSchema = {
  type: "object";
  fields: { key: string; value: RapiSchema }[];
};

export { type RapiSchema, type RapiObjectSchema, rapiSchemaSchema };
