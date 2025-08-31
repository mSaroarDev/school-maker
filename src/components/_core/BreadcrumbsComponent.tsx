"use client";
import BackButton from "./BackButton";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

interface BreadcrumbItemType {
  name: string;
  url?: string;
}

interface BreadcrumbsComponentProps {
  breadTree: BreadcrumbItemType[];
  showBackButton?: boolean;
}

const BreadcrumbsComponent = ({
  breadTree,
  showBackButton = false,
}: BreadcrumbsComponentProps) => {
  // First item is considered current page.
  const currPage = breadTree.length > 0 ? breadTree[0].name : "";

  // Rest items are for navigation.
  const crumbItems = breadTree.slice(1);

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 pb-2">
          <h3
            className={`font-medium capitalize text-2xl ${
              crumbItems.length > 0 ? "md:border-r border-brand/30" : ""
            } pr-3`}
          >
            {currPage}
          </h3>
          {crumbItems.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                {crumbItems.map((item, index) => {
                  const isLast = index === crumbItems.length - 1;
                  const isClickable = !!item.url;

                  return (
                    <span key={index} className="flex items-center">
                      <BreadcrumbItem
                        className={`capitalize ${
                          isLast ? "font-medium" : ""
                        } ${
                          !isClickable ? "cursor-default text-muted-foreground" : ""
                        }`}
                      >
                        {isClickable ? (
                          <BreadcrumbLink asChild>
                            <Link href={item.url!}>{item.name}</Link>
                          </BreadcrumbLink>
                        ) : (
                          <span>{item.name}</span>
                        )}
                      </BreadcrumbItem>
                      {!isLast && <BreadcrumbSeparator />}
                    </span>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>
      </div>
      {showBackButton && <BackButton />}
    </div>
  );
};

export default BreadcrumbsComponent;