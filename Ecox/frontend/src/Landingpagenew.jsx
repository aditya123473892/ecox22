// src/Landingpagenew.js
import React from "react";
import "./Components/landing.css";

import landingimage from "./assets/landingimage.jpg";
import Example from "./Components/NewNav";
import betwqeen12 from "./assets/betwqeen 12.jpg";
import btweenimage from "./assets/btween image.jpg";
import Iamge12 from "./assets/image copy 3.png";
import Image13 from "./assets/image copy.png";
import Learn from "./assets/learn.jpg";
import Industry from "./assets/image copy 7.png";
import PersonalCarbon from "./assets/image copy 5.png";
import Auditor from "./assets/image copy 6.png";
import MarketPlace from "./assets/market place.jpg";
const Landingpagenew = () => {
  return (
    <div>
      <section className="home" id="home" style={{ position: "relative" }}>
        <img
          src={landingimage}
          alt="Landing"
          className="home__img"
          style={{ width: "100%" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 0,
            height: "100%",
          }}
        ></div>
        <div
          className="home__container container grid"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div className="home__data">
            <h1
              className="home__data-title"
              style={{
                color: "white",
              }}
            >
              EcoXange :Your <br /> Partner{" "}
              <b>
                In <br /> Carbon Neutrality
              </b>
            </h1>
          </div>
        </div>
      </section>

      <section
        className="about section"
        id="about"
        style={{ marginTop: "100px" }}
      >
        <div className="about__container container grid">
          <div className="about__data">
            <h2 className="section__title about__title">
              Introducing the EcoXange Ecosystem. <br /> A transparent way to
              finance sustainable projects
            </h2>
            <p className="about__description"></p>
            <a href="#" className="button">
              Explore
            </a>
          </div>

          <div className="about__img">
            <div className="about__img-overlay">
              <img src={betwqeen12} alt="" className="about__img-one" />
            </div>

            <div className="about__img-overlay">
              <img src={btweenimage} alt="" className="about__img-two" />
            </div>
          </div>
        </div>
      </section>
      <section class="experience section">
        <h2 class="section__title">
          A confident step in the right direction.
          <br />
        </h2>

        <div class="experience__container container grid">
          <div class="experience__content grid">
            <div class="experience__data">
              {/* <h2 class="experience__number">20</h2>
              <span class="experience__description">
                Year <br /> Experience
              </span> */}
            </div>

            <div class="experience__data">
              {/* <h2 class="experience__number">75</h2>
              <span class="experience__description">
                Complete <br /> tours
              </span> */}
            </div>

            <div class="experience__data">
              {/* <h2 class="experience__number">650+</h2>
              <span class="experience__description">
                Tourist <br /> Destination
              </span> */}
            </div>
          </div>

          <div class="experience__img grid">
            <div class="experience__overlay">
              <img src={Iamge12} alt="" class="experience__img-one" />
            </div>

            <div class="experience__overlay">
              <img src={Image13} alt="" class="experience__img-two" />
            </div>
          </div>
        </div>
      </section>

      <section class="place section" id="place">
        <h2 class="section__title">How to be part of EcoXange.</h2>

        <div class="place__container container grid">
          <div class="place__card">
            <img src={MarketPlace} alt="" class="place__img" />

            <div class="place__content">
              <span class="place__rating">
                <i class="ri-star-line place__rating-icon"></i>
                <span class="place__rating-number"></span>
              </span>

              <div class="place__data">
                <h3 class="place__title text-black font-bold">MarketPlace</h3>
                <span class="place__subtitle"></span>
                <span class="place__price"></span>
              </div>
            </div>

            <button class="button button--flex place__button">
              <i class="ri-arrow-right-line"></i>
            </button>
          </div>

          <div class="place__card">
            <img src={Auditor} alt="" class="place__img" />

            <div class="place__content">
              <span class="place__rating">
                <i class="ri-star-line place__rating-icon"></i>
                <span class="place__rating-number"></span>
              </span>

              <div class="place__data">
                <h3 class="place__title text-black font-bold">Auditor</h3>
                <span class="place__subtitle"></span>
                <span class="place__price"></span>
              </div>
            </div>

            <button class="button button--flex place__button">
              <i class="ri-arrow-right-line"></i>
            </button>
          </div>

          <div class="place__card">
            <img src={PersonalCarbon} alt="" class="place__img" />

            <div class="place__content">
              <span class="place__rating">
                <i class="ri-star-line place__rating-icon"></i>
                <span class="place__rating-number"></span>
              </span>

              <div class="place__data">
                <h3 class="place__title text-black font-bold">
                  Carbon Calculator
                </h3>
                <span class="place__subtitle"></span>
                <span class="place__price"></span>
              </div>
            </div>

            <button class="button button--flex place__button">
              <i class="ri-arrow-right-line"></i>
            </button>
          </div>

          <div class="place__card">
            <img src={Industry} alt="" class="place__img" />

            <div class="place__content">
              <span class="place__rating">
                <i class="ri-star-line place__rating-icon"></i>
                <span class="place__rating-number"></span>
              </span>

              <div class="place__data">
                <h3 class="place__title text-black font-bold">
                  Register as Product Owner
                </h3>
                <span class="place__subtitle"></span>
                <span class="place__price"></span>
              </div>
            </div>

            <button class="button button--flex place__button">
              <i class="ri-arrow-right-line"></i>
            </button>
          </div>

          <div class="place__card">
            <img src={Learn} alt="" class="place__img" />

            <div class="place__content">
              <span class="place__rating">
                <i class="ri-star-line place__rating-icon"></i>
                <span class="place__rating-number"></span>
              </span>

              <div class="place__data">
                <h3 class="place__title text-black font-bold">Learn</h3>
                <span class="place__subtitle"></span>
                <span class="place__price"></span>
              </div>
            </div>

            <button class="button button--flex place__button">
              <i class="ri-arrow-right-line"></i>
            </button>
          </div>
        </div>
      </section>
      <section class="subscribe section">
        <div class="subscribe__bg">
          <div class="subscribe__container container">
            <h2 class="section__title subscribe__title">
              Subscribe Our <br /> Newsletter
            </h2>
            <p class="subscribe__description">
              Subscribe to our newsletter and get a special 30% discount.
            </p>

            <form action="" class="subscribe__form">
              <input
                type="text"
                placeholder="Enter email"
                class="subscribe__input"
              />

              <button class="button">Subscribe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landingpagenew;
