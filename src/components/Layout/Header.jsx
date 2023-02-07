/* eslint-disable @next/next/no-img-element */

import { MdSecurity } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineCaretDown } from "react-icons/ai";

import styles from "./styles.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        {/* Logo */}
        <div className={styles.logo}>
          <h2>
            Resha<span></span>
          </h2>
        </div>

        {/* Navbar */}
        <nav className={styles.nav}>
          <ul className={styles.list}>
            {/* Country and currency */}
            <li className={styles["list-item"]}>
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png"
                alt="Country flag"
                className={styles["country-flag"]}
              />
              <span>Egypt / EGP</span>
            </li>

            {/* Buyer protection */}
            <li className={styles["list-item"]}>
              <MdSecurity />
              <span>Buyer protection</span>
            </li>

            <li className={styles["list-item"]}>
              <span>Customer service</span>
            </li>

            <li className={styles["list-item"]}>
              <span>Help</span>
            </li>

            {/* Wishlist */}
            <li className={styles["list-item"]}>
              <AiOutlineHeart />
              <span>Wishlist</span>
            </li>

            <li className={styles["list-item"]}>
              <VscAccount />
              <span>Account</span>
              <AiOutlineCaretDown />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
