import Swal from 'sweetalert2';

interface IConfirmModalProps {
  title?: string;
  text?: string;
  confirmText?: string;
  cancelText?: string;
  func: () => void;
  target?: HTMLElement | string;
};

export const showConfirmModal = ({ title, text, confirmText, cancelText, func, target }: IConfirmModalProps) => {

  const renderText = () => {
    switch (text) {
      case "delete":
        return "Are you sure you want to delete this trainer?";
      case "move-to-trash":
        return "Are you sure you want to move to trash?";
      case "save":
        return "Are you sure you want to save the data?";
      default:
        return text;
    }
  }

  Swal.fire({
    title: title || "Comfirm?",
    text: renderText(),
    confirmButtonColor: "var(--color-primary)",
    cancelButtonColor: "#d33",
    showCancelButton: true,
    confirmButtonText: confirmText || "Yes, Save it",
    denyButtonText: cancelText || `Don't save`,
    icon: "question",
    target: target || document.body,
  }).then((result) => {
    if (result.isConfirmed) {
      return func();
    }
  });
}