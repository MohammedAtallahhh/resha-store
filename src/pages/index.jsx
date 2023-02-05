import { add } from "@/store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  console.log(cart);

  return (
    <>
      <h1>Hello world!</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci,
        dignissimos, dolore dolor sapiente perferendis nisi nemo, velit et odit
        obcaecati architecto at! Quaerat, neque a! Vero ab optio maxime iure.
      </p>

      <button onClick={() => dispatch(add("Hi there!"))}>Add</button>
    </>
  );
}
