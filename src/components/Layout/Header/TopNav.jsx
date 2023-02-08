/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

import AccountMenu from "./AccountMenu";

// import { MdSecurity } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";

import styles from "./styles/TopNav.module.scss";

const TopNav = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        {/* Country and currency */}
        <li className={styles["list-item"]}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png"
            alt="Country flag"
            className={styles["country-flag"]}
          />
          <span className={styles.country}>Egypt /</span>
          <span>EGP</span>
        </li>

        {/* Buyer protection */}
        {/* <li className={styles["list-item"]}>
        <MdSecurity />
        <span>Buyer protection</span>
      </li>

      <li className={styles["list-item"]}>
        <span>Customer service</span>
      </li>

      <li className={styles["list-item"]}>
        <span>Help</span>
      </li> */}

        {/* Wishlist */}
        <li className={styles["list-item"]}>
          <Link href="/profile/wishlist">
            <AiOutlineHeart />
            <span>Wishlist</span>
          </Link>
        </li>

        <AccountMenu />
      </ul>
    </nav>
  );
};

export default TopNav;
