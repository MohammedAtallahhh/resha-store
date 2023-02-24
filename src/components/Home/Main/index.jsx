/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

import images from "@/helpers/bannerImages";

import styles from "./index.module.scss";
const HomeMain = () => {
  return (
    <div className={`${styles.homeMain} container`}>
      <div className={styles.header}>Header</div>
      <div className={styles.categories}>Categories</div>
      <Swiper
        className={styles.dealsSlider}
        spaceBetween={50}
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        navigation
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
      >
        {images.map((image) => (
          <SwiperSlide key={image.id}>
            <img src={image.src} alt="banner" />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.userMenu}>User</div>
    </div>
  );
};

export default HomeMain;
