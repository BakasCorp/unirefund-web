"use client";

import { IdCardIcon } from "@radix-ui/react-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@repo/ayasofyazilim-ui/atoms/tooltip";
import { BreadcrumbItemType, NavbarItemsFromDB } from "@repo/ui/theme/types";

import {
  BookA,
  Box,
  BriefcaseBusiness,
  Building2,
  CircleDollarSign,
  ClipboardList,
  Container,
  DiamondPercent,
  Fingerprint,
  Globe,
  HandCoins,
  Handshake,
  Home,
  KeyRound,
  Landmark,
  Languages,
  Layers,
  LayoutDashboard,
  LayoutTemplate,
  Lock,
  Percent,
  Plane,
  PlusCircle,
  Scan,
  ScanBarcode,
  ScanLine,
  ScrollText,
  Settings,
  ShoppingBag,
  Table,
  Text,
  TicketSlash,
  User,
  WalletCards,
  Menu
} from "lucide-react";
import { Notification, NotificationProps } from "../../../components/notification";
import BreadcrumbNavigation from "./breadcrumb";
import LanguageSelector from "./language-selector";
import Logo from "./logo";
import SearchBar, { type SearchFromDB } from "./navbar-searchbar";
import ProfileMenu from "./profile-menu";
import { useState } from "react";

export default function Navbar({
  prefix,
  navbarItems,
  navigation,
  lang,
  tenantData,
  notification,
  searchFromDB,
}: {
  prefix: string;
  lang: string;
  navbarItems: NavbarItemsFromDB[];
  navigation: BreadcrumbItemType[];
  tenantData?: { tenantId: string; tenantName: string };
  notification?: NotificationProps;
  searchFromDB?: SearchFromDB[];
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky left-0 right-0 top-0 z-50">
      <nav className="bg-white py-2.5">
        <div className="flex flex-wrap items-center justify-between">
          <div className="flex items-center justify-start">
            <Logo />
            {tenantData && (
              <>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="text-muted-foreground flex items-center border-l p-0 pl-2 font-light text-xs sm:text-sm truncate max-w-[100px] sm:max-w-none"
                      onClick={() => {
                        if (navigator.clipboard) {
                          navigator.clipboard.writeText(tenantData.tenantId);
                        } else {
                          alert(tenantData.tenantId);
                        }
                      }}>
                      {tenantData.tenantName}
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="bg-black">Click to copy tenant id.</TooltipContent>
                </Tooltip>
              </>
            )}
          </div>
          <div className="flex items-center gap-1 md:gap-2 lg:order-2">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 md:hidden">
              <Menu size={20} />
            </button>
            <LanguageSelector lang={lang} />
            {notification && <Notification {...notification} />}
            <ProfileMenu />
          </div>
        </div>
      </nav>
      <div className={`flex flex-col md:flex-row items-start md:items-center justify-between border-y border-gray-200 bg-white py-1 ${isMobileMenuOpen ? 'block' : 'hidden md:flex'}`}>
        <BreadcrumbNavigation navigation={navigation} navbarItems={navbarItems} />
        <SearchBar navbarItems={navbarItems} prefix={prefix} searchFromDB={searchFromDB || []} />
      </div>
    </div>
  );
}

export const icons = {
  home: <Home className="mr-1 size-4 text-gray-600" />,
  id: <IdCardIcon className="mr-1 size-4 text-gray-600" />,
  app: <Box className="mr-1 size-4 text-gray-600" />,
  dashboard: <LayoutDashboard className="mr-1 size-4 text-gray-600" />,
  identity: <Fingerprint className="mr-1 size-4 text-gray-600" />,
  user: <User className="mr-1 size-4 text-gray-600" />,
  scope: <DiamondPercent className="mr-1 size-4 text-gray-600" />,
  role: <KeyRound className="mr-1 size-4 text-gray-600" />,
  management: <BriefcaseBusiness className="mr-1 size-4 text-gray-600" />,
  globe: <Globe className="mr-1 size-4 text-gray-600" />,
  settings: <Settings className="mr-1 size-4 text-gray-600" />,
  layer: <Layers className="mr-1 size-4 text-gray-600" />,
  plane: <Plane className="mr-1 size-4 text-gray-600" />,
  clipboard: <ClipboardList className="mr-1 size-4 text-gray-600" />,
  shop: <ShoppingBag className="mr-1 size-4 text-gray-600" />,
  refund: <TicketSlash className="mr-1 size-4 text-gray-600" />,
  language: <Languages className="mr-1 size-4 text-gray-600" />,
  edition: <WalletCards className="mr-1 size-4 text-gray-600" />,
  scan: <Scan className="mr-1 size-4 text-gray-600" />,
  book: <BookA className="mr-1 size-4 text-gray-600" />,
  lock: <Lock className="mr-1 size-4 text-gray-600" />,
  building: <Building2 className="mr-1 size-4 text-gray-600" />,
  log: <ScrollText className="mr-1 size-4 text-gray-600" />,
  text: <Text className="mr-1 size-4 text-gray-600" />,
  vat: <HandCoins className="mr-1 size-4 text-gray-600" />,
  product: <ScanLine className="mr-1 size-4 text-gray-600" />,
  productGroup: <ScanBarcode className="mr-1 size-4 text-gray-600" />,
  container: <Container className="mr-1 size-4 text-gray-600" />,
  tax: <CircleDollarSign className="mr-1 size-4 text-gray-600" />,
  taxOffice: <Landmark className="mr-1 size-4 text-gray-600" />,
  percent: <Percent className="mr-1 size-4 text-gray-600" />,
  operation: <Handshake className="mr-1 size-4 text-gray-600" />,
  table: <Table className="mr-1 size-4 text-gray-600" />,
  template: <LayoutTemplate className="mr-1 size-4 text-gray-600" />,
  new: <PlusCircle className="mr-1 size-4 text-gray-600" />,
};
