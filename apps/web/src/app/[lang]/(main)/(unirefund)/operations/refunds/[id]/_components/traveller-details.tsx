import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import type {
  UniRefund_TravellerService_PersonalIdentificationCommonDatas_PersonalIdentificationProfileDto as PersonalIdentificationProfileDto,
  UniRefund_TravellerService_Travellers_TravellerDetailProfileDto as TravellerDetailProfileDto,
} from "@ayasofyazilim/saas/TravellerService";
import {IdCard, User} from "lucide-react";
import Link from "next/link";
import {getBaseLink} from "@/utils";
import {IconWithTitle} from "./icon-with-title";
import {TextWithSubText} from "./text-with-subtext";

export function TravellerDetails({
  traveller,
  lang,
}: {
  traveller: TravellerDetailProfileDto & {travellerDocumentNumber: string};
  lang: string;
}) {
  const travellerLink = getBaseLink(`parties/travellers/${traveller.id}/personal-identifications`, lang);
  return (
    <div className="grid max-h-full overflow-y-auto p-4 pb-[50%]">
      <IconWithTitle icon={User} title="Traveller details" />
      <div className="mt-2 grid w-full gap-6">
        <TextWithSubText
          subText={
            <Link className="font-semibold text-blue-500" href={travellerLink}>
              {traveller.travellerDocumentNumber}
            </Link>
          }
          text="Travel document number"
        />
        <TravellerPersonalIdentifications
          lang={lang}
          personalIdentifications={traveller.personalIdentifications}
          travellerLink={travellerLink}
        />
      </div>
    </div>
  );
}

function TravellerPersonalIdentifications({
  personalIdentifications,
  travellerLink,
  lang,
}: {
  personalIdentifications: PersonalIdentificationProfileDto[];
  travellerLink: string;
  lang: string;
}) {
  if (personalIdentifications.length === 1) {
    return (
      <TravellerPersonalIdentification
        identification={personalIdentifications[0]}
        lang={lang}
        showDocumentNumber={false}
        travellerLink={travellerLink}
      />
    );
  }
  return (
    <Accordion className="w-full space-y-2" type="multiple">
      {personalIdentifications.map((identification) => (
        <AccordionItem
          className="border-none [&>div]:-mt-4"
          key={identification.travelDocumentNumber}
          value={identification.travelDocumentNumber}>
          <AccordionTrigger className="rounded-md border px-2">
            <IconWithTitle
              classNames={{icon: "size-4", title: "text-sm font-normal"}}
              icon={IdCard}
              title={identification.travelDocumentNumber}
            />
          </AccordionTrigger>
          <AccordionContent className="rounded-b-md border border-t-0 p-2 pt-6">
            <TravellerPersonalIdentification
              identification={identification}
              lang={lang}
              travellerLink={travellerLink}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

function TravellerPersonalIdentification({
  identification,
  showDocumentNumber = true,
  lang,
  travellerLink,
}: {
  identification: PersonalIdentificationProfileDto;
  showDocumentNumber?: boolean;
  lang: string;
  travellerLink: string;
}) {
  return (
    <div className="grid gap-2">
      {showDocumentNumber ? (
        <TextWithSubText
          subText={
            <Link className="font-semibold text-blue-500" href={`${travellerLink}/${identification.id}`}>
              {identification.travelDocumentNumber}
            </Link>
          }
          text="Travel document number"
        />
      ) : null}
      <TextWithSubText subText={identification.identificationType} text="Document type" />
      <TextWithSubText subText={identification.residenceCountryName} text="Country of residence" />
      <TextWithSubText subText={identification.nationalityCountryName} text="Nationality" />
      <TextWithSubText
        subText={identification.birthDate ? new Date(identification.birthDate).toLocaleDateString(lang) : "-"}
        text="Date of birth"
      />
    </div>
  );
}
