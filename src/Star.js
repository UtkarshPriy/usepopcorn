import { useState } from "react";
const CointainStyle = {
  display: "flex",
  alignItems: "center",
  gap: "5px",
};
const StarContainerStyle = {
  display: "flex",
  gap: "3px",
};
const msg = ["bad", "average", "okay", "good", "fablous"];
const clr = ["red", "green", "#FFD700"];
function getColor(rating, maxLength) {
  if (rating < maxLength / 3) return clr[0];
  if (rating < maxLength / 2) return clr[1];
  if (rating <= maxLength / 1) return clr[2];
}

export function StarRating({ maxLength, filcolor }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div style={CointainStyle}>
      <div style={StarContainerStyle}>
        {" "}
        {Array.from(
          {
            length: maxLength,
          },
          (_, i) => (
            <StarIcon
              key={i}
              hovered={hover > i}
              filled={rating > i}
              filcolor={getColor(rating, maxLength)}
              onMouseEnter={() => setHover(i + 1)}
              onMouseLeave={() => setHover(0)}
              onClick={() => setRating(i + 1)}
            ></StarIcon>
          )
        )}{" "}
      </div>{" "}
      <p>
        {rating < maxLength / 4
          ? msg[0]
          : rating < maxLength / 3
          ? msg[1]
          : rating < maxLength / 2
          ? msg[2]
          : rating <= maxLength / 1.2
          ? msg[3]
          : rating === maxLength
          ? msg[4]
          : ""}
      </p>
      <p> {rating || ""} </p>{" "}
    </div>
  );
}

const StarIcon = ({
  filled,
  onClick,
  onMouseEnter,
  onMouseLeave,
  hovered,
  filcolor,
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    style={{
      width: "40px",
      height: "40px",
      cursor: "pointer",
    }}
    //  fill="currentColor"
    onClick={onClick}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    fill={hovered || filled ? filcolor : "none"}
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6 text-yellow-600"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.48 3.499a.75.75 0 011.04 0l2.698 2.744 3.757.613a.75.75 0 01.413 1.28l-2.703 2.786.644 3.911a.75.75 0 01-1.094.79L12 14.347l-3.234 1.276a.75.75 0 01-1.094-.79l.644-3.911-2.703-2.786a.75.75 0 01.413-1.28l3.757-.613L11.48 3.5z"
    />
  </svg>
);
