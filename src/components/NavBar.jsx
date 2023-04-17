import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [selected, setSelected] = useState();

  const buttonClass = (isSelected) =>
    `mx-auto border border-gray-900 px-3.5 py-2.5 rounded-md ml-4 
    ${
      isSelected
        ? "bg-gray-900 text-white"
        : "hover:bg-gray-900 hover:text-white"
    }
    `;

  return (
    <div className="shadow-md p-8 mb-10 flex justify-between items-center">
      <Link
        className="text-3xl font-bold"
        onClick={() => setSelected("home")}
        to="/"
      >
        <h1>Block Explorer</h1>
      </Link>
      <nav className="">
        <Link
          className={buttonClass(selected === "address")}
          onClick={() => setSelected("address")}
          to="/address"
        >
          <button>Search by Address</button>
        </Link>
        <Link
          className={buttonClass(selected === "contract")}
          onClick={() => setSelected("contract")}
          to="/contract"
        >
          <button>Search by Contract</button>
        </Link>
        <Link
          className={buttonClass(selected === "transaction")}
          onClick={() => setSelected("transaction")}
          to="/transaction"
        >
          <button>Search by Transaction</button>
        </Link>
        <Link
          className={buttonClass(selected === "block")}
          onClick={() => setSelected("block")}
          to="/block"
        >
          <button>Search by Block</button>
        </Link>
      </nav>
    </div>
  );
};

export default NavBar;
