import { useSession } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  return (
    <>
      <h1>{data ? data.user.name : "Hello world"}</h1>
    </>
  );
}
