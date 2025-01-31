"use server";
import type {
  DeleteApiCrmServiceCustomsByIdAffiliationsByAffiliationIdData,
  DeleteApiCrmServiceMerchantsByIdAffiliationsByAffiliationIdData,
  DeleteApiCrmServiceMerchantsByIdProductGroupsData,
  DeleteApiCrmServiceRefundPointsByIdAffiliationsByAffiliationIdData,
  DeleteApiCrmServiceTaxFreesByIdAffiliationsByAffiliationIdData,
  DeleteApiCrmServiceTaxOfficesByIdAffiliationsByAffiliationIdData,
} from "@ayasofyazilim/saas/CRMService";
import type { Session } from "@repo/utils/auth";
import {
  getCRMServiceClient,
  structuredError,
  structuredResponse,
  structuredSuccessResponse,
} from "src/lib";

export async function deleteAffiliationCodesByIdApi(
  id: number,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.affiliationCode.deleteApiCrmServiceAffiliationCodesById({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

export async function deleteMerchantsByIdAffiliationsByAffiliationIdApi(
  data: DeleteApiCrmServiceMerchantsByIdAffiliationsByAffiliationIdData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.merchant.deleteApiCrmServiceMerchantsByIdAffiliationsByAffiliationId(
        data,
      );
    return structuredSuccessResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

export async function deleteRefundPointsByIdAffiliationsByAffiliationIdApi(
  data: DeleteApiCrmServiceRefundPointsByIdAffiliationsByAffiliationIdData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.refundPoint.deleteApiCrmServiceRefundPointsByIdAffiliationsByAffiliationId(
        data,
      );
    return structuredSuccessResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

export async function deleteCustomsByIdAffiliationsByAffiliationIdApi(
  data: DeleteApiCrmServiceCustomsByIdAffiliationsByAffiliationIdData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.customs.deleteApiCrmServiceCustomsByIdAffiliationsByAffiliationId(
        data,
      );
    return structuredSuccessResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

export async function deleteTaxFreesByIdAffiliationsByAffiliationIdApi(
  data: DeleteApiCrmServiceTaxFreesByIdAffiliationsByAffiliationIdData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.taxFree.deleteApiCrmServiceTaxFreesByIdAffiliationsByAffiliationId(
        data,
      );
    return structuredSuccessResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

export async function deleteTaxOfficesByIdAffiliationsByAffiliationIdApi(
  data: DeleteApiCrmServiceTaxOfficesByIdAffiliationsByAffiliationIdData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.taxOffice.deleteApiCrmServiceTaxOfficesByIdAffiliationsByAffiliationId(
        data,
      );
    return structuredSuccessResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

export async function deleteMerchantsByIdProductGroupsApi(
  data: DeleteApiCrmServiceMerchantsByIdProductGroupsData,
) {
  try {
    const crmClient = await getCRMServiceClient();
    const response =
      await crmClient.merchant.deleteApiCrmServiceMerchantsByIdProductGroups(
        data,
      );
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
