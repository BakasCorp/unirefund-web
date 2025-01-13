"use server";
import type { PutApiTagServiceTagExportValidationByIdData } from "@ayasofyazilim/saas/TagService";
import {
  getTagServiceClient,
  structuredError,
  structuredResponse,
} from "src/lib";

export async function putExportValidationByIdApi(
  data: PutApiTagServiceTagExportValidationByIdData,
) {
  try {
    const client = await getTagServiceClient();
    const response =
      await client.tag.putApiTagServiceTagExportValidationById(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}