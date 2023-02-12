import { useEffect } from "react";
import { useSession } from "next-auth/react";

// import axios from "axios";

import { setCountry } from "@/store/slices/countrySlice";
import { useDispatch } from "react-redux";

export default function Home({ country }) {
  const dispatch = useDispatch();
  const { data } = useSession();

  useEffect(() => {
    dispatch(setCountry(country));
  }, [dispatch, country]);

  return (
    <>
      <h1>{data ? data.user.name : "Hello world"}</h1>
    </>
  );
}

export const getServerSideProps = async () => {
  // const res = await axios.get(
  //   `https://api.ipregistry.co/197.40.209.35?key=ww5bo722kw5p5pim`
  // );
  // const country = res.data.location.country;

  const country = {
    name: "Egypt",
    flag: {
      emojitwo:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/2560px-Flag_of_Egypt.svg.png",
    },
  };

  return {
    props: {
      country,
    },
  };
};
