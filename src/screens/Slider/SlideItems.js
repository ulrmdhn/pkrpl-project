import React, { useState, useEffect } from "react";
import { useProvider } from "../../provider/Provider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./Slider.css";

export default function SlideItems() {
  const [item, setItem] = useState({});
  const { getAllProducts } = useProvider();

  useEffect(() => {
    async function getSpecific() {
      try {
        const data = await getAllProducts();
        setItem(data.data.products);
      } catch (e) {
        console.log(e);
      }
    }

    getSpecific();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="main-box">
      <h2> Our Items </h2>
      <p>Find our best items here</p>
      <Slider {...settings}>
        {item && item.length > 0
          ? item?.map((item, index) => {
              return (
                <div className="box" key={index}>
                  <img src={item?.images[0]} />
                  <p>{item?.title}</p>
                </div>
              );
            })
          : null}
      </Slider>
    </div>
  );
}
