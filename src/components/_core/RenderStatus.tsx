export const colors = {
    active: "#6ABF2F",
    paid: "#6ABF2F",
    Paid: "#6ABF2F",
    available: "#6ABF2F",
    unavailable: "#AA3C4B",
    unpaid: "#AA3C4B",
    Unpaid: "#AA3C4B",
    Due: "#AA3C4B",
    passed: "#6ABF2F",
    Passed: "#6ABF2F",
    accepted: "#6ABF2F",
    approved: "#6ABF2F",
    running: "#6ABF2F",
    inactive: "#AA3C4B",
    blocked: "#AA3C4B",
    rejected: "#AA3C4B",
    "not verified": "#AA3C4B",
    sold: "#AA3C4B",
    success: "#6ABF2F",
    sent: "#6ABF2F",
    upcoming: "#F9D32C",  
    Upcoming: "#F9D32C",  
    pending: "#F9D32C",  
    "under-review": "#F9D32C",  
    "not-paid": "#F9D32C",
    reserved: "#F9D32C",
    due: "#AA3C4B",
    expired: "#AA3C4B",
    error: "#AA3C4B",
    failed: "#AA3C4B",
    finished: "#AA3C4B",
    terminated: "#AA3C4B",
    disabled: "#333",
    "checked out": "#333",
  } as const;

  export type StatusKey = keyof typeof colors;

export interface IRenderStatusProps {
  status: StatusKey;
  size?: number;
  styles?: React.CSSProperties;
}

const RenderStatus = ({status, size, styles}: IRenderStatusProps) => {

  const getBackgroundColor = (hexColor: string) => {
    return `${hexColor}18`;
  };

  const getTextColor = (status: IRenderStatusProps["status"]) => {
    if (status === "upcoming" || status === "under-review" || status === "pending" || status === "not-paid") {
      return "#b1a900";
    }
    return colors[status] as string;
  };

  return (
    <>
      <span style={{ 
        backgroundColor: getBackgroundColor(colors[status]),
        color: getTextColor(status),
        padding: "5px 10px", 
        borderRadius: "5px", 
        textTransform: "uppercase", 
        fontSize: size ? `${size}px` : "10px",
        fontWeight: "600",
        display: "flex",
        alignItems: "center",
        gap: 5,
        ...styles 
      }}
      >
        <span
          style={{
            backgroundColor: getTextColor(status),
            height: 6,
            width: 6,
            content: "",
            borderRadius: "50%"
          }}
        ></span>
        {status}
      </span>
    </>
  );
};

export default RenderStatus;