"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { UniRefund_CRMService_RefundPoints_RefundPointProfileDto } from "@ayasofyazilim/saas/CRMService";
import { Combobox } from "@repo/ayasofyazilim-ui/molecules/combobox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import type { TagServiceResource } from "src/language-data/unirefund/TagService";

export default function TravellerDocumentForm({
  languageData,
  accessibleRefundPoints,
}: {
  languageData: TagServiceResource;
  accessibleRefundPoints: UniRefund_CRMService_RefundPoints_RefundPointProfileDto[];
}) {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const tagId = searchParams.get("tagIds") || "";
  const travellerDocumentNo = searchParams.get("travellerDocumentNumber") || "";
  const refundPointId =
    accessibleRefundPoints.find(
      (i) => i.id === searchParams.get("refundPointId"),
    )?.id || "";

  const [travellerDocumentNoInput, setTravellerDocumentNoInput] =
    useState(travellerDocumentNo);
  const [tagIdInput, setTagIdInput] = useState(tagId);
  const [refundPointIdInput, setRefundPointIdInput] = useState<
    UniRefund_CRMService_RefundPoints_RefundPointProfileDto | null | undefined
  >(accessibleRefundPoints.find((i) => i.id === refundPointId) || null);
  const [isPending, startTransition] = useTransition();

  function searchForTraveller() {
    startTransition(() => {
      router.replace(
        `${pathName}?travellerDocumentNumber=${travellerDocumentNoInput}&tagIds=${tagIdInput}&refundPointId=${refundPointIdInput?.id}`,
      );
    });
  }

  return (
    <form
      className="flex items-end gap-4"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="grid max-w-lg items-center gap-1.5">
        <Label htmlFor="traveller-document-no">
          {languageData.TravellerDocumentNo}
        </Label>
        <Input
          disabled={isPending}
          id="traveller-document-no"
          name="travellerDocumentNumber"
          onChange={(e) => {
            setTravellerDocumentNoInput(e.target.value);
          }}
          value={travellerDocumentNoInput}
        />
      </div>
      <div className="grid max-w-lg items-center gap-1.5">
        <Label htmlFor="traveller-document-no">
          {languageData.TaxFreeTagID}
        </Label>
        <Input
          disabled={isPending}
          id="tagId"
          name="tagId"
          onChange={(e) => {
            setTagIdInput(e.target.value);
          }}
          value={tagIdInput}
        />
      </div>
      <div className="grid max-w-lg items-center gap-1.5">
        <Label htmlFor="refund-point">{languageData.RefundPoint}</Label>
        <Combobox<UniRefund_CRMService_RefundPoints_RefundPointProfileDto>
          list={accessibleRefundPoints}
          onValueChange={setRefundPointIdInput}
          selectIdentifier="id"
          selectLabel="name"
          value={refundPointIdInput}
        />
      </div>
      <Button
        className="w-24"
        disabled={
          isPending ||
          !travellerDocumentNoInput.length ||
          !refundPointIdInput?.id ||
          (travellerDocumentNo === travellerDocumentNoInput &&
            refundPointId === refundPointIdInput.id &&
            tagId === tagIdInput)
        }
        onClick={searchForTraveller}
        type="submit"
      >
        {isPending ? languageData.Searching : languageData.Search}
      </Button>
    </form>
  );
}
