"use client";
import { useGetAllClasses } from "@/api/class/class.hooks";
import { useGetAllSections } from "@/api/sections/section.hooks";
import { TSection } from "@/api/sections/sections.types";
import { useGetAllSessions } from "@/api/session/sessions.hooks";
import { useGetStudentById } from "@/api/students/students.hooks";
import BreadcrumbsComponent from "@/components/_core/BreadcrumbsComponent";
import Image from "next/image";
import { useParams } from "next/navigation";
import moment from "moment";
import RenderStatus from "@/components/_core/RenderStatus";
import Card from "@/components/ui/card";
import { IoCardOutline } from "react-icons/io5";
import { MdHistory } from "react-icons/md";
import avatarImage from "@/assets/images/avatar.jpeg";

const StudentProfile = () => {
  const params = useParams();
  const studentId = params ? params.studentId : null;

  const breadTree = [
    { name: "Student Profile" },
    { name: "Home", url: "/dashboard" },
    { name: "Students", url: "/dashboard/students" },
    { name: "Saroar Jahan" },
  ];

  const { data: student, isPending } = useGetStudentById({
    studentId: studentId as string,
    options: {
      enabled: !!studentId,
    },
  });

  const { data: classes } = useGetAllClasses();
  const { data: sections } = useGetAllSections();
  const { data: sessions } = useGetAllSessions();


  return (
    <>
      <div>
        <BreadcrumbsComponent breadTree={breadTree} showBackButton />
      </div>

      <div className="mt-5 grid grid-cols-12 gap-5">
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
          <Card className="grid grid-cols-12 gap-5">
            <div className="col-span-12 flex items-center gap-5">
              <div className="w-32 h-32 relative rounded-lg overflow-hidden border border-gray-300">
                <Image
                  src={student?.data?.avatar || avatarImage}
                  alt="Student Avatar"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-medium mb-2">{student?.data?.fullName}</h2>
                <p className="text-gray-600 py-0.5">
                  Class: {
                    classes?.data?.find(cls => cls?._id === student?.data?.class)?.displayName || "N/A"
                  }
                  {" "} | Section: {
                    sections?.data?.find((sec: TSection) => sec?._id === student?.data?.section)?.sectionName || "N/A"
                  }
                  {" "} | Roll No: {student?.data?.rollNo || "N/A"}
                </p>

                <p className="text-gray-600 py-0.5">Date of Birth: {moment(student?.data?.basicInformation?.dateOfBirth).format("DD MMM, YYYY")}</p>
                <p className="text-gray-600 pt-0.5"><RenderStatus status={student?.data?.status} /></p>
              </div>
            </div>
            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="h-60 w-full bg-slate-100 rounded-lg"></div>
              <div className="h-60 w-full bg-slate-100 rounded-lg"></div>
            </div>

            <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="h-40 w-full bg-slate-100 rounded-lg"></div>
              <div className="h-40 w-full bg-slate-100 rounded-lg"></div>
            </div>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-4 lg:col-span-3">
          <Card>
            <div>
              <h3 className="flex items-center gap-2 font-medium text-base mb-5">
                <IoCardOutline size={18} className="flex-shrink-0" />
                Payment History
              </h3>
              <div className="flex items-center justify-center">
                No payments
              </div>
            </div>
          </Card>

          <Card className="mt-5">
            <div>
              <h3 className="flex items-center gap-2 font-medium text-base mb-5">
                <MdHistory size={18} className="flex-shrink-0" />
                Class History
              </h3>
              <div className="flex items-center justify-center">
                No History
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default StudentProfile;