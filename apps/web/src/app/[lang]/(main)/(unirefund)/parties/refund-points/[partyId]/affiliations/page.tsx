"use server";

import type { GetApiCrmServiceRefundPointsByIdAffiliationsData } from "@ayasofyazilim/saas/CRMService";
import { auth } from "@repo/utils/auth/next-auth";
import { isUnauthorized } from "@/utils/page-policy/page-policy";
import {
  getAffiliationCodeApi,
  getRefundPointAffiliationByIdApi,
} from "src/actions/unirefund/CrmService/actions";
import ErrorComponent from "src/app/[lang]/(main)/_components/error-component";
import { getResourceData } from "src/language-data/unirefund/CRMService";
import AffiliationsTable from "./table";

async function getApiRequests(
  filters: GetApiCrmServiceRefundPointsByIdAffiliationsData,
) {
  try {
    const session = await auth();
    const apiRequests = await Promise.all([
      getRefundPointAffiliationByIdApi(filters, session),
      getAffiliationCodeApi(
        { entityPartyTypeCode: "REFUNDPOINT", maxResultCount: 1000 },
        session,
      ),
    ]);
    return {
      type: "success" as const,
      data: apiRequests,
    };
  } catch (error) {
    const err = error as { data?: string; message?: string };
    return {
      type: "error" as const,
      message: err.message,
    };
  }
}
export default async function Page({
  params,
  searchParams,
}: {
  params: {
    partyId: string;
    lang: string;
  };
  searchParams?: GetApiCrmServiceRefundPointsByIdAffiliationsData;
}) {
  const { lang, partyId } = params;
  const { languageData } = await getResourceData(lang);
  await isUnauthorized({
    requiredPolicies: ["CRMService.RefundPoints.ViewAffiliationList"],
    lang,
  });

  const apiRequests = await getApiRequests({
    ...searchParams,
    id: partyId,
  });

  if (apiRequests.type === "error") {
    return (
      <ErrorComponent
        languageData={languageData}
        message={apiRequests.message || "Unknown error occurred"}
      />
    );
  }

  const [subStoresResponse, affiliationCodesResponse] = apiRequests.data;

  return (
    <AffiliationsTable
      affiliationCodes={affiliationCodesResponse.data.items || []}
      languageData={languageData}
      locale={lang}
      partyId={partyId}
      response={subStoresResponse.data}
    />
  );
}
