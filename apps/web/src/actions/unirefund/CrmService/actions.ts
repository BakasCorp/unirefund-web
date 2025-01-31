"use server";
import type {
  GetApiCrmServiceAffiliationCodesData,
  GetApiCrmServiceCustomsByIdAffiliationsData,
  GetApiCrmServiceCustomsByIdSubCustomsData,
  GetApiCrmServiceCustomsData,
  GetApiCrmServiceIndividualsData,
  GetApiCrmServiceMerchantsByIdAffiliationsData,
  GetApiCrmServiceMerchantsByIdSubMerchantsData,
  GetApiCrmServiceMerchantsData,
  GetApiCrmServiceRefundPointsAccessibleData,
  GetApiCrmServiceRefundPointsByIdAffiliationsData,
  GetApiCrmServiceRefundPointsByIdSubRefundPointsData,
  GetApiCrmServiceRefundPointsData,
  GetApiCrmServiceTaxFreesByIdAffiliationsData,
  GetApiCrmServiceTaxFreesByIdSubTaxFreeData,
  GetApiCrmServiceTaxFreesData,
  GetApiCrmServiceTaxOfficesByIdAffiliationsData,
  GetApiCrmServiceTaxOfficesByIdSubTaxOfficesData,
  GetApiCrmServiceTaxOfficesData,
  UniRefund_CRMService_Merchants_StoreProfilePagedResultDto,
} from "@ayasofyazilim/saas/CRMService";
import type { Session } from "@repo/utils/auth";
import type { ServerResponse } from "src/lib";
import {
  getCRMServiceClient,
  structuredError,
  structuredResponse,
  structuredSuccessResponse,
} from "src/lib";
import { getApiRequests } from "../../api-requests";

