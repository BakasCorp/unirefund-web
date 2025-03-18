"use client";
import type {UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderCreateDto as RefundFeeHeaderCreateDto} from "@ayasofyazilim/saas/ContractService";
import {$UniRefund_ContractService_Refunds_RefundFeeHeaders_RefundFeeHeaderCreateDto as $RefundFeeHeaderCreateDto} from "@ayasofyazilim/saas/ContractService";
import type {UniRefund_CRMService_RefundPoints_RefundPointProfileDto as RefundPointProfileDto} from "@ayasofyazilim/saas/CRMService";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {DependencyType} from "@repo/ayasofyazilim-ui/organisms/schema-form/types";
import {createUiSchemaWithResource} from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import {CustomComboboxWidget} from "@repo/ayasofyazilim-ui/organisms/schema-form/widgets";
import {handlePostResponse} from "@repo/utils/api";
import {useRouter} from "next/navigation";
import {useState, useTransition} from "react";
import {postRefundFeeHeadersApi} from "@repo/actions/unirefund/ContractService/post-actions";
import {getBaseLink} from "@/utils";
import type {ContractServiceResource} from "@/language-data/unirefund/ContractService";
import {RefundFeeDetailsField} from "../../_components/refund-fee-details-field";

export default function RefundFeeHeaderCreateForm({
  refundPoints,
  languageData,
}: {
  refundPoints: RefundPointProfileDto[];
  languageData: ContractServiceResource;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<RefundFeeHeaderCreateDto>({
    name: "",
    isActive: true,
    isTemplate: true,
    refundFeeDetails: [
      {
        amountFrom: 0,
        amountTo: 0,
        feeType: "AgentFee",
        fixedFeeValue: 0,
        maxFee: 0,
        minFee: 0,
        percentFeeValue: 0,
        isForEarlyRefund: false,
        fixedFeeValueEarlyRefund: 0,
        maxFeeEarlyRefund: 0,
        minFeeEarlyRefund: 0,
        percentFeeValueEarlyRefund: 0,
        refundMethod: "All",
      },
    ],
  });
  const uiSchema = createUiSchemaWithResource({
    schema: $RefundFeeHeaderCreateDto,
    name: "Contracts.Form",
    resources: languageData,
    extend: {
      "ui:className": "md:grid md:grid-cols-2",
      name: {"ui:className": ""},
      isTemplate: {
        "ui:widget": "switch",
        "ui:className": "border px-2 rounded-md h-max self-end",
      },
      isActive: {
        "ui:widget": "switch",
        "ui:className": "border px-2 rounded-md h-max self-end",
      },
      refundPointId: {
        "ui:widget": "RefundPointWidget",
        dependencies: [
          {
            target: "isTemplate",
            when: (targetValue: boolean) => targetValue,
            type: DependencyType.HIDES,
          },
          {
            target: "isTemplate",
            when: (targetValue: boolean) => !targetValue,
            type: DependencyType.REQUIRES,
          },
        ],
      },
      refundFeeDetails: {
        "ui:field": "RefundFeeDetailsField",
        "ui:className": "border-none p-0 md:col-span-full",
      },
    },
  });
  return (
    <SchemaForm<RefundFeeHeaderCreateDto>
      disabled={isPending}
      fields={{
        RefundFeeDetailsField: RefundFeeDetailsField({
          data: formData.refundFeeDetails !== null ? formData.refundFeeDetails : [],
          languageData,
        }),
      }}
      formData={formData}
      onChange={({formData: editedFormData}) => {
        if (!editedFormData) return;
        setFormData(editedFormData);
      }}
      onSubmit={({formData: editedFormData}) => {
        if (!editedFormData) return;
        startTransition(() => {
          void postRefundFeeHeadersApi({
            requestBody: editedFormData,
          }).then((response) => {
            handlePostResponse(response, router, {
              prefix: getBaseLink("/settings/templates/refund-fees"),
              identifier: "id",
            });
          });
        });
      }}
      schema={$RefundFeeHeaderCreateDto}
      submitText={languageData.Save}
      uiSchema={uiSchema}
      useDependency
      widgets={{
        RefundPointWidget: CustomComboboxWidget<RefundPointProfileDto>({
          languageData,
          list: refundPoints,
          selectIdentifier: "id",
          selectLabel: "name",
        }),
      }}
    />
  );
}
