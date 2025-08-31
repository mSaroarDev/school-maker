import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import Image from "next/image";
import { BiEdit, BiLike, BiPaperPlane } from "react-icons/bi";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { GrLocation } from "react-icons/gr";
import { MdOutlineCall } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { HiPaperAirplane } from "react-icons/hi";
import { IoImageOutline } from "react-icons/io5";
import { SlEmotsmile } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";

const ProfilePageMain = () => {

  const breadTree = [
    { name: "Profile" },
    { name: "Home", url: "/dashboard" },
    { name: "Profile" },
  ];

  return (
    <>
      <div>
        <BreadcrumbsComponent breadTree={breadTree} />
      </div>
      <div className="grid grid-cols-12 gap-5 mt-5">
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <Card className="flex flex-col gap-3 items-center justify-center py-5 mb-3">
            <div className="relative w-[140px] h-[140px] rounded-full bg-gray-300 animate-pulse overflow-hidden">
              <Image
                src=""
                alt="Profile Picture"
                fill
                className="object-cover"
              />
            </div>
            <h2 className="font-medium text-lg -mb-2.5">Alizee Thomas</h2>
            <p className="text-sm">New Yourk, US</p>
            <Button><BiEdit size={18} /> Edit Profile</Button>
          </Card>

          <Card className="mb-3">
            <h3 className="font-medium mb-3">About Me</h3>
          </Card>

          <Card className="p-0">
            <Accordion type="single" collapsible className="-my-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>Info</AccordionTrigger>
                <AccordionContent>
                  <div className="border-b border-gray-300 dark:border-gray-600 py-2 mb-5">
                    <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph"><GrLocation size={18} /> Address</h4>
                    <p className="text-sm text-dark-card-heading">123 Main St, New York, NY 10001</p>
                  </div>

                  <div className="border-b border-gray-300 dark:border-gray-600 py-2 mb-5">
                    <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph"><BiPaperPlane size={18} /> Email</h4>
                    <p className="text-sm text-dark-card-heading">
                      expamle@gafdaf.com
                    </p>
                  </div>

                  <div className="border-b border-gray-300 dark:border-gray-600 py-2 mb-5">
                    <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph"><MdOutlineCall size={18} /> Mobile</h4>
                    <p className="text-sm text-dark-card-heading">
                      +880 1234 56789
                    </p>
                  </div>

                  <div className="border-b border-gray-300 dark:border-gray-600 py-2 mb-5">
                    <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph"><FaRegCalendarAlt size={18} /> Birth Date</h4>
                    <p className="text-sm text-dark-card-heading">
                      January 1, 1990
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </div>

        <div className="col-span-12 md:col-span-6">
          <Card>
            <h3 className="font-medium mb-3">Whats on your mind?</h3>
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg">
              <textarea
                className="w-full resize-none p-3 bg-transparent outline-none text-sm"
                rows={4}
                placeholder="Write something..."
              >
              </textarea>
              <div className="flex items-end justify-between px-3 pb-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <span className="cursor-pointer hover:text-brand" title="Add Image">
                    <IoImageOutline size={22} />
                  </span>
                  <span className="cursor-pointer hover:text-brand" title="Add Image">
                    <SlEmotsmile size={20} />
                  </span>
                </div>
                <div>
                  <Button>Post <HiPaperAirplane size={18} className="rotate-90" /></Button>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-5">
            <h3>Recent Posts</h3>
            <div className="mt-3">

              {[1, 2, 3].map((_, index) => (
                <Card style={{ paddingBottom: 0 }} key={index} className="post-card mb-3 last:mb-0">
                  <div className="flex items-center justify-between">
                    <div className="h-11 w-11 rounded-full overflow-hidden relative ring ring-primary">
                      <Image
                        src=""
                        alt="Profile Picture"
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="font-medium">Alizee Thomas</h4>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>

                  <div>
                    <p className="my-3 text-sm">
                      This is a sample post content. It can be multiple lines long and contain various information about the users thoughts or activities.
                      This is a sample post content. It can be multiple lines long and contain various information about the users thoughts or activities.
                      This is a sample post content. It can be multiple lines long and contain various information about the users thoughts or activities.
                    </p>
                  </div>

                  <hr />

                  <div className="grid grid-cols-3 gap-3 py-1">
                    <div className="flex items-center justify-center gap-1 cursor-pointer hover:bg-primary/5 py-2 rounded-lg">
                      <BiLike size={22} /> {" "}
                      <span>12</span>
                    </div>

                    <div className="flex items-center justify-center gap-1 cursor-pointer hover:bg-primary/5 py-2 rounded-lg">
                      <AiOutlineComment size={22} /> {" "}
                      <span>12</span>
                    </div>

                    <div className="flex items-center justify-center gap-1 cursor-pointer hover:bg-primary/5 py-2 rounded-lg">
                      <PiShareFat size={22} /> {" "}
                      <span>12</span>
                    </div>

                  </div>
                </Card>
              ))}

            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <Card className="mb-3">
            <h3 className="font-medium mb-3">Tasks</h3>

            <div>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div key={index} className="border-l-4 border-primary p-2 mb-3 last:mb-0">
                  <p className="text-xs">Monday 25, 2025</p>
                  <h5 className="font-medium">Homeroom & Announcement</h5>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md">Category</span>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h3 className="font-medium mb-3">Events</h3>

            <div>
              {[1, 2, 3, 4, 5].map((_, index) => (
                <div key={index} className="border-l-4 border-primary p-2 mb-3 last:mb-0">
                  <p className="text-xs">Monday 25, 2025</p>
                  <h5 className="font-medium">Homeroom & Announcement</h5>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-md">Category</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default ProfilePageMain;