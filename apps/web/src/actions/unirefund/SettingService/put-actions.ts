"use server";

import type {
  PutApiSettingServiceProductGroupByIdData,
  PutApiSettingServiceVatByIdData,
} from "@ayasofyazilim/saas/SettingService";
import {
  getSettingServiceClient,
  structuredError,
  structuredResponse,
} from "src/lib";

export async function putVatApi(data: PutApiSettingServiceVatByIdData) {
  try {
    const client = await getSettingServiceClient();
    const dataResponse = await client.vat.putApiSettingServiceVatById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
export async function putProductGroupApi(
  data: PutApiSettingServiceProductGroupByIdData,
) {
  try {
    const client = await getSettingServiceClient();
    const dataResponse =
      await client.productGroup.putApiSettingServiceProductGroupById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
