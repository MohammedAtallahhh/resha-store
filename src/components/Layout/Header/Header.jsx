/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useSession } from "next-auth/react";

import AccountMenu from "./AccountMenu";

import { BsCart2 } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

import styles from "./Header.module.scss";

const Header = ({ country }) => {
  const { data } = useSession();

  return (
    <header className={styles.header}>
      <div className={styles["main-nav"]}>
        <div className={`container ${styles.container}`}>
          {/* Logo */}
          <h2 className={styles.logo}>
            <Link href="/">Resha</Link>
          </h2>

          {/* Search */}
          <div className={styles.search}>
            <input type="search" placeholder="Search Resha store" />
            <button className="btn-primary">
              <FiSearch />
            </button>
          </div>

          {/* Navbar actions */}
          <ul className={styles.nav}>
            {/* Country and currency */}
            {country && (
              <li className={styles["list-item"]}>
                <img
                  src={country.flag?.emojitwo}
                  alt="Your country flag"
                  className={styles["country-flag"]}
                />
                <span className={styles["country-name"]}>{country.name}</span>
              </li>
            )}

            {/* Cart */}
            <li className={styles.cart}>
              <button>
                <BsCart2 />
                <span className={styles["cart-count"]}>2</span>
              </button>
            </li>

            {/* Wishlist */}
            {/* <li className={styles["list-item"]}>
            <Link href="/profile/wishlist">
              <AiOutlineHeart />
              <span>Wishlist</span>
            </Link>
          </li> */}

            <AccountMenu userData={data} />
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
