"use client";

import {useRouter} from "next/navigation";
import {useTransition} from "react";
import type {
  UniRefund_CRMService_AffiliationCodes_AffiliationCodeDto,
  UniRefund_CRMService_Enums_EntityPartyTypeCode,
  UniRefund_CRMService_Individuals_CreateIndividualDto,
} from "@ayasofyazilim/saas/CRMService";
import {$UniRefund_CRMService_AffiliationTypes_CreateAffiliationTypeDto} from "@ayasofyazilim/saas/CRMService";
import {createZodObject} from "@repo/ayasofyazilim-ui/lib/create-zod-object";
import type {AutoFormInputComponentProps} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import AutoForm, {AutoFormSubmit, CustomCombobox} from "@repo/ayasofyazilim-ui/organisms/auto-form";
import {handlePostResponse} from "@repo/utils/api";
import {removeEmptyObjects} from "@repo/utils/helper-functions";
import {
  postAffiliationsToCustomApi,
  postAffiliationsToMerchantApi,
  postAffiliationsToTaxOfficeApi,
  postIndividualsWithComponentsApi,
  postAffiliationsToRefundPointApi,
  postAffiliationsToTaxFreeApi,
} from "@repo/actions/unirefund/CrmService/post-actions";
import {useAddressHook} from "@/utils/address-hook/use-address-hook.tsx";
import {isPhoneValid, splitPhone} from "src/utils/utils-phone";
import {getBaseLink} from "@/utils";
import type {CountryDto, SelectedAddressField} from "@/utils/address-hook/types";
import type {CRMServiceServiceResource} from "src/language-data/unirefund/CRMService";
import {$UniRefund_CRMService_Individuals_CreateIndividualFormDto, individualFormSubPositions} from "./data";
import type {CreateIndividualSchema} from "./data";

