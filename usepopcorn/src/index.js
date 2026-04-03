import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

console.log(<StarRating />);

function Star() {
  const [rating, setRating] = React.useState(0);

  const [maxRating, setMaxRating] = React.useState(5);

  return (
    <>
      <input
        type="number"
        value={maxRating}
        onChange={(e) => setMaxRating(Number(e.target.value))}
      />
      <StarRating
        maxRating={maxRating}
        onSetRating={setRating}
        messages={["Poor", "Fair", "Good", "Very Good", "Excellent"]}
      />

      <p>Rating: {rating}</p>
    </>
  );
}
