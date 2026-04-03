import { useState } from "react";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
};

const startContainerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "0.2rem",
};

export default function StarRating({
  maxRating = 5,
  onSetRating = () => {},
  className = "",
  color = "#fcc419",
  messages = [],
  height = 48,
}) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  function handleRatingChange(newRating) {
    console.log(`Rating changed to ${newRating}`);
    setRating(newRating);
    onSetRating(newRating);
  }

  function handleHoverRatingChange(newRating) {
    console.log(`Hover rating changed to ${newRating}`);
    setHoverRating(newRating);
  }
  const textStyle = {
    lineHeight: `${height}px`,
    fontSize: `${height / 2.5}px`,
    margin: 0,
  };
  const ratingToDisplay = hoverRating || rating;
  const message_to_display =
    ratingToDisplay <= messages.length
      ? messages[ratingToDisplay - 1]
      : ratingToDisplay;
  return (
    <div style={containerStyle} className={className}>
      <div style={startContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRatingChange={() => handleRatingChange(i + 1)}
            filled={hoverRating ? hoverRating > i : rating > i}
            onMouseEnter={() => handleHoverRatingChange(i + 1)}
            onMouseLeave={() => handleHoverRatingChange(0)}
            color={color}
            height={height}
          />
        ))}
      </div>
      <p style={textStyle}>{message_to_display}</p>
    </div>
  );
}

function Star({
  onRatingChange,
  filled,
  onMouseEnter,
  onMouseLeave,
  color,
  height,
}) {
  const startStyle = {
    "--length": `${height}px`,
    height: "var(--length)",
    width: "var(--length)",
    display: "block",
    cursor: "pointer",
    color,
  };

  return (
    <span
      style={startStyle}
      onClick={onRatingChange}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="button"
    >
      <svg
        style={{ transition: "0.2s ease-in-out" }}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill={filled ? color : "#fff"}
        stroke={color}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    </span>
  );
}
