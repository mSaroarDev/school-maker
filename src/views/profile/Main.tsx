"use client";
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
import { IoImageOutline, IoTransgenderOutline } from "react-icons/io5";
import { SlEmotsmile } from "react-icons/sl";
import { AiOutlineComment } from "react-icons/ai";
import { PiShareFat } from "react-icons/pi";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import avatarImage from "@/assets/images/avatar.jpeg";
import moment from "moment";
import { useParams } from "next/navigation";
import { useGetTeacherById } from "@/api/teachers/teachers.hooks";
import { Badge } from "@/components/ui/badge"
import { TQualification } from "@/api/teachers/teachers.interfaces";
import { RiBookmark3Line } from "react-icons/ri";
import Avatar from "@/components/_core/Avatar";

const ProfilePageMain = () => {

  const params = useParams();
  const teacherId = params ? params.teacherId : null;

  const { data: teacherData } = useGetTeacherById({
    teacherId: teacherId as string,
    options: { enabled: teacherId !== null && teacherId !== undefined }
  });


  const breadTree = [
    { name: "Profile" },
    { name: "Home", url: "/dashboard" },
    { name: "Profile" },
  ];

  const { user: currLoggedUser } = useAuth();
  const user = teacherId ? teacherData?.data : currLoggedUser;

  return (
    <>
      <div>
        <BreadcrumbsComponent breadTree={breadTree} showBackButton />
      </div>
      <div className="grid grid-cols-12 gap-5 mt-5">
        <div className="col-span-12 md:col-span-6 lg:col-span-3">
          <Card className="flex flex-col gap-3 items-center justify-center py-10 mb-3">
            <Avatar 
              fullName={user?.fullName || "N/A"}
              size={112}
              avatar={user?.avatar}
            />
            <h2 className="font-medium text-lg -mb-2.5">{user?.fullName}</h2>
            <p className="text-sm">{`${user?.profile?.address || user?.designation}
              ${user?.profile?.city ? ", " : ""}
            ${user?.profile?.city || ""}`}</p>

            {!teacherId && (
              <Button>
                <Link href="/profile/update" className="flex items-center gap-2">
                  <BiEdit size={18} /> Edit Profile
                </Link>
              </Button>
            )}
          </Card>

          <Card className="mb-3">
            <h3 className="font-medium mb-3">About Me</h3>
            <div className="mt-3">
              <p className="text-sm text-dark-card-heading">
                {user?.profile?.bio || ""}
              </p>
            </div>
          </Card>

          {user?.profile?.bio && (
            <Card className="mb-3">
              <Accordion type="single" defaultValue="item-1" collapsible className="-my-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Info</AccordionTrigger>
                  <AccordionContent>
                    <div className="border-b border-gray-300 dark:border-gray-600 py-2 mb-5">
                      <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph"><GrLocation size={18} /> Address</h4>
                      <p className="text-sm text-dark-card-heading">{`
                      ${user?.profile?.address || user?.currentAddress}
                      ${user?.profile?.city ? ", " : ""}
                      ${user?.profile?.city || ""}
                    `}</p>
                    </div>

                    <div className="border-b border-gray-300 dark:border-gray-600 py-2 mb-5">
                      <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph"><BiPaperPlane size={18} /> Email</h4>
                      <p className="text-sm text-dark-card-heading">
                        {user?.email}
                      </p>
                    </div>

                    <div className="border-b border-gray-300 dark:border-gray-600 py-2 mb-5">
                      <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph"><MdOutlineCall size={18} /> Mobile</h4>
                      <p className="text-sm text-dark-card-heading">
                        {user?.phone || user?.phoneNumber || "N/A"}
                      </p>
                    </div>

                    <div className="border-b border-gray-300 dark:border-gray-600 py-2 mb-5">
                      <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph"><FaRegCalendarAlt size={18} /> Birth Date</h4>
                      <p className="text-sm text-dark-card-heading">
                        {moment(user?.profile?.dateOfBirth).format("MMMM D, YYYY") || "N/A"}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          )}

          <Card className="mb-3">
            <Accordion type="single" defaultValue="item-1" collapsible className="-my-4">
              <AccordionItem value="item-1">
                <AccordionTrigger>Info</AccordionTrigger>
                <AccordionContent>
                  <div className="border-b border-gray-300 dark:border-gray-600 py-2 mb-5">
                    <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph"><GrLocation size={18} /> Address</h4>
                    <p className="text-sm text-dark-card-heading">{`
                      ${user?.profile?.address || user?.currentAddress}
                      ${user?.profile?.city ? ", " : ""}
                      ${user?.profile?.city || ""}
                    `}</p>
                  </div>

                  <div className="border-b border-gray-300 dark:border-gray-600 py-2 mb-5">
                    <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph"><BiPaperPlane size={18} /> Email</h4>
                    <p className="text-sm text-dark-card-heading">
                      {user?.email}
                    </p>
                  </div>

                  <div className="border-b border-gray-300 dark:border-gray-600 py-2 mb-5">
                    <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph"><MdOutlineCall size={18} /> Mobile</h4>
                    <p className="text-sm text-dark-card-heading">
                      {user?.phone || user?.phoneNumber || "N/A"}
                    </p>
                  </div>

                  <div className="border-b border-gray-300 dark:border-gray-600 py-2">
                    <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph"><FaRegCalendarAlt size={18} /> Birth Date</h4>
                    <p className="text-sm text-dark-card-heading">
                      {moment(user?.profile?.dateOfBirth).format("MMMM D, YYYY") || "N/A"}
                    </p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          {user?.familyInformation && (
            <Card className="mb-3">
              <Accordion type="single" defaultValue="item-1" collapsible className="-my-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Family Info</AccordionTrigger>
                  <AccordionContent>
                    <div className="border-b border-gray-300 dark:border-gray-600 py-2 mb-5">
                      <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph">
                        <IoTransgenderOutline size={18} /> Father Name
                      </h4>
                      <p className="text-sm text-dark-card-heading">{user?.familyInformation?.fatherName}</p>
                    </div>

                    <div className="border-b border-gray-300 dark:border-gray-600 py-2 mb-5">
                      <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph">
                        <IoTransgenderOutline size={18} /> Mother Name
                      </h4>
                      <p className="text-sm text-dark-card-heading">
                        {user?.familyInformation?.motherName}
                      </p>
                    </div>

                    <div className="border-b border-gray-300 dark:border-gray-600 py-2">
                      <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph">
                        <MdOutlineCall size={18} /> Emergency Contact
                      </h4>
                      <p className="text-sm text-dark-card-heading">
                        {user?.familyInformation?.emergencyContact || "N/A"}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          )}

          {user?.qualification && (
            <Card className="mb-3">
              <Accordion type="single" defaultValue="item-1" collapsible className="-my-4">
                <AccordionItem value="item-1">
                  <AccordionTrigger>Education</AccordionTrigger>
                  <AccordionContent>
                    {user?.qualification.map((edu: TQualification, index: string) => (
                      <div key={index} className="border-b border-gray-300 dark:border-gray-600 py-2">
                        <h4 className="flex items-center gap-2 mb-2 text-dark-card-paragraph">
                          <RiBookmark3Line size={18} /> {edu?.degree}
                        </h4>
                        <p className="text-sm text-dark-card-heading">
                          {edu?.institueName}, {edu?.passingYear}
                          <Badge
                            className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums ml-2"
                            variant="outline"
                          >
                            {edu?.result}
                          </Badge>
                        </p>
                      </div>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          )}
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
                    <div className="h-9 w-9 rounded-full overflow-hidden relative ring ring-primary">
                      <Image
                        src={user?.avatar || avatarImage}
                        alt="Profile Picture"
                        fill
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-3 flex-1">
                      <h4 className="font-medium">{user?.fullName}</h4>
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