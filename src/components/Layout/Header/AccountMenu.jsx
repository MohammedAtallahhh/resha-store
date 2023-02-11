/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";

import { signIn, signOut } from "next-auth/react";

import { VscAccount } from "react-icons/vsc";
import { AiOutlineCaretDown } from "react-icons/ai";

import styles from "./AccountMenu.module.scss";

const AccountMenu = ({ userData }) => {
  const [menuOpen, setMenu] = useState(false);

  return (
    <div className={styles["account-menu"]}>
      <button onClick={() => setMenu((prev) => !prev)}>
        {userData ? (
          <img src={userData.user.image} alt="user avatar" />
        ) : (
          <VscAccount />
        )}
        <span>{userData ? userData.user.name.split(" ")[0] : "Account"}</span>
        <AiOutlineCaretDown />
      </button>

      <ul className={`${styles["menu-list"]} ${menuOpen ? styles.open : ""}`}>
        <li className={styles["menu-item"]}>
          <Link href="/profile">Account</Link>
        </li>
        <li className={styles["menu-item"]}>
          <Link href="/profile/wishlist">
            <span>Wishlist</span>
          </Link>
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
        {userData ? (
          // <li className={styles["menu-item"]}>
          <button className="btn-danger" onClick={() => signOut()}>
            Logout
          </button>
        ) : (
          // </li>
          <>
            <button className="btn-primary" onClick={() => signIn()}>
              Login
            </button>
            <button className="btn-secondary">Register</button>
          </>
        )}
      </ul>
    </div>
  );
};

export default AccountMenu;