export async function getMerchantsApi(
  data: GetApiCrmServiceMerchantsData = {},
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response = await crmClient.merchant.getApiCrmServiceMerchants(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getRefundPointsApi(
  data: GetApiCrmServiceRefundPointsData = {},
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.refundPoint.getApiCrmServiceRefundPoints(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getCustomsApi(
  data: GetApiCrmServiceCustomsData = {},
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response = await crmClient.customs.getApiCrmServiceCustoms(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getTaxFreesApi(
  data: GetApiCrmServiceTaxFreesData = {},
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response = await crmClient.taxFree.getApiCrmServiceTaxFrees(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getTaxOfficesApi(
  data: GetApiCrmServiceTaxOfficesData = {},
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response = await crmClient.taxOffice.getApiCrmServiceTaxOffices(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getMerchantDetailByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.merchant.getApiCrmServiceMerchantsByIdDetail({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getMerchantByIdApi(id: string, session?: Session | null) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response = await crmClient.merchant.getApiCrmServiceMerchantsById({
      id,
    });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getRefundPointByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.refundPoint.getApiCrmServiceRefundPointsById({ id });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getTaxFreeByIdApi(id: string, session?: Session | null) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response = await crmClient.taxFree.getApiCrmServiceTaxFreesById({
      id,
    });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getTaxOfficeByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response = await crmClient.taxOffice.getApiCrmServiceTaxOfficesById({
      id,
    });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getCustomByIdApi(id: string, session?: Session | null) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response = await crmClient.customs.getApiCrmServiceCustomsById({
      id,
    });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getMerchantOrganizationsByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.merchant.getApiCrmServiceMerchantsByIdOrganizations({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getRefundPointOrganizationsByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.refundPoint.getApiCrmServiceRefundPointsByIdOrganizations(
        {
          id,
        },
      );
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getCustomOrganizationsByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.customs.getApiCrmServiceCustomsByIdOrganizations({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getTaxFreeOrganizationsByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.taxFree.getApiCrmServiceTaxFreesByIdOrganizations({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getTaxOfficeOrganizationsByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.taxOffice.getApiCrmServiceTaxOfficesByIdOrganizations({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getMerchantSubStoresByIdApi(
  data: GetApiCrmServiceMerchantsByIdSubMerchantsData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.merchant.getApiCrmServiceMerchantsByIdSubMerchants(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getRefundPointSubStoresByIdApi(
  data: GetApiCrmServiceRefundPointsByIdSubRefundPointsData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.refundPoint.getApiCrmServiceRefundPointsByIdSubRefundPoints(
        data,
      );
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getTaxFreeSubStoresByIdApi(
  data: GetApiCrmServiceTaxFreesByIdSubTaxFreeData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.taxFree.getApiCrmServiceTaxFreesByIdSubTaxFree(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getTaxOfficeSubStoresByIdApi(
  data: GetApiCrmServiceTaxOfficesByIdSubTaxOfficesData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.taxOffice.getApiCrmServiceTaxOfficesByIdSubTaxOffices(
        data,
      );
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getCustomSubStoresByIdApi(
  data: GetApiCrmServiceCustomsByIdSubCustomsData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.customs.getApiCrmServiceCustomsByIdSubCustoms(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}

export async function getMerchantAddressByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.merchant.getApiCrmServiceMerchantsByIdAddresses({ id });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getRefundPointAddressByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.refundPoint.getApiCrmServiceRefundPointsByIdAddresses({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getMerchantEmailByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.merchant.getApiCrmServiceMerchantsByIdEmails({ id });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getRefundPointEmailByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.refundPoint.getApiCrmServiceRefundPointsByIdEmails({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getCustomEmailByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response = await crmClient.customs.getApiCrmServiceCustomsByIdEmails({
      id,
    });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getTaxOfficeEmailByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.taxOffice.getApiCrmServiceTaxOfficesByIdEmails({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getMerchantPhoneByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.merchant.getApiCrmServiceMerchantsByIdTelephones({ id });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getRefundPointPhoneByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.refundPoint.getApiCrmServiceRefundPointsByIdTelephones({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getCustomPhoneByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.customs.getApiCrmServiceCustomsByIdTelephones({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getMerchantsByIdProductGroupApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.merchant.getApiCrmServiceMerchantsByIdProductGroup({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getMerchantAffiliationByIdApi(
  data: GetApiCrmServiceMerchantsByIdAffiliationsData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.merchant.getApiCrmServiceMerchantsByIdAffiliations(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getRefundPointAffiliationByIdApi(
  data: GetApiCrmServiceRefundPointsByIdAffiliationsData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.refundPoint.getApiCrmServiceRefundPointsByIdAffiliations(
        data,
      );
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getTaxFreeAffiliationByIdApi(
  data: GetApiCrmServiceTaxFreesByIdAffiliationsData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.taxFree.getApiCrmServiceTaxFreesByIdAffiliations(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getTaxOfficeAffiliationByIdApi(
  data: GetApiCrmServiceTaxOfficesByIdAffiliationsData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.taxOffice.getApiCrmServiceTaxOfficesByIdAffiliations(
        data,
      );
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getCustomAffiliationByIdApi(
  data: GetApiCrmServiceCustomsByIdAffiliationsData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.customs.getApiCrmServiceCustomsByIdAffiliations(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getAffiliationCodeApi(
  data: GetApiCrmServiceAffiliationCodesData,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.affiliationCode.getApiCrmServiceAffiliationCodes(data);
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}

export async function getAffiliationCodesDetailsByIdApi(
  id: number,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.affiliationCode.getApiCrmServiceAffiliationCodesById({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
export async function getRefundPointDetailsByIdApi(
  id: string,
  session?: Session | null,
) {
  try {
    const crmClient = await getCRMServiceClient(session);
    const response =
      await crmClient.refundPoint.getApiCrmServiceRefundPointsByIdDetail({
        id,
      });
    return structuredSuccessResponse(response);
  } catch (error) {
    throw structuredError(error);
  }
}
//Unupdated actions
export async function getSubMerchantsByMerchantIdApi(
  data: GetApiCrmServiceMerchantsByIdSubMerchantsData,
): Promise<
  ServerResponse<UniRefund_CRMService_Merchants_StoreProfilePagedResultDto>
> {
  try {
    const requests = await getApiRequests();
    const response = await requests.merchants.getSubCompanies({
      ...data,
      maxResultCount: data.maxResultCount || 10,
      skipCount: data.skipCount || 0,
    });
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

export async function getAccessibleRefundPointsApi(
  data: GetApiCrmServiceRefundPointsAccessibleData = {},
) {
  try {
    const crmClient = await getCRMServiceClient();
    const response =
      await crmClient.refundPoint.getApiCrmServiceRefundPointsAccessible(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

export async function getAdressesApi(id: string, partyName: "merchants") {
  try {
    const requests = await getApiRequests();
    const response = await requests[partyName].getAdresses({
      id,
    });
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

export async function getIndividualsApi(
  data: GetApiCrmServiceIndividualsData = {},
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.individuals.get(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function getIndividualsByIdApi(
  partyName:
    | "merchants"
    | "refund-points"
    | "customs"
    | "tax-offices"
    | "tax-free",
  params: GetApiCrmServiceMerchantsByIdAffiliationsData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests[partyName].getIndivuals(params);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
