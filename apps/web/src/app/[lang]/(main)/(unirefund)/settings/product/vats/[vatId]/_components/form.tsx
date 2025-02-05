"use client";

import type {UniRefund_SettingService_Vats_VatDto} from "@ayasofyazilim/saas/SettingService";
import {$UniRefund_SettingService_Vats_UpdateVatDto} from "@ayasofyazilim/saas/SettingService";
import {ActionList} from "@repo/ayasofyazilim-ui/molecules/action-button";
import ConfirmDialog from "@repo/ayasofyazilim-ui/molecules/confirm-dialog";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {createUiSchemaWithResource} from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import {handleDeleteResponse} from "@repo/utils/api";
import {useGrantedPolicies} from "@repo/utils/policies";
import {Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useState} from "react";
import isActionGranted from "@/utils/page-policy/action-policy";
import {deleteVatByIdApi} from "@/actions/unirefund/SettingService/delete-actions";
import {handlePutResponse} from "src/actions/core/api-utils-client";
import {putVatApi} from "src/actions/unirefund/SettingService/put-actions";
import type {SettingServiceResource} from "src/language-data/unirefund/SettingService";

export default function Form({
  languageData,
  response,
}: {
  languageData: SettingServiceResource;
  response: UniRefund_SettingService_Vats_VatDto;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {grantedPolicies} = useGrantedPolicies();

  const uiSchema = createUiSchemaWithResource({
    schema: $UniRefund_SettingService_Vats_UpdateVatDto,
    resources: languageData,
    name: "Form.Vat",
    extend: {
      active: {
        "ui:widget": "switch",
      },
    },
  });
  return (
    <div className="flex flex-col gap-4 overflow-auto">
      <ActionList>
        {isActionGranted(["SettingService.Vats.Delete"], grantedPolicies) && (
          <ConfirmDialog
            closeProps={{
              children: languageData.Cancel,
            }}
            confirmProps={{
              variant: "destructive",
              children: languageData.Delete,
              onConfirm: () => {
                setLoading(true);
                void deleteVatByIdApi(response.id || "")
                  .then((res) => {
                    handleDeleteResponse(res, router, "../vats");
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              },
              closeAfterConfirm: true,
            }}
            description={languageData["Delete.Assurance"]}
            title={languageData["Vat.Delete"]}
            triggerProps={{
              children: (
                <>
                  <Trash2 className="mr-2 w-4" /> {languageData.Delete}
                </>
              ),
              variant: "outline",
            }}
            type="with-trigger"
          />
        )}
      </ActionList>
      <SchemaForm
        className="flex flex-col gap-4"
        disabled={loading}
        formData={response}
        onSubmit={({formData}) => {
          setLoading(true);
          void putVatApi({
            id: response.id || "",
            requestBody: formData,
          })
            .then((res) => {
              handlePutResponse(res, router, "../vats");
            })
            .finally(() => {
              setLoading(false);
            });
        }}
        schema={$UniRefund_SettingService_Vats_UpdateVatDto}
        submitText={languageData["Edit.Save"]}
        uiSchema={uiSchema}
      />
    </div>
  );
}
