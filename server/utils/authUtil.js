import bcryptjs from "bcryptjs";

export const hashpassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedpassword = await bcryptjs.hash(password, saltRounds);
    return hashedpassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedpassword) => {
  return bcryptjs.compare(password, hashedpassword);
};
