import React from "react";

import rgpvLogo from "../../assets/images/RGPVLOGO.jpeg";
import demo from "../../assets/images/Landscape-Color.jpg";
import tcs from "../../assets/images/tcs.png";
import infosys from "../../assets/images/Infosys.png";
import kanwat from "../../assets/images/kanwat.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { Link } from "react-router-dom";

import "./Home.css";
import Card from "../../components/Card/Card";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Home = () => {
  return (
    <div className="home-page #home">
      <div className="home-hero">
        <div className="home-hero-info">
          <div className="home-hero-info-content">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum,
              facilis ut autem vel ipsum sit voluptate provident laudantium
              perspiciatis suscipit. Pariatur distinctio doloribus sed eligendi
              nostrum aliquam sapiente illo aspernatur. Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Eos, harum. Quibusdam nulla
              nisi omnis ullam eveniet temporibus assumenda rem praesentium ad,
              autem dolor sed, illum cumque quisquam itaque aliquam dolorem.
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum,
              sequi, facere excepturi in repudiandae at molestias minima sint
              nisi labore commodi optio ipsa consectetur aut accusantium enim
              earum esse incidunt! Voluptas laudantium iusto odio corporis alias
              magni veritatis amet repellendus obcaecati, hic eligendi, repellat
              ex nostrum porro quasi rem ut iure beatae ipsum, consequuntur
              modi! Minus iste quisquam quis excepturi. Lorem, ipsum dolor sit
              amet consectetur adipisicing elit. Incidunt placeat praesentium
              fugit omnis rerum, saepe nemo doloremque natus laboriosam ut amet
              repellendus suscipit itaque aperiam labore exercitationem modi
              nobis molestias. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Commodi, ipsam voluptatibus temporibus
              necessitatibus quidem voluptatem incidunt neque repudiandae
              consequatur non quas unde earum harum optio quae veritatis
              voluptas dolor iste?
            </p>
          </div>
          <div className="home-hero-info-socials">
            <div className="home-hero-info-socials-icon insta">
              <Link to="">
                <FontAwesomeIcon className="icon" icon={faInstagram} />
              </Link>
            </div>
            <div className="home-hero-info-socials-icon fb">
              <Link>
                <FontAwesomeIcon className="icon" icon={faFacebook} />
              </Link>
            </div>
            <div className="home-hero-info-socials-icon yt">
              <Link>
                <FontAwesomeIcon className="icon" icon={faYoutube} />
              </Link>
            </div>
            <div className="home-hero-info-socials-icon twt">
              <Link>
                <FontAwesomeIcon className="icon" icon={faTwitter} />
              </Link>
            </div>
            <div className="home-hero-info-socials-icon lnkdn">
              <Link>
                <FontAwesomeIcon className="icon" icon={faLinkedin} />
              </Link>
            </div>
          </div>
        </div>
        <div className="home-hero-logo">
          <img src={rgpvLogo} alt="" className="rgpv-logo" />
        </div>
      </div>
      <div className="home-page-carousel">
        <div id="carouselExampleIndicators" className="carousel slide">
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={demo} className="carousel-img" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={demo} className="carousel-img" alt="..." />
            </div>
            <div className="carousel-item">
              <img src={demo} className="carousel-img" alt="..." />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="home-companies-box">
        <div className="home-companies-box-heading">
          <h2>Our Beloved Companies...</h2>
        </div>
        <div className="card-swiper">
          <Swiper
            className="swiper-container"
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={4}
            navigation
            loop
            pagination={{ clickable: true }}
            // scrollbar={{ draggable: true }}
            onSwiper={(swiper) => console.log(swiper)}
            onSlideChange={() => console.log("slide change")}
          >
            <SwiperSlide>
              <Card image={tcs} type="company-card" />
            </SwiperSlide>
            <SwiperSlide>
              <Card image={kanwat} type="company-card" />
            </SwiperSlide>
            <SwiperSlide>
              <Card image={infosys} type="company-card" />
            </SwiperSlide>
            <SwiperSlide>
              <Card image={kanwat} type="company-card" />
            </SwiperSlide>
            <SwiperSlide>
              <Card image={tcs} type="company-card" />
            </SwiperSlide>
            <SwiperSlide>
              <Card image={infosys} type="company-card" />
            </SwiperSlide>
            <SwiperSlide>
              <Card image={tcs} type="company-card" />
            </SwiperSlide>
            <SwiperSlide>
              <Card image={kanwat} type="company-card" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="home-students-box">
        <div className="home-students-box-heading">
          <h2>Our Placed Students...</h2>
        </div>
        <div className="home-students-inner-box">
          <Card
            image={tcs}
            type="student-card"
            studentName="Raju"
            studentCompany="TCS"
            studentPackage="4 Lakhs Per Annum"
          />
          <Card
            image={kanwat}
            type="student-card"
            studentName="Raju"
            studentCompany="TCS"
            studentPackage="4 Lakhs Per Annum"
          />
          <Card
            image={infosys}
            type="student-card"
            studentName="Raju"
            studentCompany="TCS"
            studentPackage="4 Lakhs Per Annum"
          />
          <Card
            image={tcs}
            type="student-card"
            studentName="Raju"
            studentCompany="TCS"
            studentPackage="4 Lakhs Per Annum"
          />
        </div>
        <div className="home-students-inner-box">
          <Card
            image={kanwat}
            type="student-card"
            studentName="Raju"
            studentCompany="TCS"
            studentPackage="4 Lakhs Per Annum"
          />
          <Card
            image={infosys}
            type="student-card"
            studentName="Raju"
            studentCompany="TCS"
            studentPackage="4 Lakhs Per Annum"
          />
          <Card
            image={tcs}
            type="student-card"
            studentName="Raju"
            studentCompany="TCS"
            studentPackage="4 Lakhs Per Annum"
          />
          <Card
            image={kanwat}
            type="student-card"
            studentName="Raju"
            studentCompany="TCS"
            studentPackage="4 Lakhs Per Annum"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
