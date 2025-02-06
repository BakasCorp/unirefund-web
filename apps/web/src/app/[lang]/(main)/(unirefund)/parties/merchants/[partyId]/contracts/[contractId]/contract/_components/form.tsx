"use client";

import {toast} from "@/components/ui/sonner";
import type {
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderInformationDto as AssignableRefundTableHeaders,
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderDetailForMerchantDto as ContractHeaderDetailForMerchantDto,
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantUpdateDto as ContractHeaderForMerchantUpdateDto,
} from "@ayasofyazilim/saas/ContractService";
import {$UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantUpdateDto as $ContractHeaderForMerchantUpdateDto} from "@ayasofyazilim/saas/ContractService";
import type {UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressTypeDto} from "@ayasofyazilim/saas/LocationService";
import ConfirmDialog from "@repo/ayasofyazilim-ui/molecules/confirm-dialog";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {CustomComboboxWidget} from "@repo/ayasofyazilim-ui/organisms/schema-form/widgets";
import {ActionButton, ActionList} from "@repo/ui/action-button";
import {CheckCircle, CircleX, Trash} from "lucide-react";
import {useParams, useRouter} from "next/navigation";
import type {TransitionStartFunction} from "react";
import {useTransition} from "react";
import {handleDeleteResponse, handlePutResponse} from "src/actions/core/api-utils-client";
import {deleteMerchantContractHeaderByIdApi} from "src/actions/unirefund/ContractService/delete-actions";
import {postMerchantContractHeaderValidateByHeaderIdApi} from "src/actions/unirefund/ContractService/post-actions";
import {
  putMerchantContractHeadersByIdApi,
  putMerchantsContractHeadersByIdMakePassiveApi,
} from "src/actions/unirefund/ContractService/put-actions";
import type {ContractServiceResource} from "src/language-data/unirefund/ContractService";
import {RefundTableHeadersField} from "../../../_components/refund-table-headers-field";

export function MerchantContractHeaderUpdateForm({
  contractHeaderDetails,
  addressList,
  languageData,
  refundTableHeaders,
}: {
  contractHeaderDetails: ContractHeaderDetailForMerchantDto;
  addressList: AddressTypeDto[];
  refundTableHeaders: AssignableRefundTableHeaders[];
  languageData: ContractServiceResource;
}) {
  const router = useRouter();
  const {lang, contractId} = useParams<{
    lang: string;
    contractId: string;
  }>();
  const [isPending, startTransition] = useTransition();
  const uiSchema = {
    "ui:config": {
      locale: lang,
    },
    "ui:options": {
      expandable: false,
    },
    webSite: {
      "ui:className": "md:col-span-full",
      "ui:options": {
        inputType: "url",
      },
    },
    "ui:className": "md:grid md:gap-2 md:grid-cols-2",
    addressCommonDataId: {
      "ui:className": "row-start-2",
      "ui:widget": "address",
    },
    status: {
      "ui:className": "md:col-span-full",
    },
    refundTableHeaders: {
      "ui:className": "md:col-span-full",
      "ui:field": "RefundTableHeadersField",
    },
    validFrom: {
      "ui:options": {},
    },
  };
  return (
    <div className="space-y-2">
      <ContractActions
        contractDetails={contractHeaderDetails}
        isPending={isPending}
        languageData={languageData}
        startTransition={startTransition}
      />
      <SchemaForm<ContractHeaderForMerchantUpdateDto>
        disabled={isPending}
        fields={{
          RefundTableHeadersField: RefundTableHeadersField(
            refundTableHeaders,
            contractHeaderDetails.refundTableHeaders.map((x) => ({
              ...x,
              refundTableHeaderId: x.id,
            })),
          ),
        }}
        formData={{
          ...contractHeaderDetails,
          refundTableHeaders: {
            ...contractHeaderDetails.refundTableHeaders.map((x) => ({
              ...x,
              refundTableHeaderId: x.id,
            })),
          },
        }}
        onSubmit={({formData: editedFormData}) => {
          if (!editedFormData) return;
          startTransition(() => {
            void putMerchantContractHeadersByIdApi({
              id: contractId,
              requestBody: editedFormData,
            }).then((response) => {
              handlePutResponse(response, router);
            });
          });
        }}
        schema={$ContractHeaderForMerchantUpdateDto}
        uiSchema={uiSchema}
        widgets={{
          address: CustomComboboxWidget<AddressTypeDto>({
            list: addressList,
            languageData,
            selectIdentifier: "id",
            selectLabel: "fullAddress",
          }),
        }}
      />
    </div>
  );
}

function ContractActions({
  contractDetails,
  languageData,
  isPending,
  startTransition,
}: {
  contractDetails: ContractHeaderDetailForMerchantDto;
  languageData: ContractServiceResource;
  isPending: boolean;
  startTransition: TransitionStartFunction;
}) {
  const router = useRouter();
  return (
    <ActionList>
      <ActionButton
        icon={CheckCircle}
        loading={isPending}
        onClick={() => {
          startTransition(() => {
            void postMerchantContractHeaderValidateByHeaderIdApi(contractDetails.id).then((response) => {
              if (response.type === "success" && response.data) {
                toast.success(languageData["Contracts.Actions.Validate.Success"]);
              } else {
                toast.error(response.message);
              }
            });
          });
        }}
        text={languageData["Contracts.Actions.Validate"]}
      />
      {!contractDetails.isDraft && !contractDetails.isActive && (
        <ConfirmDialog
          confirmProps={{
            variant: "destructive",
            children: languageData["Contracts.Actions.MakePassive"],
            closeAfterConfirm: true,
            onConfirm: () => {
              startTransition(() => {
                void putMerchantsContractHeadersByIdMakePassiveApi(contractDetails.id).then((response) => {
                  handlePutResponse(response, router, "../");
                });
              });
            },
          }}
          description={languageData["Contracts.Actions.MakePassive.Description"]}
          title={languageData["Contracts.Actions.MakePassive.Title"]}
          type="without-trigger">
          <ActionButton icon={CircleX} loading={isPending} text={languageData["Contracts.Actions.MakePassive"]} />
        </ConfirmDialog>
      )}
      <ConfirmDialog
        confirmProps={{
          variant: "destructive",
          children: languageData["Contracts.Actions.Delete"],
          closeAfterConfirm: true,
          onConfirm: () => {
            startTransition(() => {
              void deleteMerchantContractHeaderByIdApi(contractDetails.id).then((response) => {
                handleDeleteResponse(response, router, "../");
              });
            });
          },
        }}
        description={languageData["Contracts.Actions.Delete.Description"]}
        title={languageData["Contracts.Actions.Delete.Title"]}
        type="without-trigger">
        <ActionButton icon={Trash} loading={isPending} text={languageData["Contracts.Actions.Delete"]} />
      </ConfirmDialog>
    </ActionList>
  );
}
