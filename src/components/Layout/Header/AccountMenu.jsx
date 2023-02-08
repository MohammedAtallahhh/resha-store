import { useState } from "react";
import Link from "next/link";

import { VscAccount } from "react-icons/vsc";
import { AiOutlineCaretDown } from "react-icons/ai";
import styles from "./styles/AccountMenu.module.scss";

const AccountMenu = ({ isLoggedIn }) => {
  const [menuOpen, setMenu] = useState(false);
  return (
    <div className={styles["account-menu"]}>
      <button onClick={() => setMenu((prev) => !prev)}>
        <VscAccount />
        <span>MohammedAtallah</span>
        <AiOutlineCaretDown />
      </button>
      {/* <AccountMenu isLoggedIn={loggedIn} /> */}

      <ul className={`${styles["menu-list"]} ${menuOpen ? styles.open : ""}`}>
        <li className={styles["menu-item"]}>
          <Link href="/profile">Account</Link>
        </li>
        <li className={styles["menu-item"]}>
          <Link href="/profile/orders">My Orders</Link>
        </li>
        <li className={styles["menu-item"]}>
          <Link href="/profile/messages">Message Center</Link>
        </li>
        <li className={styles["menu-item"]}>
          <Link href="/profile/address">Address</Link>
        </li>
        {isLoggedIn ? (
          <li className={styles["menu-item"]}>
            <button className="btn-danger">Logout</button>
          </li>
        ) : (
          <>
            <button className="btn-primary">Login</button>
            <button className="btn-secondary">Register</button>
          </>
        )}
      </ul>
    </div>
  );
};

export default AccountMenu;
