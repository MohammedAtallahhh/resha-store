/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import AccountMenu from "./AccountMenu";

// import { MdSecurity } from "react-icons/md";
import { useSelector } from "react-redux";

import { AiOutlineHeart } from "react-icons/ai";
import styles from "./styles/TopNav.module.scss";

const TopNav = () => {
  const country = useSelector((state) => state.country);

  return (
    <nav className={styles.nav}>
      <div className={`${styles.container} container`}>
        <ul className={styles.list}>
          {/* Country and currency */}
          <li className={styles["list-item"]}>
            <img
              src={country.flag.emojitwo}
              alt="Your country flag"
              className={styles["country-flag"]}
            />
            <span className={styles.country}>{country.name}</span>
          </li>

          {/* Wishlist */}
          <li className={styles["list-item"]}>
            <Link href="/profile/wishlist">
              <AiOutlineHeart />
              <span>Wishlist</span>
            </Link>
          </li>

          <AccountMenu />
        </ul>
      </div>
    </nav>
  );
};

export default TopNav;
