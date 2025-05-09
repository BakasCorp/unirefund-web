"use client";
import type {
  UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderDto as RefundFeeHeaderDto,
  UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderUpdateDto as RefundFeeHeaderUpdateDto,
} from "@ayasofyazilim/saas/ContractService";
import {$UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderUpdateDto as $RefundFeeHeaderUpdateDto} from "@ayasofyazilim/saas/ContractService";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {handlePutResponse} from "@repo/utils/api";
import {useParams, useRouter} from "next/navigation";
import {createUiSchemaWithResource} from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import {putRefundFeeHeadersByIdApi} from "@repo/actions/unirefund/ContractService/put-actions";
import type {ContractServiceResource} from "@/language-data/unirefund/ContractService";
import {RefundFeeDetailsField} from "../../_components/refund-fee-details-field";

export default function RefundFeeHeaderUpdateForm({
  formData,
  languageData,
}: {
  formData: RefundFeeHeaderDto;
  languageData: ContractServiceResource;
}) {
  const {id: refundFeeHeaderId} = useParams<{id: string}>();
  const router = useRouter();
  const uiSchema = createUiSchemaWithResource({
    schema: $RefundFeeHeaderUpdateDto,
    name: "Contracts.Form",
    resources: languageData,
    extend: {
      "ui:className": "md:grid md:grid-cols-2 md:p-6 p-2 my-6 border rounded-md",
      name: {
        "ui:className": "h-max flex justify-center md:col-span-2",
        "ui:options": {
          classNames: {
            root: "flex justify-center w-full",
            label: "flex justify-center",
          },
        },
      },
      isActive: {
        "ui:widget": "switch",
        "ui:className": "h-max md:col-span-2 justify-center",
        "ui:options": {
          inline: true,
          classNames: {
            root: "flex items-center",
            label: "mr-2",
          },
        },
      },
      refundFeeDetails: {
        "ui:field": "RefundFeeDetailsField",
        "ui:className": "border-none p-0 md:col-span-full",
      },
    },
  });
  return (
    <SchemaForm<RefundFeeHeaderUpdateDto>
      fields={{
        RefundFeeDetailsField: RefundFeeDetailsField({
          data: formData.refundFeeDetails !== null ? formData.refundFeeDetails : [],
          languageData,
        }),
      }}
      formData={formData}
      onSubmit={({formData: editedFormData}) => {
        if (!editedFormData) return;
        void putRefundFeeHeadersByIdApi({
          id: refundFeeHeaderId,
          requestBody: editedFormData,
        }).then((response) => {
          handlePutResponse(response, router);
        });
      }}
      schema={$RefundFeeHeaderUpdateDto}
      submitText={languageData["Edit.Save"]}
      uiSchema={uiSchema}
    />
  );
}
