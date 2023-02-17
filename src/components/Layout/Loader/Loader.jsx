import { ClipLoader } from "react-spinners";

import styles from "./Loader.module.scss";

const Loader = ({ loading }) => {
  return (
    <div className={styles.loader}>
      <ClipLoader
        loading={loading}
        cssOverride={{ width: "6rem", height: "6rem" }}
      />
    </div>
  );
};

export default Loader;
