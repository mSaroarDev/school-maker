"use client";
import { useCreateTask, useGetTasks } from "@/api/tasks/tasks.hooks";
import { TTask } from "@/api/tasks/tasks.types";
import { useGetAllTeachers } from "@/api/teachers/teachers.hooks";
import { TTeacherPayloadTeacher } from "@/api/teachers/teachers.interfaces";
import Drawer from "@/components/_core/Drawer";
import ErrorLabel from "@/components/_core/ErrorLabel";
import HeaderComponent from "@/components/_core/HeaderComponent";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectComponent from "@/components/ui/select";
import { colorsPairs } from "@/constants/colors";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showToast } from "@/utils/showToast";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { components } from "react-select";
import { OptionProps } from "react-select";
import TaskCard from "./TaskCard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { addTask } from "@/redux/features/tasks/tasks.slice";

type OptionsType = {
  label: string;
  value: string | number;
  avatar?: string;
  empId?: string;
}

const TasksMain = () => {
  const [showDrawer, setShowDrawer] = useState(false);

  const dispatch = useAppDispatch();
  const { data: teachers, isPending } = useGetAllTeachers({
    currPage: 1,
    limit: 500,
  });

  const defaultValues = {
    taskName: "",
    taskFor: [],
  };
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    defaultValues,
  });

  const renderCustomOptions = (option: OptionProps<OptionsType, boolean>) => {
    return (
      <components.Option {...option} className="p-0">
        <div className="flex items-center gap-2 px-4 py-2 mb-1 last:mb-0 hover:bg-slate-100 rounded cursor-pointer">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full relative bg-slate-200 flex items-center justify-center overflow-hidden">
              {option?.data?.avatar && option?.data?.avatar !== "" && (
                <Image
                  src={option?.data?.avatar || "/default-avatar.png"}
                  alt="avatar"
                  fill
                />
              )}
            </div>
            <div>
              <p className="text-sm font-medium">{option?.label}</p>
              <p className="text-xs text-slate-500">ID: {option?.data?.empId}</p>
            </div>
          </div>
        </div>
      </components.Option>
    );
  };

  const colorPalettes = useMemo(() => colorsPairs, []);

  const { isPending: isLoadingTasks } = useGetTasks();
  const { myTasks } = useAppSelector(state => state.tasks);

  const { mutateAsync: createTask, isPending: isCreating } = useCreateTask();
  const onSubmit = async (data: TTask) => {
    try {
      const res = await createTask({
        taskName: data.taskName,
        taskFor: data.taskFor
      });

      if (res?.success) {
        showToast("success", res?.message || "Task created successfully");
        dispatch(addTask(res.data));
        setShowDrawer(false);
        reset();
      }
    } catch (error) {
      showToast("error", handleErrorMessage(error) || "Failed to create task");
    }
  }

  return (
    <>
      <Card className="mb-5">
        <HeaderComponent
          title="Tasks"
          createButtonFunction={() => setShowDrawer(true)}
        />

        <div className="mt-5 max-h-[400px] overflow-y-auto pr-2">
          {!isLoadingTasks && myTasks?.map((task: TTask, index: number) => {
            const selectedColor = colorPalettes[Number(index) % colorPalettes.length];

            return (
              <TaskCard
                key={task._id}
                data={task}
                selectedColor={selectedColor}
              />
            )
          })}
        </div>
      </Card>

      {showDrawer && (
        <Drawer
          title="Create Task"
          description="Create a new task and assign to students."
          showModal={showDrawer}
          setShowModal={setShowDrawer}
          isSubmitting={isSubmitting || isCreating}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label>Task Name</Label>
            <Input
              {...register("taskName", { required: "Task Name is required" })}
              placeholder="Enter task taskFor"
              className={errors.taskName ? "border-red-500" : "border-slate-300"}
            />
            {errors.taskName && (
              <ErrorLabel msg={errors.taskName.message as string} />
            )}
          </div>
          <div>
            <Label>Task for</Label>
            {isPending && <div>Loading...</div>}
            {!isPending && teachers?.data?.length === 0 && <div>No teachers found</div>}
            <SelectComponent
              control={control}
              name="taskFor"
              options={teachers?.data?.map((teacher: TTeacherPayloadTeacher) => ({
                label: teacher.fullName,
                value: teacher._id,
                avatar: teacher.avatar,
                empId: teacher.employeeId,
              })) || []}
              isMulti
              placeholder="Select teachers"
              rules={{ required: "Select at least one teacher" }}
              errors={errors}
              components={{ Option: renderCustomOptions }}
            />
          </div>
        </Drawer>
      )}
    </>
  );
};

export default TasksMain;