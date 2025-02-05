"use client";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Fragment } from "react";

function TagCardList({
  title,
  icon,
  rows,
  className = "",
}: {
  title: string;
  icon: string | React.ReactNode;
  rows: { name: string; value: string; link?: string; className?: string }[];
  className?: string;
}) {
  return (
    <TagCard className={className} icon={icon} title={title}>
      <div className="grid grid-cols-6 gap-2">
        {rows.map((row) => {
          const valueElement = row.link ? (
            <Link className="text-blue-700" href={row.link} key={row.name}>
              {row.value}
            </Link>
          ) : (
            row.value
          );
          return (
            <Fragment key={row.name}>
              <div className="col-span-2">
                <div className="overflow-hidden text-ellipsis text-nowrap text-sm text-gray-500 hover:absolute hover:z-10 hover:overflow-visible hover:bg-white hover:pr-1">
                  {row.name}
                </div>
              </div>
              <div className="col-span-4">
                <div className={`${row.className} text-sm font-semibold`}>
                  {valueElement}
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </TagCard>
  );
}

export function TagCard({
  title,
  icon,
  children,
  className,
}: {
  title: string;
  icon: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("col-span-2 h-full flex-1 rounded-none", className)}>
      <CardHeader className="h-full py-4">
        <CardTitle className="mb-2 flex items-center gap-2 text-lg">
          {icon}
          {title}
        </CardTitle>
        {children}
      </CardHeader>
    </Card>
  );
}

export default TagCardList;
