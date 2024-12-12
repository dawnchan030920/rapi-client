/**
 * GET /project/{projectId}/restful_endpoint
 * get ALL restful endpoints, including generated ones
 */

import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { restfulEndpointSchema } from "./restfulEndpoint";

const restfulEndpointListResponse = z.array(
  restfulEndpointSchema
    .pick({
      name: true,
    })
    .and(z.object({ id: idSchema }))
);

type RestfulEndpointListResponse = z.infer<typeof restfulEndpointListResponse>;

export default async function restfulEndpointList(
  projectId: ID
): Promise<RestfulEndpointListResponse> {
  const response = await client.get(`/project/${projectId}/restful_endpoint`);
  return restfulEndpointListResponse.parse(response.data);
}
