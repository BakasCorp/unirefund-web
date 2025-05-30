"use server";
import type {
  PutApiFeatureManagementFeaturesData,
  PutApiLanguageManagementLanguagesByIdData,
  PutApiLanguageManagementLanguageTextsByResourceNameByCultureNameByNameData,
  PutApiLanguageManagementLanguageTextsByResourceNameByCultureNameByNameRestoreData,
  PutApiPermissionManagementPermissionsData,
} from "@ayasofyazilim/core-saas/AdministrationService";
import {structuredError, structuredResponse} from "@repo/utils/api";
import {getAdministrationServiceClient} from "../lib";

export async function putPermissionsApi(data: PutApiPermissionManagementPermissionsData) {
  try {
    const client = await getAdministrationServiceClient();
    const dataResponse = await client.permissions.putApiPermissionManagementPermissions(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function putLanguageApi(data: PutApiLanguageManagementLanguagesByIdData) {
  try {
    const client = await getAdministrationServiceClient();
    const dataResponse = await client.languages.putApiLanguageManagementLanguagesById(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function putLanguagesByIdSetAsDefaultApi(id: string) {
  try {
    const client = await getAdministrationServiceClient();
    const dataResponse = await client.languages.putApiLanguageManagementLanguagesByIdSetAsDefault({
      id,
    });
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function putLanguageTextsByResourceNameByCultureNameByNameApi(
  data: PutApiLanguageManagementLanguageTextsByResourceNameByCultureNameByNameData,
) {
  try {
    const client = await getAdministrationServiceClient();
    const dataResponse =
      await client.languageTexts.putApiLanguageManagementLanguageTextsByResourceNameByCultureNameByName(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function putLanguageTextsByResourceNameByCultureNameByNameRestoreApi(
  data: PutApiLanguageManagementLanguageTextsByResourceNameByCultureNameByNameRestoreData,
) {
  try {
    const client = await getAdministrationServiceClient();
    const dataResponse =
      await client.languageTexts.putApiLanguageManagementLanguageTextsByResourceNameByCultureNameByNameRestore(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}

export async function putFeaturesApi(data: PutApiFeatureManagementFeaturesData) {
  try {
    const client = await getAdministrationServiceClient();
    const dataResponse = await client.features.putApiFeatureManagementFeatures(data);
    return structuredResponse(dataResponse);
  } catch (error) {
    return structuredError(error);
  }
}
