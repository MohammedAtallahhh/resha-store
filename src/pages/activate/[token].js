import { connectDB, disconnectDB } from "@/helpers/db";
import jwt from "jsonwebtoken";
import User from "models/User";

const ActivateUser = () => {
  return (
    <div style={{ padding: "5rem 0" }}>
      <div className="container">
        <h2 style={{ color: "#47cd70", fontSize: "3rem" }}>
          Your account is successfully verified.
        </h2>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const token = context.query.token;

  try {
    connectDB();
    const id = jwt.verify(token, process.env.ACTIVATION_TOKEN_SECRET);
    const user = await User.findOne({ id });

    if (!user) {
      throw new Error("User does not exist.");
    }

    await User.updateOne({ id }, { emailVerified: true });
    disconnectDB();
    return {
      props: {},
    };
    //
  } catch (err) {
    disconnectDB();
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};

export default ActivateUser;
