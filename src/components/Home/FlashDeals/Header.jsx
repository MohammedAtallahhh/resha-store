import { FcFlashOn } from "react-icons/fc";

import styles from "./index.module.scss";
const FlashDealsHeader = () => {
  return (
    <div className={styles.header}>
      <h3>
        Flash Deals
        <FcFlashOn />
      </h3>

      <div className={styles.timer}>
        <div>
          <span>1</span>
          <span>2</span>
        </div>
        <div>
          <span>0</span>
          <span>5</span>
        </div>
        <div>
          <span>4</span>
          <span>0</span>
        </div>
      </div>
    </div>
  );
};

export default FlashDealsHeader;
