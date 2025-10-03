import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import Card from "@/components/ui/card";
import { FinanceBreadTree } from "@/helpers/breadcrumbs";

const FinanceMain = () => {
    return (
        <>
          <BreadcrumbsComponent breadTree={FinanceBreadTree} />

          <Card>
            <div className="grid grid-cols-12 gap-5">
              <div className="col-span-6 lg:col-span-8">
                <div className="bg-slate-50"></div>
              </div>
              <div className="col-span-6 lg:col-span-4 grid grid-cols-2 gap-5">
                <div className="bg-primary-light p-3 rounded-lg h-32"></div>
                <div className="bg-primary-light p-3 rounded-lg h-32"></div>
                <div className="bg-primary-light p-3 rounded-lg h-32"></div>
                <div className="bg-primary-light p-3 rounded-lg h-32"></div>
              </div>
            </div>
          </Card>
        </>
    );
};

export default FinanceMain;