"use client";
import type {
  UniRefund_ContractService_Refunds_RefundTableHeaders_RefundTableHeaderInformationDto as AssignableRefundTableHeaders,
  UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantCreateDto as ContractHeaderForMerchantCreateDto,
} from "@ayasofyazilim/saas/ContractService";
import { $UniRefund_ContractService_ContractsForMerchant_ContractHeaders_ContractHeaderForMerchantCreateDto as $ContractHeaderForMerchantCreateDto } from "@ayasofyazilim/saas/ContractService";
import type { UniRefund_LocationService_AddressCommonDatas_AddressCommonDataDto as AddressTypeDto } from "@ayasofyazilim/saas/LocationService";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import { CustomComboboxWidget } from "@repo/ayasofyazilim-ui/organisms/schema-form/widgets";
import { handlePostResponse } from "@repo/utils/api";
import { useParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import type { ContractServiceResource } from "@/language-data/unirefund/ContractService";
import { postMerchantContractHeadersByMerchantIdApi } from "@/actions/unirefund/ContractService/post-actions";
import { RefundTableHeadersField } from "../../_components/refund-table-headers-field";

export default function MerchantContractHeaderCreateForm({
  addressList,
  languageData,
  refundTableHeaders,
}: {
  addressList: AddressTypeDto[];
  languageData: ContractServiceResource;
  refundTableHeaders: AssignableRefundTableHeaders[];
}) {
  const router = useRouter();
  const { partyId } = useParams<{
    partyId: string;
  }>();
  const [isPending, startTransition] = useTransition();
  const uiSchema = {
    "ui:className": "md:grid md:gap-2 md:grid-cols-2",
    webSite: {
      "ui:className": "md:col-span-full",
      "ui:options": {
        inputType: "url",
      },
    },
    addressCommonDataId: {
      "ui:className": "row-start-2",
      "ui:widget": "address",
    },
    status: {
      "ui:className": "md:col-span-full",
    },
    earlyRefund: {
      "ui:widget": "switch",
    },
    refundTableHeaders: {
      "ui:className": "md:col-span-full",
      "ui:field": "RefundTableHeadersField",
    },
  };
  return (
    <SchemaForm<ContractHeaderForMerchantCreateDto>
      disabled={isPending}
      fields={{
        RefundTableHeadersField: RefundTableHeadersField(refundTableHeaders),
      }}
      formData={{
        validFrom: new Date().toLocaleDateString("en"),
        refundTableHeaders: [
          {
            refundTableHeaderId: refundTableHeaders[0].id,
            validFrom: new Date().toLocaleDateString("en"),
          },
        ],
        merchantClassification: "Satisfactory",
        addressCommonDataId: addressList[0].id,
      }}
      onSubmit={({ formData }) => {
        if (!formData) return;
        startTransition(() => {
          void postMerchantContractHeadersByMerchantIdApi({
            id: partyId,
            requestBody: formData,
          }).then((response) => {
            handlePostResponse(response, router, {
              prefix: `/parties/merchants/${partyId}/contracts`,
              suffix: "contract",
              identifier: "id",
            });
          });
        });
      }}
      schema={$ContractHeaderForMerchantCreateDto}
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
  );
}
