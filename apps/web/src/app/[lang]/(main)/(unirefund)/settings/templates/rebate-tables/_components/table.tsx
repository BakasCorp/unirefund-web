"use client";
import type {PagedResultDto_RebateTableHeaderListDto} from "@ayasofyazilim/saas/ContractService";
import type {UniRefund_CRMService_Merchants_MerchantProfileDto as MerchantProfileDto} from "@ayasofyazilim/saas/CRMService";
import TanstackTable from "@repo/ayasofyazilim-ui/molecules/tanstack-table";
import {useGrantedPolicies} from "@repo/utils/policies";
import {useRouter} from "next/navigation";
import type {ContractServiceResource} from "src/language-data/unirefund/ContractService";
import {tableData} from "./table-data";

export default function RebateTable({
  languageData,
  rebateTableHeaders,
  lang,
  merchants,
}: {
  languageData: ContractServiceResource;
  rebateTableHeaders: PagedResultDto_RebateTableHeaderListDto;
  lang: string;
  merchants: MerchantProfileDto[];
}) {
  const router = useRouter();
  const {grantedPolicies} = useGrantedPolicies();
  const columns = tableData.rebateTableHeaders.columns(lang, languageData);
  const table = tableData.rebateTableHeaders.table({languageData, router, grantedPolicies, merchants});
  return (
    <TanstackTable
      {...table}
      columns={columns}
      data={rebateTableHeaders.items || []}
      rowCount={rebateTableHeaders.totalCount}
    />
  );
}
