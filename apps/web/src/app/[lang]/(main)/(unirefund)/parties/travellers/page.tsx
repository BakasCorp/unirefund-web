"use server";

import type { GetApiTravellerServiceTravellersData } from "@ayasofyazilim/saas/TravellerService";
import { auth } from "@repo/utils/auth/next-auth";
import { getResourceData } from "src/language-data/unirefund/TravellerService";
import { isUnauthorized } from "src/utils/page-policy/page-policy";
import { getAllCountriesApi } from "../../../../../../actions/unirefund/LocationService/actions";
import { getTravellersApi } from "../../../../../../actions/unirefund/TravellerService/actions";
import ErrorComponent from "../../../_components/error-component";
import TravellersTable from "./table";

async function getApiRequests(filter: GetApiTravellerServiceTravellersData) {
  try {
    const session = await auth();
    const apiRequests = await Promise.all([
      getTravellersApi(filter, session),
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
  searchParams,
}: {
  params: {
    lang: string;
  };
  searchParams: GetApiTravellerServiceTravellersData & {
    nationalities?: string;
    residences?: string;
  };
}) {
  const { lang } = params;
  await isUnauthorized({
    requiredPolicies: ["TravellerService.Travellers"],
    lang,
  });

  const { languageData } = await getResourceData(lang);

  const apiRequests = await getApiRequests({
    ...searchParams,
    nationalities: searchParams.nationalities?.split(",") || [],
    residences: searchParams.residences?.split(",") || [],
  });

  if (apiRequests.type === "error") {
    return (
      <ErrorComponent
        languageData={languageData}
        message={apiRequests.message || "Unknown error occurred"}
      />
    );
  }

  const [travellerResponse, countriesResponse] = apiRequests.data;

  return (
    <TravellersTable
      countryList={countriesResponse.data.items || []}
      languageData={languageData}
      response={travellerResponse.data}
    />
  );
}
