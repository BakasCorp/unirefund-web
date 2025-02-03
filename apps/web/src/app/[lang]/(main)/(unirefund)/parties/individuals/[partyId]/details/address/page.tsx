"use server";

import { auth } from "@repo/utils/auth/next-auth";
import { isUnauthorized } from "@repo/utils/policies";
import { getIndividualAddressByIdApi } from "src/actions/unirefund/CrmService/actions";
import { getAllCountriesApi } from "src/actions/unirefund/LocationService/actions";
import ErrorComponent from "src/app/[lang]/(main)/_components/error-component";
import { getResourceData } from "src/language-data/unirefund/CRMService";
import AddressForm from "./form";

async function getApiRequests({ partyId }: { partyId: string }) {
  try {
    const session = await auth();
    const apiRequests = await Promise.all([
      getIndividualAddressByIdApi(partyId, session),
      getAllCountriesApi({}, session),
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
}: {
  params: {
    partyId: string;
    lang: string;
  };
}) {
  const { partyId, lang } = params;
  const { languageData } = await getResourceData(lang);
  await isUnauthorized({
    requiredPolicies: ["CRMService.Individuals.Edit"],
    lang,
  });
  const apiRequests = await getApiRequests({ partyId });
  if (apiRequests.type === "error") {
    return (
      <ErrorComponent
        languageData={languageData}
        message={apiRequests.message || "Unknown error occurred"}
      />
    );
  }

  const [addressResponse, countriesResponse] = apiRequests.data;

  return (
    <AddressForm
      addressResponse={addressResponse.data}
      countryList={countriesResponse.data.items || []}
      languageData={languageData}
      partyId={partyId}
    />
  );
}
