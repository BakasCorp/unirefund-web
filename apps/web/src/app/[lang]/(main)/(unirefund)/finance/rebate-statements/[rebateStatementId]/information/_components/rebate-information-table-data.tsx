import type {UniRefund_FinanceService_RebateStatementStoreDetails_RebateStatementStoreDetailDraftDto} from "@ayasofyazilim/saas/FinanceService";
import {$UniRefund_FinanceService_RebateStatementStoreDetails_RebateStatementStoreDetailDraftDto} from "@ayasofyazilim/saas/FinanceService";
import type {
  TanstackTableColumnLink,
  TanstackTableCreationProps,
} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/types";
import {tanstackTableCreateColumnsByRowData} from "@repo/ayasofyazilim-ui/molecules/tanstack-table/utils";
import type {Policy} from "@repo/utils/policies";
import {isActionGranted} from "@repo/utils/policies";
import type {FinanceServiceResource} from "src/language-data/unirefund/FinanceService";

type RebateStatementsTable =
  TanstackTableCreationProps<UniRefund_FinanceService_RebateStatementStoreDetails_RebateStatementStoreDetailDraftDto>;

const links: Partial<
  Record<
    keyof UniRefund_FinanceService_RebateStatementStoreDetails_RebateStatementStoreDetailDraftDto,
    TanstackTableColumnLink
  >
> = {};
const rebateInformationColumns = (
  locale: string,
  languageData: FinanceServiceResource,
  grantedPolicies: Record<Policy, boolean>,
) => {
  if (isActionGranted(["FinanceService.RebateStatementHeaders.View"], grantedPolicies)) {
    links.invoiceNumber = {
      prefix: `/finance/vat-statements/`,
      targetAccessorKey: "vatStatementHeaderId",
      suffix: "/information",
    };
  }
  return tanstackTableCreateColumnsByRowData<UniRefund_FinanceService_RebateStatementStoreDetails_RebateStatementStoreDetailDraftDto>(
    {
      rows: $UniRefund_FinanceService_RebateStatementStoreDetails_RebateStatementStoreDetailDraftDto.properties,
      languageData: {
        languageData,
        constantKey: "Form.RebateStatement",
      },
      config: {
        locale,
      },
      links,
    },
  );
};

function rebateInformationTable() {
  const table: RebateStatementsTable = {
    fillerColumn: "invoiceNumber",
    columnVisibility: {
      type: "hide",
      columns: ["vatStatementHeaderId", "merchantId"],
    },
    columnOrder: [
      "invoiceNumber",
      "merchantName",
      "referenceDateBegin",
      "tagCount",
      "vatAmount",
      "rebateAmount",
      "grandTotalAmount",
    ],
  };
  return table;
}

export const tableData = {
  rebateInformation: {
    columns: rebateInformationColumns,
    table: rebateInformationTable,
  },
};
