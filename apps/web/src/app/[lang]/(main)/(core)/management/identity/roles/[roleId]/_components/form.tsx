"use client";

import type {Volo_Abp_Identity_IdentityRoleDto} from "@ayasofyazilim/core-saas/IdentityService";
import {$Volo_Abp_Identity_IdentityRoleUpdateDto} from "@ayasofyazilim/core-saas/IdentityService";
import ConfirmDialog from "@repo/ayasofyazilim-ui/molecules/confirm-dialog";
import {SchemaForm} from "@repo/ayasofyazilim-ui/organisms/schema-form";
import {createUiSchemaWithResource} from "@repo/ayasofyazilim-ui/organisms/schema-form/utils";
import {useGrantedPolicies, isActionGranted} from "@repo/utils/policies";
import {Trash2} from "lucide-react";
import {useRouter} from "next/navigation";
import {useTransition} from "react";
import {handleDeleteResponse, handlePutResponse} from "@repo/utils/api";
import {deleteRoleByIdApi} from "@repo/actions/core/IdentityService/delete-actions";
import {putRoleApi} from "@repo/actions/core/IdentityService/put-actions";
import type {IdentityServiceResource} from "src/language-data/core/IdentityService";

export default function Form({
  languageData,
  response,
}: {
  languageData: IdentityServiceResource;
  response: Volo_Abp_Identity_IdentityRoleDto;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {grantedPolicies} = useGrantedPolicies();

  const uiSchema = createUiSchemaWithResource({
    schema: $Volo_Abp_Identity_IdentityRoleUpdateDto,
    resources: languageData,
    name: "Form.Role",
    extend: {
      "ui:className": "rounded-md shadow-sm p-4 md:p-6  border border-slate-200",
      isDefault: {
        "ui:widget": "switch",
      },
      isPublic: {
        "ui:widget": "switch",
      },
    },
  });
  return (
    <div className="my-6 flex flex-col gap-2 overflow-auto">
      <SchemaForm<Volo_Abp_Identity_IdentityRoleDto>
        className="flex flex-col gap-5 pr-0"
        disabled={isPending}
        filter={{
          type: "exclude",
          keys: ["concurrencyStamp"],
        }}
        formData={response}
        onSubmit={({formData}) => {
          startTransition(() => {
            void putRoleApi({
              id: response.id || "",
              requestBody: {...formData, name: formData?.name || ""},
            }).then((res) => {
              handlePutResponse(res, router, "../roles");
            });
          });
        }}
        schema={$Volo_Abp_Identity_IdentityRoleUpdateDto}
        submitText={languageData["Edit.Save"]}
        uiSchema={uiSchema}
      />
      <div className="flex justify-end">
        {isActionGranted(["AbpIdentity.Roles.Delete"], grantedPolicies) && (
          <ConfirmDialog
            closeProps={{
              children: languageData.Cancel,
            }}
            confirmProps={{
              variant: "destructive",
              children: languageData.Delete,
              onConfirm: () => {
                startTransition(() => {
                  void deleteRoleByIdApi(response.id || "").then((res) => {
                    handleDeleteResponse(res, router, "../roles");
                  });
                });
              },
              closeAfterConfirm: true,
            }}
            description={languageData["Delete.Assurance"]}
            title={languageData["Role.Delete"]}
            triggerProps={{
              children: (
                <>
                  <Trash2 className="mr-2 w-4" /> {languageData.Delete}
                </>
              ),
              variant: "destructive",
              className: "bg-destructive/90 hover:bg-destructive",
              disabled: isPending,
            }}
            type="with-trigger"
          />
        )}
      </div>
    </div>
  );
}
