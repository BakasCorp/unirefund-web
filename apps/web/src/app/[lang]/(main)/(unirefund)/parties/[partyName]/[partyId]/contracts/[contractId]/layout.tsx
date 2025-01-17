"use server";
import { TabLayout } from "@repo/ayasofyazilim-ui/templates/tab-layout";
import {
  getMerchantContractHeaderByIdApi,
  getRefundPointContractHeaderById,
} from "src/actions/unirefund/ContractService/action";
import ErrorComponent from "src/app/[lang]/(main)/_components/error-component";
import { getResourceData } from "src/language-data/unirefund/ContractService";
import { getBaseLink } from "src/utils";
import { isUnauthorized } from "src/utils/page-policy/page-policy";
import { isErrorOnRequest } from "src/utils/page-policy/utils";
import type { ContractPartyName } from "../_components/types";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    lang: string;
    contractId: string;
    partyName: ContractPartyName;
    partyId: string;
  };
}) {
  const { lang, contractId, partyId, partyName } = params;

  const { languageData } = await getResourceData(lang);
  if (params.partyName === "merchants") {
    await isUnauthorized({
      requiredPolicies: [
        "ContractService.ContractHeaderForMerchant",
        "ContractService.ContractSetting.Edit",
        "ContractService.RebateSetting.Edit",
        "ContractService.ContractHeaderForMerchant.Edit",
      ],
      lang,
    });

    const contractHeaderDetails =
      await getMerchantContractHeaderByIdApi(contractId);
    if (isErrorOnRequest(contractHeaderDetails, lang, false)) {
      return (
        <ErrorComponent
          languageData={languageData}
          message={contractHeaderDetails.message}
        />
      );
    }

    return (
      <>
        <TabLayout
          tabList={[
            {
              label: languageData["Contracts.Contract"],
              href: "contract",
            },
            {
              label: languageData["Contracts.RebateSettings"],
              href: "rebate-settings",
            },
            {
              label: languageData["Contracts.Stores"],
              href: "stores",
            },
            {
              label: languageData["Contracts.ContractSettings"],
              href: "contract-settings",
            },
          ]}
        >
          {children}
        </TabLayout>
        <div className="hidden" id="page-title">
          {languageData["Contracts.Edit.Title"]} -
          {contractHeaderDetails.data.name}
        </div>
        <div className="hidden" id="page-description">
          {languageData["Contracts.Edit.Description"]}
        </div>
        <div className="hidden" id="page-back-link">
          {getBaseLink(`/parties/${partyName}/${partyId}`)}
        </div>
      </>
    );
  }

  await isUnauthorized({
    requiredPolicies: [
      "ContractService.ContractHeaderForRefundPoint",
      "ContractService.ContractHeaderForRefundPoint.Edit",
    ],
    lang,
  });

  const contractHeaderDetails =
    await getRefundPointContractHeaderById(contractId);
  if (isErrorOnRequest(contractHeaderDetails, lang, false)) {
    return (
      <ErrorComponent
        languageData={languageData}
        message={contractHeaderDetails.message}
      />
    );
  }

  return (
    <>
      {children}
      <div className="hidden" id="page-title">
        {languageData["Contracts.Edit.Title"]} -
        {contractHeaderDetails.data.name}
      </div>
      <div className="hidden" id="page-description">
        {languageData["Contracts.Edit.Description"]}
      </div>
      <div className="hidden" id="page-back-link">
        {getBaseLink(`/parties/${partyName}/${partyId}`)}
      </div>
    </>
  );
}
