/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import styles from "./ProductsSlider.module.scss";

const ProductsSlider = ({ products }) => {
  const [windowSize, setWindowSize] = useState();

  useEffect(() => {
    setWindowSize(innerWidth);
    const handleSizeChange = () => {
      setWindowSize(innerWidth);
    };

    window.addEventListener("resize", handleSizeChange);

    return () => window.removeEventListener("resize", handleSizeChange);
  }, []);
  return (
    <Swiper
      className={styles.slider}
      spaceBetween={15}
      slidesPerView={
        windowSize < 550 ? 1 : windowSize < 900 ? 2 : windowSize < 1200 ? 3 : 4
      }
      modules={[Navigation, Autoplay]}
      navigation
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {products.map(({ id, image, price, discount, title }) => (
        <SwiperSlide key={id} className={styles.slide}>
          <span className={styles.percentage}>-{discount * 100}%</span>
          <div className={styles.slideImage}>
            <img src={image} alt="product" />
          </div>

          <div>
            <h4 className={styles.title}>{title}</h4>

            <div className={styles.price}>
              <span className={styles.newPrice}>
                ${(price - discount * price).toFixed(2)}
              </span>
              <span className={styles.oldPrice}>${price}</span>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ProductsSlider;
