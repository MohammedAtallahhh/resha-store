/* eslint-disable @next/next/no-img-element */
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { signOut } from "next-auth/react";

import { useRouter } from "next/router";
import { VscAccount } from "react-icons/vsc";
import { AiOutlineCaretDown } from "react-icons/ai";

import styles from "./AccountMenu.module.scss";

const AccountMenu = ({ userData }) => {
  const [menuOpen, setMenu] = useState(false);
  const menuRef = useRef();
  const router = useRouter();

  const handleLogout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/signin" });
    setMenu((prev) => !prev);
    router.push(data.url);
  };

  useEffect(() => {
    const handler = (e) => {
      // Close the menu when clicking outside and it's open
      if (menuOpen && !e.target.closest(`.${menuRef.current.className}`)) {
        setMenu(false);
      }
    };

    document.addEventListener("click", handler);

    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  return (
    <div ref={menuRef} className={styles["account-menu"]}>
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
          <button className="btn-danger" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          // </li>
          <>
            <Link
              href={`/signin?callbackUrl=${encodeURIComponent(
                process.env.NEXT_PUBLIC_BASE_URL + router.asPath
              )}`}
            >
              <button
                className="btn-primary"
                onClick={() => setMenu((prev) => !prev)}
              >
                Sign In
              </button>
            </Link>
            <Link
              href={`/signup?callbackUrl=${encodeURIComponent(
                process.env.NEXT_PUBLIC_BASE_URL + router.asPath
              )}`}
            >
              <button
                className="btn-secondary"
                onClick={() => setMenu((prev) => !prev)}
              >
                Sign Up
              </button>
            </Link>
          </>
        )}
      </ul>
    </div>
  );
};

export default AccountMenu;
