"use client";

import type {
  UniRefund_ExportValidationService_ExportValidations_ExportValidationDto,
  UniRefund_ExportValidationService_ExportValidations_UpdateExportValidationDto,
} from "@ayasofyazilim/saas/ExportValidationService";
import { $UniRefund_ExportValidationService_ExportValidations_UpdateExportValidationDto } from "@ayasofyazilim/saas/ExportValidationService";
import { SchemaForm } from "@repo/ayasofyazilim-ui/organisms/schema-form";
import { createUiSchemaWithResource } from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handlePutResponse } from "src/actions/core/api-utils-client";
import { putExportValidationApi } from "src/actions/unirefund/ExportValidationService/put-actions";
import type { ExportValidationServiceResource } from "src/language-data/unirefund/ExportValidationService";

export default function Form({
  languageData,
  exportValidationData,
}: {
  languageData: ExportValidationServiceResource;
  exportValidationData: UniRefund_ExportValidationService_ExportValidations_ExportValidationDto;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const uiSchema = createUiSchemaWithResource({
    schema:
      $UniRefund_ExportValidationService_ExportValidations_UpdateExportValidationDto,
    resources: languageData,
    name: "Form.ExportValidation",
    extend: {
      "ui:className": "md:grid md:grid-cols-2 md:gap-2",
    },
  });
  return (
    <SchemaForm<UniRefund_ExportValidationService_ExportValidations_UpdateExportValidationDto>
      className="flex flex-col gap-4"
      disabled={loading}
      filter={{
        type: "include",
        sort: true,
        keys: [
          "referenceId",
          "exportDate",
          "status",
          "stampType",
          "initialValidationResult",
          "finalValidationResult",
        ],
      }}
      formData={exportValidationData}
      onSubmit={(data) => {
        setLoading(true);
        const formData = data.formData;
        void putExportValidationApi({
          id: exportValidationData.id || "",
          requestBody: formData,
        })
          .then((res) => {
            handlePutResponse(res, router);
          })
          .finally(() => {
            setLoading(false);
          });
      }}
      schema={
        $UniRefund_ExportValidationService_ExportValidations_UpdateExportValidationDto
      }
      submitText={languageData["Edit.Save"]}
      uiSchema={uiSchema}
    />
  );
}
