/* eslint-disable @next/next/no-img-element */

import ProductsSlider from "@/components/ProductsSlider/ProductsSlider";
import { flashDealsData } from "@/helpers/flashDeals";
import FlashDealsHeader from "./Header";

import styles from "./index.module.scss";

const FlashDeals = () => {
  return (
    <div className={`${styles.flashDeals} flash-deals`}>
      <div className="container">
        <FlashDealsHeader />
        <ProductsSlider products={flashDealsData} />
      </div>
    </div>
  );
};

export default FlashDeals;
