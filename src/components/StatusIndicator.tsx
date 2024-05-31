import { StatusIndicatorProp } from "../utils/types";

const StatusIndicator = ({ status }: StatusIndicatorProp) => {
  const bgColor =
    status === `Alive`
      ? `rgb(85, 204, 68)`
      : status === "Dead"
      ? "rgb(214, 61, 46)"
      : "rgb(158, 158, 158)";

  return (
    <span
      className={` h-2 w-2 rounded-full`}
      style={{ backgroundColor: bgColor }}
    ></span>
  );
};

export default StatusIndicator;
