"use server";

import {TabLayout} from "@repo/ayasofyazilim-ui/templates/tab-layout";
import {getResourceData} from "src/language-data/unirefund/CRMService";
import {getBaseLink} from "src/utils";
import IndividualActionList from "../_components/individual-action-list";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    partyId: string;
    lang: string;
  };
}) {
  const {partyId, lang} = params;
  const {languageData} = await getResourceData(lang);

  const baseLink = getBaseLink(`parties/individuals/${partyId}/details/`, lang);
  return (
    <TabLayout
      classNames={{
        horizontal: {
          // Ensure the tab list scrolls horizontally on smaller screens
          tabList:
            "overflow-x-auto whitespace-nowrap  lg:overflow-x-hidden w-full lg:w-max justify-start lg::justify-center",
        },
      }}
      tabList={[
        {
          label: languageData["Form.Individual.name"],
          href: `${baseLink}name`,
        },
        {
          label: languageData["Form.Individual.personalSummaries"],
          href: `${baseLink}personal-summary`,
        },
        {
          label: languageData.Email,
          href: `${baseLink}email`,
        },
        {
          label: languageData.Telephone,
          href: `${baseLink}phone`,
        },
        {
          label: languageData.Address,
          href: `${baseLink}address`,
        },
      ]}>
      {children}
      <IndividualActionList lang={lang} languageData={languageData} partyId={partyId} />
    </TabLayout>
  );
}
