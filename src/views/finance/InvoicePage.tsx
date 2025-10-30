"use client";
import { useGetTransactionById } from "@/api/finance/finance.hooks";
import RenderStatus from "@/components/_core/RenderStatus";
import { useParams } from "next/navigation";

const InvoiceMain = () => {
  const params = useParams();
  const id = params.id as string;

  const { data } = useGetTransactionById(id);
  console.log("invoice data:", data);

  return (
    <>
      <div className="w-full p-10">
        <div className="w-full max-w-6xl mx-auto shadow-md p-8 relative bg-white">
          <div className="">
            <div>
              {data?.data?.studentId?.fullName ? (
                <div>
                  <p className="font-semibold">St. Name: {data?.data?.studentId?.fullName}</p>
                  <p><span className="font-semibold">ID:</span>{data?.data?.studentId?.studentId}</p>
                  <p><span className="font-semibold">Class:</span> {data?.data?.studentId?.class?.displayName}</p>
                </div>
              ) : (
                <div className="h-18">

                </div>
              )}


              <div className="flex items-center justify-between">
                <div className="my-10">
                  <p><span className="font-semibold">Invoice Type:</span> {data?.data?.type === "due" ? "Payment/Income" : data?.data?.type}</p>
                  <p><span className="font-semibold">Category:</span> {data?.data?.category?.categoryName}</p>
                  <p className="capitalize"><span className="font-semibold">Title:</span> {data?.data?.title}</p>
                </div>

                <div>
                  <p className="text-right"><span className="font-semibold">Tranferred From:</span> {data?.data?.transferedFrom}</p>
                  <p className="text-right"><span className="font-semibold">Tranferred To:</span> {data?.data?.transferedTo}</p>
                  <p className="text-right"><span className="font-semibold">Payment Method:</span> {data?.data?.paymentMethod || "N/A"}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <p>Status:</p>
                <RenderStatus status={data?.data?.status} />
              </div>
            </div>
          </div>

          <div className="absolute top-8 right-8">
            <h2 className="text-5xl font-semibold text-right">INVOICE</h2>
            <p className="text-right">ABC school and college</p>
          </div>

          <div className="mt-5">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2 w-[10%]">SL</th>
                  <th className="border border-gray-300">Description</th>
                  <th className="border border-gray-300 w-[20%] text-right px-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.amounts?.map((item: {title: string; amount: number;}, index: number) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-1 w-[10%] text-center">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-1">{item?.title}</td>
                    <td className="border border-gray-300 px-4 py-1 w-[20%] text-right">৳{item?.amount}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={2} className="px-4 py-1 text-right">Sub Total: </td>
                  <td colSpan={1} className="px-4 py-1 text-right">
                    ৳{data?.data?.amounts?.reduce((sum: number, item: {amount: number})=> sum + item.amount, 0)}
                  </td>
                </tr>
                <tr>
                  <td colSpan={2} className="px-4 py-1 text-right ">Discount: </td>
                  <td colSpan={1} className="px-4 py-1 text-right border-b border-gray-300">0</td>
                </tr>
                <tr>
                  <td colSpan={2} className="px-4 py-1 text-right font-bold">Total: </td>
                  <td colSpan={1} className="px-4 py-1 text-right font-bold">
                    ৳{data?.data?.amounts?.reduce((sum: number, item: {amount: number})=> sum + item.amount, 0)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-24 flex items-center justify-end">
            <div className="border-t border-black">
              <p className="font-bold text-center">Authorized Signatory</p>
              <p className="text-center">{`(Taher)`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceMain;