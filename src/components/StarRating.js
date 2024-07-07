import { useState } from "react";
import PropTypes from "prop-types";

StarRating.propTypes = {
  maxRating: PropTypes.number,
  defaultRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  messages: PropTypes.array,
  className: PropTypes.string,
  onSetRating: PropTypes.func,
  bgColor: PropTypes.string,
};

export default function StarRating({
  maxRating = 10,
  color = "#fcc419",
  size = 20,
  messages = ["Poor","OK","Good","Nice","Excellent"],
  defaultRating = 0,
  onSetRating,
  bgColor = "#000"
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState("");

  const ratingWrapStyle = {
    display: "flex",
    alignItems: "center",
    // justifyContent: "center",
    padding: "2rem 3rem",
    backgroundColor: bgColor,
    borderRadius: "10px",
    gap: "20px",
  };
  const starsWrapStyle = {
    display: "flex",
  };

  const ratingStyle = {
    fontSize: `${size / 1.3}px`,
    color: color,
    paddingTop: "3px",
  };

  function handleSetRating(rate) {
    setRating(rate);
    onSetRating && onSetRating(rate);
  }

  return (
    <div className="rating__wrap" style={ratingWrapStyle}>
      <div className="stars__wrap" style={starsWrapStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating > i : rating > i}
            handleSetRating={() => handleSetRating(i + 1)}
            handleMouseEnter={() => setTempRating(i + 1)}
            handleMouseLeave={() => setTempRating(0)}
            size={size}
            color={color}
          />
        ))}
      </div>
      <span className="rating" style={ratingStyle}>
        {messages.length === maxRating? messages[tempRating ? tempRating-1 : rating-1] : tempRating || rating || "NR"}
      </span>
    </div>
  );
}

function Star({
  full,
  handleSetRating,
  handleMouseEnter,
  handleMouseLeave,
  size,
  color,
}) {
  const starStyle = {
    height: `${size}px`,
    width: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      className="star"
      style={starStyle}
      onClick={handleSetRating}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          //   fill="yellow"
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )}
    </span>
  );
}
