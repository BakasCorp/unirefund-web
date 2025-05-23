"use client";

import type {PagedResultDto_IdentityRoleDto} from "@ayasofyazilim/core-saas/IdentityService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {useParams, useRouter} from "next/navigation";
import {useGrantedPolicies} from "@repo/utils/policies";
import type {IdentityServiceResource} from "src/language-data/core/IdentityService";
import {tableData} from "./roles-table-data";

function RolesTable({
  response,
  languageData,
}: {
  response: PagedResultDto_IdentityRoleDto;
  languageData: IdentityServiceResource;
}) {
  const router = useRouter();
  const {lang} = useParams<{lang: string}>();
  const {grantedPolicies} = useGrantedPolicies();
  const columns = tableData.roles.columns(lang, languageData, grantedPolicies);
  const table = tableData.roles.table(languageData, router, grantedPolicies);

  return (
    <div className="mt-6 rounded-md border p-6">
      <TanstackTable {...table} columns={columns} data={response.items || []} rowCount={response.totalCount} />
    </div>
  );
}
export default RolesTable;
