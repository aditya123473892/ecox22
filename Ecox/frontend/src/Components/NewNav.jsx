import { Disclosure } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "../store/data-slice";
import ecox from "../assets/ecox.png"; // Import the ecox logo
import metamask from "../assets/metamask.png";
import "../Components/landing.css";
import { color } from "framer-motion";
import { useRef } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const dispatch = useDispatch();
  const walletAddress = useSelector((state) => state.data.walletAddress);

  const connectWallet = async () => {
    console.log("Requesting account...");

    if (window.ethereum) {
      console.log("MetaMask detected");

      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        dispatch(dataActions.setWalletAddress(accounts[0]));
      } catch (error) {
        console.log("Error connecting...");
      }
    } else {
      alert("Meta Mask not detected");
    }
  };

  const connectWalletRef = useRef();
  const navigate = useNavigate();
  return (
    <div>
      <header className="header" id="header">
        <nav className="nav container">
          <NavLink to={"/"} className="nav__logo">
            <img src={ecox} alt="Ecox Logo" className="logo" />{" "}
            {/* Replace text with image */}
          </NavLink>

          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list" style={{ color: "black" }}>
              <li className="nav__item">
                <NavLink
                  to="/tokens"
                  className="nav__link active-link"
                  style={{ color: "black" }}
                >
                  MarketPlace
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/auditor"
                  className="nav__link"
                  style={{ color: "black" }}
                >
                  Register Auditor
                </NavLink>
              </li>
              <li className="nav__item">
                <NavLink
                  to="/calculate"
                  className="nav__link"
                  style={{ color: "black" }}
                >
                  Personal Carbon
                </NavLink>
              </li>
              <li className="nav__item">
                <a
                  href="/register"
                  className="nav__link"
                  style={{ color: "black" }}
                >
                  List carbon Credits
                </a>
              </li>
              <li className="nav__item">
                <a
                  href="/learn"
                  className="nav__link"
                  style={{ color: "black" }}
                >
                  Learn
                </a>
              </li>
            </ul>

            <i
              className="ri-close-line nav__close"
              id="nav-close"
              style={{ color: "black" }}
            ></i>
          </div>

          <div className="nav__toggle" id="nav-toggle">
            <i className="ri-function-line" style={{ color: "black" }}></i>
          </div>
          <main></main>
          {/* <button
      onClick={connectWallet}
      style={{
        color: "white",
        backgroundColor: "blue",
        borderRadius: "12px",
        height: "40px",
        width: "180px",
      }}
    >
      Connect Wallet
    </button> */}

          {!walletAddress && (
            <button
              style={{ color: "black" }}
              className=""
              onClick={connectWallet}
              ref={connectWalletRef}
            >
              <img src={metamask} className="w-15" />
            </button>
          )}
          {walletAddress && (
            <button
              className="whitespace-nowrap"
              onClick={() => {
                navigate("/myBalance");
              }}
              style={{ color: "black" }}
            >
              {walletAddress}
            </button>
          )}
        </nav>
      </header>
    </div>
  );
}
