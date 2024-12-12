import { z } from "zod";
import client from "../client";
import { ID, idSchema } from "../schema/id";
import { restfulEndpointSchema } from "../schema/restfulEndpoint";

const restfulEndpointDetailResponse = z
  .object({
    id: idSchema,
  })
  .and(restfulEndpointSchema);

type RestfulEndpointDetailResponse = z.infer<
  typeof restfulEndpointDetailResponse
>;

export default async function restfulEndpointDetail(
  projectId: ID,
  endpointId: ID
): Promise<RestfulEndpointDetailResponse> {
  const response = await client.get(
    `/project/${projectId}/restful_endpoint/${endpointId}`
  );
  return restfulEndpointDetailResponse.parse(response.data);
}
