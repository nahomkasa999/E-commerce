import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/user";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

//inngest functioin to save user data to a database

export const syncUserCreation = inngest.createFunction(
  {
    id: "syncUser from clerk",
  },
  { evernt: "clerk/user.created" },
  { name: "Sync User Creation" },
  { trigger: "clerk/user.created" },

  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + "" + last_name,
      imageUrl: image_url,
    };
    await connectDB();
    await User.create(userData);
  }
);

//Inngest Function to update the database

export const syncUserUpdation = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" },
  { name: "Sync User Update" },
  { trigger: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;
    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + "" + last_name,
      imageUrl: image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

// inngest function to delete user from database
export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  { name: "Sync User Deletion" },
  { trigger: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await connectDB();
    await User.findByIdAndDelete(id);
  }
);
