import Link from "next/link";

import { FiSearch } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import styles from "./styles/MainNav.module.scss";

const MainNav = () => {
  return (
    <div className={styles["main-nav"]}>
      <div className={`container ${styles.container}`}>
        {/* Logo */}
        <h2 className={styles.logo}>
          <Link href="/">
            Resha <span></span>
          </Link>
        </h2>

        {/* Search */}
        <div className={styles.search}>
          <input type="search" />
          <button className="btn-primary">
            <FiSearch />
          </button>
        </div>

        {/* Navbar actions */}
        <div className={styles.actions}>
          {/* Cart */}
          <div className={styles.cart}>
            <button>
              <BsCart2 />
              <span className={styles["cart-count"]}>2</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNav;
