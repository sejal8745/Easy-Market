import userModel from "../models/userModel.js";
import { hashpassword } from "../utils/authUtil.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validation
    if (!name) {
      return res.send({ error: "Name is required" });
    }
    if (!email) {
      return res.send({ error: "Email is required" });
    }
    if (!password) {
      return res.send({ error: "Passworpassword is required" });
    }
    if (!phone) {
      return res.send({ error: "Phone is required" });
    }
    if (!address) {
      return res.send({ error: "Address is required" });
    }
    //check user
    const existinguser = await userModel.findOne({ email: email });
    //existing user
    if (existinguser) {
      return res.status(200).send({
        success: true,
        message: "Already a user, please login",
      });
    }

    //register the user
    const hashedpassword = await hashpassword(password);
    //save
    const user = await new userModel({
      name: name,
      email: email,
      phone: phone,
      address: address,
      password: hashedpassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "user is registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      erorr,
    });
  }
};
