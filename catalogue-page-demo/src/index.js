import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  return (
    <>
      <div className="app">
        <Header />
        <Menu />
      </div>
      <Footer />
    </>
  );
}

function Header() {
  return <h1 className="header"> -- Fake Store Co. -- </h1>;
}

function Footer() {
  return (
    <footer>{new Date().toLocaleDateString()}. We are currently open.</footer>
  );
}

function Menu() {
  const [data, setData] = React.useState([]);
  function fetchData() {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((json_data) => setData(json_data))
      .catch((err) => {
        console.log("Error fetching data: ", err);
      });
  }
  useEffect(fetchData, [data]);
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      {data.length === 0 ? (
        <p className="itemsText">
          Extemely sorry for the inconvience. <br />
          We are working on getting our catalogue ready. <br />
          Please come back later.
        </p>
      ) : (
        <>
          <p className="itemsText">
            Welcome to FakeStore 🛒 Real products, fake shopping, zero damage to
            your wallet.
          </p>
          <ul className="items">
            {data.map((item) => (
              <Item
                imageUrl={item.image}
                title={item.title}
                description={item.description}
                price={`$${item.price.toFixed(2)}`}
                isSoldOut={item.count === 0}
                key={item.id}
              />
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function Item({ description, title, imageUrl, price, isSoldOut }) {
  let _description =
    description.length > 230 ? `${description.slice(0, 225)} ...` : description;

  let _title = title.length > 45 ? `${title.slice(0, 40)} ...` : title;

  return (
    <li className={`item ${isSoldOut ? "sold-out" : "available"}`}>
      <img
        src={imageUrl}
        alt="Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
      />
      <div>
        <h3>{_title}</h3>
        <p>{_description}</p>
        <span>{isSoldOut ? "SOLD OUT" : price}</span>
      </div>
    </li>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
