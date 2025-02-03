"use client";

import type { GetApiCrmServiceIndividualsByIdAddressesResponse } from "@ayasofyazilim/saas/CRMService";
import AutoForm, {
  AutoFormSubmit,
} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { handlePutResponse } from "src/actions/core/api-utils-client";
import { putIndividualAddressApi } from "src/actions/unirefund/CrmService/put-actions";
import type {
  AddressUpdateDto,
  CountryDto,
  SelectedAddressField,
} from "src/actions/unirefund/LocationService/types";
import { useAddressHook } from "src/actions/unirefund/LocationService/use-address-hook.tsx";
import type { CRMServiceServiceResource } from "src/language-data/unirefund/CRMService";

function AddressForm({
  languageData,
  countryList,
  partyId,
  addressResponse,
}: {
  languageData: CRMServiceServiceResource;
  partyId: string;
  countryList: CountryDto[];
  addressResponse: GetApiCrmServiceIndividualsByIdAddressesResponse;
}) {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();
  const addressData = addressResponse[0];
  const selectedFieldsDefaultValue: SelectedAddressField = {
    countryId: addressData.countryId || "",
    regionId: addressData.regionId || "",
    cityId: addressData.cityId || "",
    districtId: addressData.districtId || "",
    neighborhoodId: addressData.neighborhoodId || "",
  };

  const {
    addressSchema,
    selectedFields,
    addressSchemaFieldConfig,
    onAddressValueChanged,
  } = useAddressHook({
    countryList,
    selectedFieldsDefaultValue,
    fieldsToHideInAddressSchema: [],
    languageData,
  });

  const addressValues = {
    ...addressData,
    ...selectedFields,
  };

  function handleSubmit(formData: AddressUpdateDto) {
    startTransition(() => {
      void putIndividualAddressApi({
        requestBody: formData,
        id: partyId,
        addressId: addressData.id || "",
      }).then((response) => {
        handlePutResponse(response, router);
      });
    });
  }

  return (
    <AutoForm
      className="m-4"
      fieldConfig={addressSchemaFieldConfig}
      formSchema={addressSchema}
      onSubmit={(values) => {
        const formData = {
          ...values,
          ...selectedFields,
          type: "Office",
        } as AddressUpdateDto;
        handleSubmit(formData);
      }}
      onValuesChange={(values) => {
        onAddressValueChanged(values);
      }}
      stickyChildren
      values={addressValues}
    >
      <AutoFormSubmit className="float-right mr-6" disabled={isPending}>
        {languageData["Edit.Save"]}
      </AutoFormSubmit>
    </AutoForm>
  );
}

export default AddressForm;
