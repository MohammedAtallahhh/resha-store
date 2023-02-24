/* eslint-disable @next/next/no-img-element */
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper";

import images from "@/helpers/bannerImages";

import { BiCategoryAlt } from "react-icons/bi";
import styles from "./index.module.scss";
import { categories } from "@/helpers/categories";
import Link from "next/link";
const HomeMain = () => {
  return (
    <div className={`${styles.homeMain} container`}>
      <div className={styles.header}>
        <ul>
          <li>Store</li>
          <li>Shoes</li>
          <li>Sneakers</li>
        </ul>
      </div>
      <div className={styles.categories}>
        <h3>
          <BiCategoryAlt />
          Categories
        </h3>
        <ul>
          {categories.map((c) => (
            <li key={c.name}>
              <Link href={c.link}>
                {c.icon}
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Swiper
        className={styles.mainBanners}
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
          <SwiperSlide key={image.id} className={styles.slide}>
            <img src={image.src} alt="banner" />
          </SwiperSlide>
        ))}
      </Swiper>
      {/* <div className={styles.userMenu}>User</div> */}
    </div>
  );
};

export default HomeMain;
