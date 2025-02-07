"use server";

import type {GetApiContractServiceRefundTableHeadersData} from "@ayasofyazilim/saas/ContractService";
import {isUnauthorized} from "@repo/utils/policies";
import {auth} from "@repo/utils/auth/next-auth";
import {getRefundTableHeadersApi} from "@/actions/unirefund/ContractService/action";
import {getResourceData} from "@/language-data/unirefund/ContractService";
import {getMerchantsApi} from "@/actions/unirefund/CrmService/actions";
import ErrorComponent from "@/app/[lang]/(main)/_components/error-component";
import RefundTable from "./_components/table";

async function getApiRequests(filters: GetApiContractServiceRefundTableHeadersData) {
  try {
    const session = await auth();
    const apiRequests = await Promise.all([
      getRefundTableHeadersApi(filters, session),
      getMerchantsApi({typeCodes: ["HEADQUARTER"]}, session),
    ]);
    return {
      type: "success" as const,
      data: apiRequests,
    };
  } catch (error) {
    const err = error as {data?: string; message?: string};
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
  params: {lang: string};
  searchParams?: GetApiContractServiceRefundTableHeadersData;
}) {
  const {lang} = params;
  await isUnauthorized({
    requiredPolicies: ["ContractService.RefundTableHeader", "ContractService.RefundTableDetail"],
    lang,
  });
  const {languageData} = await getResourceData(lang);
  const apiRequests = await getApiRequests({
    isTemplate: searchParams?.isTemplate,
    maxResultCount: searchParams?.maxResultCount || 10,
    skipCount: searchParams?.skipCount || 0,
  });
  if (apiRequests.type === "error") {
    return <ErrorComponent languageData={languageData} message={apiRequests.message || "Unknown error occurred"} />;
  }
  const [refundTableHeadersResponse, merchantResponse] = apiRequests.data;
  return (
    <RefundTable
      lang={lang}
      languageData={languageData}
      merchants={merchantResponse.data.items || []}
      refundTableHeaders={refundTableHeadersResponse.data}
    />
  );
}
