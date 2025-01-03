"use server";

import type {
  GetApiLocationServiceCitiesData,
  GetApiLocationServiceCitiesGetListByRegionByRegionIdData,
  GetApiLocationServiceCountriesData,
  GetApiLocationServiceDistrictsGetListByCityByCityIdData,
  GetApiLocationServiceNeighborhoodsGetListByDistrictByDistrictIdData,
  GetApiLocationServiceRegionsGetListByCountryByCountryIdData,
} from "@ayasofyazilim/saas/LocationService";
import { structuredError, structuredResponse } from "src/lib";
import { getApiRequests } from "../../api-requests";

export async function getCountriesApi(
  data: GetApiLocationServiceCountriesData = {
    maxResultCount: 250,
    sorting: "name",
  },
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.locations.getCountries(data);

    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function getRegionsByCountryIdApi(
  data: GetApiLocationServiceRegionsGetListByCountryByCountryIdData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.locations.getRegionsByCountryId(data);

    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function getDefaultRegionsByCountryIdApi(
  data: GetApiLocationServiceRegionsGetListByCountryByCountryIdData,
) {
  try {
    const requests = await getApiRequests();
    const response =
      await requests.locations.getDefaultRegionsByCountryId(data);

    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}

export async function getCitiesByRegionId(
  data: GetApiLocationServiceCitiesGetListByRegionByRegionIdData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.locations.getCitiesByRegionId(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function getCitiesApi(data: GetApiLocationServiceCitiesData = {}) {
  try {
    const requests = await getApiRequests();
    const response = await requests.locations.getCities(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function getDistrictsByCityIdApi(
  data: GetApiLocationServiceDistrictsGetListByCityByCityIdData,
) {
  try {
    const requests = await getApiRequests();
    const response = await requests.locations.getDistrictsByCityId(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
export async function getNeighborhoodsByDistrictIdApi(
  data: GetApiLocationServiceNeighborhoodsGetListByDistrictByDistrictIdData,
) {
  try {
    const requests = await getApiRequests();
    const response =
      await requests.locations.getNeighborhoodsByDistrictId(data);
    return structuredResponse(response);
  } catch (error) {
    return structuredError(error);
  }
}
