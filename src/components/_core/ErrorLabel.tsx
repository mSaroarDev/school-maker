type ErrorLabelProps = {
    msg?: string;
}

const ErrorLabel = ({
  msg
}: ErrorLabelProps) => {
    return (
        <>
            <span className="text-xs text-red-500">{msg as string || "This field is required"}</span>
        </>
    );
};

export default ErrorLabel;