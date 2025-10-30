import { TTransactions } from "@/api/finance/finance.types";
// import avatar from "@/assets/images/avatar.jpeg";
// import RenderStatus from "@/components/_core/RenderStatus";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger
// } from "@/components/ui/dropdown-menu";
// import Image from "next/image";
// import { BiSolidEdit } from "react-icons/bi";
// import { FiEye } from "react-icons/fi";
// import { MdMoreVert } from "react-icons/md";

export const salaryDueListColumns = () => [
  {
    name: "Sl.",
    width: "50px",
    selector: (_: TTransactions, index: number) => index + 1,
  },
  // {
  //   name: "Employee Name",
  //   cell: (row: TTransactions) => (
  //     <div className="flex items-center gap-3">
  //       <div className="w-10 h-10 rounded overflow-hidden relative">
  //         <Image
  //           fill
  //           src={avatar}
  //           alt="avatar"
  //           className="w-full h-full object-cover"
  //         />
  //       </div>
  //       <div>
  //         <h4 className="font-medium mb-0.5">
  //           {typeof row?.employeeId === "object" && row?.employeeId !== null
  //             ? row.employeeId.fullName
  //             : "N/A"}
  //         </h4>
  //         <p>
  //           {typeof row?.employeeId === "object" && row?.employeeId !== null
  //             ? `${row.employeeId._id}`
  //             : "N/A"}
  //         </p>
  //       </div>
  //     </div>
  //   )
  // },
  // {
  //   name: "Designation",
  //   selector: (row: TTransactions) => typeof row?.employeeId === "object" && row?.employeeId !== null
  //     ? `${row.employeeId.designation}`
  //     : "N/A"
  // },
  // {
  //   name: "Base Salary",
  //   cell: (row: TTransactions) => (
  //     <div>
  //       ৳50,000
  //     </div>
  //   ),
  // },
  // {
  //   name: "Other Allowance",
  //   cell: (row: TTransactions) => (
  //     <div>
  //       ৳5,000
  //     </div>
  //   ),
  // },
  // {
  //   name: "Total",
  //   cell: (row: TTransactions) => (
  //     <div>
  //       {`৳${(50000 + 5000).toLocaleString()}`}
  //     </div>
  //   ),
  // }, {
  //   name: "Month",
  //   cell: (row: TTransactions) => (
  //     <div>
  //       January
  //     </div>
  //   ),
  // },
  // {
  //   name: "Status",
  //   cell: (row: TTransactions) => <RenderStatus status="due" />,
  // },
  // {
  //   name: "Action",
  //   width: "100px",
  //   cell: (row: TTransactions) => (
  //     <DropdownMenu>
  //       <DropdownMenuTrigger className="more-action-button">
  //         <MdMoreVert size={20} />
  //       </DropdownMenuTrigger>
  //       <DropdownMenuContent>
  //         <DropdownMenuLabel>Action</DropdownMenuLabel>
  //         <DropdownMenuSeparator />
  //         <DropdownMenuItem
  //           className="cursor-pointer"
  //           onClick={() => window.open(`/reciept/${row?._id}`, "_blank")}
  //         >
  //           <FiEye size={18} /> View Reciept
  //         </DropdownMenuItem>
  //         <DropdownMenuItem
  //           className="cursor-pointer"
  //         onClick={() => setShowUpdateModal(true)}
  //         >
  //           <BiSolidEdit size={18} /> Update Status
  //         </DropdownMenuItem>

  //       </DropdownMenuContent>
  //     </DropdownMenu>
  //   )
  // }
];