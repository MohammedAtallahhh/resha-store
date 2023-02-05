import { connectDB, disconnectDB } from "@/helpers/db";

export default function handler(req, res) {
  connectDB();
  disconnectDB();
  res.status(200).json({ name: "John Doe" });
}
