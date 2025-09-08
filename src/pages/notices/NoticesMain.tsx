import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import HeaderComponent from "@/components/_core/HeaderComponent";
import Card from "@/components/ui/card";
import { NoticesBreadTree } from "@/helpers/breadcrumbs";
import Image from "next/image";
import placeholder from "@/assets/images/avatar.jpeg";
import { Badge } from "@/components/ui/badge";
import { FaRegEye } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { BiPaperPlane } from "react-icons/bi";

const NoticesMain = () => {
  const renderDate = (dateString: string) => (
    <Badge variant="secondary">Aug 1, 2025</Badge>
  );

  const renderViewCount = (count: number) => (
    <span className="flex items-center gap-1 text-xs text-gray-400"><FaRegEye size={16} /> 1.2K</span>
  );

  const renderTitleAuthor = (title: string, author: string) => (
    <div>
      <h1 className="text-base font-medium">Welcome back to school</h1>
      <p className="text-xs text-gray-500">By Principle, Lina Kader</p>
    </div>
  );

  return (
    <>
      <div>
        <div>
          <BreadcrumbsComponent breadTree={NoticesBreadTree} showBackButton />
        </div>

        <Card className="h-[calc(100vh-170px)] overflow-hidden">
          <HeaderComponent
            title="Notice Board"
            extraComponent={<></>}
          />

          <div className="mt-5 grid grid-cols-12 gap-4">
            <div className="col-span-12 md:col-span-8 lg:col-span-9 overflow-y-auto h-[calc(100vh-250px)] pr-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, index) => (
                <div key={index} className="p-4 rounded-xl border mb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden relative bg-slate-100">
                        {/* <Image 
                        src={placeholder}
                        fill
                        alt="avatar"
                        className="object-cover"
                      /> */}
                      </div>
                      {renderTitleAuthor("Welcome back to school", "By Principle, Lina Kader")}
                    </div>
                    <div className="flex items-center gap-2">
                      {renderDate("2025-08-01")}
                      {renderViewCount(1200)}
                    </div>
                  </div>

                  <p className="mt-5 line-clamp-2 text-gray-700 dark:text-gray-500">As we embark on another exciting academic year, lets embrace the opportunities that lie ahead. Wre thrilled to welcome new faces and reunite with returning students. Don't miss our opening assembly on August 5th!</p>
                </div>
              ))}
            </div>
            <div className="col-span-12 md:col-span-4 lg:col-span-3 border rounded-lg p-4 h-[calc(100vh-250px)]  flex flex-col justify-between">
              <div>
                <div>
                <div className="w-full h-52 rounded-lg overflow-hidden relative bg-slate-100">
                  {/* <Image 
                        src={placeholder}
                        fill
                        alt="avatar"
                        className="object-cover"
                      /> */}
                </div>
                <div className="mt-3">
                  {renderTitleAuthor("Welcome back to school", "By Principle, Lina Kader")}
                </div>
              </div>
              <div className="flex items-center gap-2 mt-3">
                {renderDate("2025-08-01")}
                {renderViewCount(1200)}
              </div>

              <div className="mt-4">
                <p className="text-gray-700 dark:text-gray-500 text-sm">
                 As we embark on another exciting academic year, lets embrace the opportunities that lie ahead. Were thrilled to welcome new faces and reunite with returning students. Dont miss our opening assembly on August 5th!

                  Attention students! To support your exam preparation, the library will offer extended hours starting September 15th. Join us for additional study sessions and access thousands of resources. Please bring and collect over 2,000 pounds of food for local food banks.
                </p>
              </div>
              </div>
              <div className="mt-auto">
                <h3 className="font-medium">Tags</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="px-2 rounded-full text-xs bg-primary/20 text-primary">#welcome</Badge>
                </div>

                <Button className="rounded-full w-full mt-4 bg-primary/30 text-black">Read Full Notice <BiPaperPlane size={18} /></Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default NoticesMain;