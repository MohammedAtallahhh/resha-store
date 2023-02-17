import User from "models/User";
import bcrypt from "bcrypt";

import { connectDB, disconnectDB } from "@/helpers/db";
import { validateEmail } from "@/helpers/validate";
// import { createActivationToken } from "@/helpers/tokens";
// import { sendEmail } from "@/helpers/sendemail";

const handler = async (req, res) => {
  try {
    if (req.method === "POST") {
      await connectDB();
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Please fill in the necessary information" });
      }

      if (!validateEmail(email)) {
        return res.status(400).send({ message: "Invalide email address" });
      }

      const user = await User.findOne({ email });

      if (user) {
        return res.status(400).send({ message: "Email already exists" });
      }

      if (password.length < 6) {
        return res
          .status(400)
          .send({ message: "Password must be at least 6 characters" });
      }

      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = new User({ name, email, password: passwordHash });

      const addedUser = await newUser.save();
      // const activation_token = createActivationToken({
      //   id: addedUser._id.toString(),
      // });

      // const activation_url = `${process.env.NEXT_PUBLIC_BASE_URL}/activate/${activation_token}`;

      // sendEmail(email, activation_url, "Activate Your Account", "");
      await disconnectDB();
      return res.status(200).json({ user: addedUser });
    }
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

export default handler;
