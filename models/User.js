import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: "Please, enter a name",
    },

    email: {
      type: String,
      required: "Please, enter an email address",
      trim: true,
      unique: true,
    },

    password: {
      type: String,
      required: "Please, enter a password",
    },

    role: {
      type: String,
      default: "user",
    },

    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dnzxum3u2/image/upload/v1668205241/icon-256x256_n5l1ym.png",
    },

    emailVerified: {
      type: Boolean,
      default: false,
    },

    defualtPaymentMethod: {
      type: String,
      default: "",
    },

    address: [
      {
        firstName: {
          type: String,
        },
        lastName: {
          type: String,
        },
        phoneNumber: {
          type: String,
        },
        address1: {
          type: String,
        },
        address2: {
          type: String,
        },
        country: {
          type: String,
        },
        state: {
          type: String,
        },
        city: {
          type: String,
        },
        zipCode: {
          type: String,
        },
        active: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
