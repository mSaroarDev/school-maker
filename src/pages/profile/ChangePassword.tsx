import { useChangePassword } from "@/api/user/user.hooks";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { handleErrorMessage } from "@/utils/handleErrorMessage";
import { showToast } from "@/utils/showToast";
import { useForm } from "react-hook-form";
import { TbLockPassword } from "react-icons/tb";

const ChangePassword = () => {

  const {mutateAsync: changePassword, isPending: isChangingPassword} = useChangePassword();
  
  const defaultValues = {
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  }
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues
  });

  const onSubmit = async (data: typeof defaultValues) => {
    if(data.newPassword !== data.confirmNewPassword) {
      showToast("error", "New password and confirm new password do not match");
      return;
    }

    try {
      const res = await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      });

      if(res?.success){
        showToast("success", res.message || "Password changed successfully");
      }
    } catch (error) {
      showToast("error", handleErrorMessage(error) || "Failed to change password");
    }
  }

  return (
    <>
      <Card className="col-span-12 lg:col-span-4 h-fit">
        <form className="grid grid-cols-12 gap-2">
          <div className="col-span-12 flex items-center gap-2 mb-3">
            <TbLockPassword size={18} />
            <h2 className="font-medium text-base">Change Password</h2>
          </div>

          <div className="col-span-12">
            <Label>Current Password</Label>
            <Input type="password" />
          </div>

          <div className="col-span-12">
            <Label>New Password</Label>
            <Input type="password" />
          </div>

          <div className="col-span-12">
            <Label>Confirm New Password</Label>
            <Input type="password" />
          </div>

          <div className="col-span-12">
            <Button>
              Update Password
            </Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default ChangePassword;