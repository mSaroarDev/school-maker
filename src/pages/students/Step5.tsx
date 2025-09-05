import { TStudentsCreatePayload } from "@/api/students/teachers.interfaces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "flatpickr/dist/themes/light.css";
import { CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import { Control, FieldErrors, useFieldArray, UseFormRegister, UseFormSetValue } from "react-hook-form";
import { BiPlus } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { IoArrowBack, IoArrowForwardSharp } from "react-icons/io5";
import { MdOutlineEditNote, MdOutlineRemoveRedEye } from "react-icons/md";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";

type Step5Props = {
  setStep: (step: number) => void;
  control: Control<TStudentsCreatePayload>;
  errors?: FieldErrors<TStudentsCreatePayload>;
  register: UseFormRegister<TStudentsCreatePayload>;
  setValue: UseFormSetValue<TStudentsCreatePayload>;
  getValues: () => TStudentsCreatePayload;
  handleSubmit: (fn: (data: TStudentsCreatePayload) => void) => (e?: React.BaseSyntheticEvent) => void;
}

const Step5 = ({
  setStep,
  control,
  register,
  setValue,
  getValues,
  handleSubmit
}: Step5Props) => {
  const { append, remove } = useFieldArray({
    control,
    name: "documents"
  });

  const [documents, setDocuments] = useState<{ documentName: string; documentUrl: string }[]>(getValues().documents || []);
  const onSubmit = (data: TStudentsCreatePayload) => {
    console.log("Form Data Submitted: ", data);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h3 className="font-medium text-lg flex items-center gap-2">
        <MdOutlineEditNote size={25} />
        Document Upload
      </h3>

      <div className="mt-2 mb-5">
        <table className="w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">Document Name</th>
              <th className="border px-4 py-2">Upload</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {getValues().documents?.map((doc, index) => (
              <tr key={index}>
                <td className="border text-center">
                  <Input
                    {...register(`documents.${index}.documentName` as const, { required: "Document Name is required" })}
                    placeholder="e.g. Birth Certificate"
                    defaultValue={doc?.documentName}
                    className="border-0"
                    disabled={!doc?.documentUrl}
                  />
                </td>
                <td className="border text-center">
                  {!doc?.documentUrl ? (

                    <CldUploadButton
                      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                      options={{ maxFiles: 1, singleUploadAutoClose: false, sources: ["local", "google_drive"] }}
                      onSuccess={(result) => {
                        if (typeof result.info === "object" && "secure_url" in result.info) {
                          const url = (result.info as { secure_url: string }).secure_url || "";
                          const name = (result.info as { original_filename: string }).original_filename || "";
                          const newDocuments = [...documents];
                          newDocuments[index] = { documentName: name, documentUrl: url };
                          setDocuments(newDocuments);
                          setValue(`documents.${index}.documentUrl` as const, url);
                          setValue(`documents.${index}.documentName` as const, name);
                        } else {
                          setValue(`documents.${index}.documentUrl` as const, "");
                          setValue(`documents.${index}.documentName` as const, "");
                        }
                      }}
                      onError={(error) => {
                        console.error("Upload Error: ", error);
                      }}
                      className="cursor-pointer"
                    >
                      <span className="w-full flex items-center gap-2"><RiUploadCloud2Fill size={14} />Upload</span>
                    </CldUploadButton>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <Button
                        size="icon"
                        className="bg-green-500 text-white"
                        onClick={() => window.open(doc.documentUrl, "_blank")?.focus()}
                      >
                        <MdOutlineRemoveRedEye size={20} />
                      </Button>
                      <Button
                        className="bg-red-500 text-white"
                        size="icon"
                        onClick={() => {
                          setDocuments((prev) => prev.filter((_, docIndex) => docIndex !== index));
                          // remove the state and show upload button
                          setValue(`documents.${index}.documentUrl` as const, "");
                        }}
                      >
                        <HiOutlineTrash size={18} />
                      </Button>
                    </div>
                  )}
                </td>
                <td className="border text-center w-10">
                  <RxCross2
                    size={20}
                    className="mx-auto text-red-500 cursor-pointer"
                    onClick={() => remove(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-right mt-2">
          <Button
            onClick={() => {
              append({
                documentName: "", 
                documentUrl: ""
              });
            }}
            variant="outline"
          >
            <BiPlus /> Add More
          </Button>
        </div>
      </div >

      <div className="flex items-center justify-between mt-5">
        <Button type="button" onClick={() => setStep(4)} variant="outline"><IoArrowBack size={18} /> Previous</Button>
        <Button type="submit">Next <IoArrowForwardSharp size={18} /></Button>
      </div>
    </form>
  );
};

export default Step5;