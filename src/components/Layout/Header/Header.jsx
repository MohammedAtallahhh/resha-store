/* eslint-disable @next/next/no-img-element */

import MainNav from "./MainNav";

import styles from "./styles/Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      {/* <TopNav /> */}
      <MainNav />
    </header>
  );
};

export default Header;
