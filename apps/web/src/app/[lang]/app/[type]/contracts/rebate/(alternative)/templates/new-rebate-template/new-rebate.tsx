"use client";
import { toast } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import type { ContractServiceResource } from "src/language-data/ContractService";
import { getBaseLink } from "src/utils";
import Rebate from "../rebate";
import { postRebateTablesRebateTableHeaders } from "../../../../actions/rebate-tables";

export default function NewRebate({
  languageData,
}: {
  languageData: ContractServiceResource;
}) {
  const router = useRouter();
  return (
    <Rebate
      details={{}}
      initialFeesData={[]}
      initialSetupData={[]}
      languageData={languageData}
      onSubmit={(data) => {
        void postRebateTablesRebateTableHeaders({
          requestBody: {
            isTemplate: true, //this is necessary to create as template
            ...data,
          },
        })
          .then((response) => {
            if (response.type === "success") {
              toast.success(response.message);
            } else if (response.type === "api-error") {
              response.data
                .split("\n")
                .forEach((error) => error.length > 0 && toast.error(error));
            } else {
              toast.error("Fatal error");
            }
          })
          .finally(() => {
            router.push(getBaseLink("/app/admin/contracts/rebate/templates"));
          });
      }}
    />
  );
}