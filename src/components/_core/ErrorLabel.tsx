type ErrorLabelProps = {
    msg: string;
}

const ErrorLabel = ({
  msg
}: ErrorLabelProps) => {
    return (
        <>
            <span className="text-xs text-red-500">{msg}</span>
        </>
    );
};

export default ErrorLabel;