export default function IndividualForm({
  countryList,
  languageData,
  affiliationCodeResponse,
  entityPartyTypeCode,
  partyId,
}: {
  countryList: CountryDto[];
  languageData: CRMServiceServiceResource;
  affiliationCodeResponse: UniRefund_CRMService_AffiliationCodes_AffiliationCodeDto[];
  entityPartyTypeCode?: UniRefund_CRMService_Enums_EntityPartyTypeCode;
  partyId?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const selectedFieldsDefaultValue: SelectedAddressField = {
    countryId: "",
    regionId: "",
    cityId: "",
    neighborhoodId: "",
    districtId: "",
  };

  const {selectedFields, addressFieldsToShow, addressSchemaFieldConfig, onAddressValueChanged} = useAddressHook({
    countryList,
    selectedFieldsDefaultValue,
    fieldsToHideInAddressSchema: [],
    languageData,
  });

  const $createIndividualSchema = createZodObject(
    {
      ...$UniRefund_CRMService_Individuals_CreateIndividualFormDto,
      properties: {
        ...$UniRefund_CRMService_Individuals_CreateIndividualFormDto.properties,
        affiliationCodeId: $UniRefund_CRMService_AffiliationTypes_CreateAffiliationTypeDto.properties.affiliationCodeId,
      },
    },
    ["name", "personalSummaries", "address", "telephone", "email", "affiliationCodeId"],
    undefined,
    {...individualFormSubPositions, address: addressFieldsToShow},
  );

  function saveAffilationOfIndividual(formData: CreateIndividualSchema) {
    const body = {
      id: partyId || "",
      requestBody: {
        affiliationCodeId: formData.affiliationCodeId,
        email: formData.email.emailAddress,
        entityInformationTypeCode: "INDIVIDUAL" as const,
      },
    };
    switch (entityPartyTypeCode) {
      case "CUSTOMS":
        void postAffiliationsToCustomApi(body).then((res) => {
          handlePostResponse(res, router, getBaseLink(`parties/customs/${partyId}/affiliations`));
        });
        break;
      case "MERCHANT":
        void postAffiliationsToMerchantApi(body).then((res) => {
          handlePostResponse(res, router, getBaseLink(`parties/merchants/${partyId}/affiliations`));
        });
        break;
      case "TAXOFFICE":
        void postAffiliationsToTaxOfficeApi(body).then((res) => {
          handlePostResponse(res, router, getBaseLink(`parties/tax-offices/${partyId}/affiliations`));
        });
        break;
      case "TAXFREE":
        void postAffiliationsToTaxFreeApi(body).then((res) => {
          handlePostResponse(res, router, getBaseLink(`parties/tax-free/${partyId}/affiliations`));
        });
        break;
      case "REFUNDPOINT":
        void postAffiliationsToRefundPointApi(body).then((res) => {
          handlePostResponse(res, router, getBaseLink(`parties/refund-points/${partyId}/affiliations`));
        });
        break;
      default:
        break;
    }
  }

  function handleSaveIndividual(formData: CreateIndividualSchema) {
    if (entityPartyTypeCode && partyId && !formData.affiliationCodeId) return;
    const isValid = isPhoneValid(formData.telephone.localNumber);
    if (!isValid) {
      return;
    }
    const phoneData = splitPhone(formData.telephone.localNumber);
    formData.telephone = {...formData.telephone, ...phoneData};

    const createData: UniRefund_CRMService_Individuals_CreateIndividualDto = {
      name: formData.name,
      personalSummaries: [formData.personalSummaries],
      createAbpUserAccount: true,
      contactInformations: [
        {
          telephones: [
            {
              ...formData.telephone,
              primaryFlag: true,
              typeCode: "OFFICE",
            },
          ],
          emails: [{...formData.email, primaryFlag: true, typeCode: "WORK"}],
          addresses: [
            {
              ...formData.address,
              ...selectedFields,
              primaryFlag: true,
              type: "Office",
            },
          ],
        },
      ],
    };
    startTransition(() => {
      void postIndividualsWithComponentsApi({
        requestBody: removeEmptyObjects(createData),
      }).then((res) => {
        if (formData.affiliationCodeId && entityPartyTypeCode && partyId) {
          saveAffilationOfIndividual(formData);
          return;
        }
        handlePostResponse(res, router, {
          prefix: "/parties/individuals",
          identifier: "id",
          suffix: "details/name",
        });
      });
    });
  }

  return (
    <div className="flex w-full justify-center py-6">
      <div className="w-full max-w-6xl">
        <AutoForm
          className="grid grid-cols-6 gap-2 lg:gap-6"
          fieldConfig={{
            name: {
              className:
                "col-span-6 space-y-0 p-6 [&>div]:grid [&>div]:grid-cols-2 [&>div]:gap-4 [&>div]:p-0 [&>div>div]:grid [&>div>div]:grid-cols-1 [&>div>div]:space-y-0 [&>div>div]:gap-1",
            },
            personalSummaries: {
              className:
                "col-span-6 lg:col-span-3 space-y-0 p-6  [&>div]:grid [&>div]:grid-cols-2 [&>div]:gap-4 [&>div]:p-0 [&>div>div]:grid [&>div>div]:grid-cols-1 [&>div>div]:space-y-0 [&>div>div]:gap-1",
            },
            address: {
              ...addressSchemaFieldConfig,
              className:
                "col-span-6 lg:col-span-3 space-y-0 p-6 [&>div]:grid [&>div]:grid-cols-2 [&>div]:gap-4 [&>div]:p-0 [&>div>div]:grid [&>div>div]:grid-cols-1 [&>div>div]:space-y-0 [&>div>div]:gap-1",
            },
            email: {
              className:
                "col-span-6 lg:col-span-2 space-y-0 p-6 [&>div]:grid [&>div]:grid-cols-1 [&>div]:gap-4 [&>div]:p-0 [&>div>div]:grid [&>div>div]:grid-cols-1 [&>div>div]:space-y-0 [&>div>div]:gap-1",
              emailAddress: {
                inputProps: {
                  type: "email",
                  placeholder: "email@example.com",
                  className: "w-full",
                  showLabel: false,
                },
              },
            },
            telephone: {
              className:
                "col-span-6 lg:col-span-2 space-y-0 p-6 [&>div]:grid [&>div]:grid-cols-1 [&>div]:gap-4 [&>div]:p-0 [&>div>div]:grid [&>div>div]:grid-cols-1 [&>div>div]:space-y-0 [&>div>div]:gap-1",
              localNumber: {
                fieldType: "phone",
                displayName: languageData.Telephone || "Telephone",
                inputProps: {
                  showLabel: false,
                  className: "w-full",
                },
              },
            },
            affiliationCodeId: {
              inputProps: {
                type: "select",
                showLabel: true,
                className: "w-full",
              },
              containerClassName: `lg:col-span-2 col-span-6 justify-center  bg-white p-5 rounded-md border border-gray-200 [&>div]:grid [&>div]:grid-cols-2 [&>div]:gap-4 ${partyId && entityPartyTypeCode ? "" : "hidden"}`,
              renderer: (props: AutoFormInputComponentProps) => {
                return (
                  <CustomCombobox<UniRefund_CRMService_AffiliationCodes_AffiliationCodeDto>
                    childrenProps={{...props, isRequired: Boolean(partyId && entityPartyTypeCode)}}
                    list={affiliationCodeResponse}
                    selectIdentifier="id"
                    selectLabel="name"
                  />
                );
              },
            },
          }}
          formSchema={$createIndividualSchema}
          onSubmit={(formData) => {
            handleSaveIndividual(formData as CreateIndividualSchema);
          }}
          onValuesChange={(values) => {
            onAddressValueChanged(values);
          }}
          stickyChildren
          stickyChildrenClassName="sticky p-0 lg:py-4 bg-white border-t border-gray-100 mt-4 flex justify-end">
          <AutoFormSubmit className="w-full p-0 lg:w-1/6 lg:px-6 lg:py-2" disabled={isPending}>
            {languageData.Save}
          </AutoFormSubmit>
        </AutoForm>
      </div>
    </div>
  );
}
