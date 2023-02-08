/* eslint-disable @next/next/no-img-element */

import TopNav from "./TopNav";

import styles from "./styles/Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={`container ${styles.container}`}>
        <TopNav />
      </div>
    </header>
  );
};

export default Header;
