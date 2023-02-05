import mongoose from "mongoose";

const connection = {};

export const connectDB = async () => {
  if (connection.isConnected) {
    console.log("Already connected!");
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;

    if (connection.isConnected) {
      console.log("There is already an active connection.");
      return;
    }

    await mongoose.disconnect();
  }

  const db = mongoose
    .connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Mongoose connected successfully.");
      connection.isConnected = db.connections[0].readyState;
    })
    .catch((err) => console.log(err.message));
};

export const disconnectDB = async () => {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    }
  }
};
