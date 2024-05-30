import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      userName: user.userName,
      fullName: user.fullName,
      profilePicture: user.profilePicture,
      password: user.password,
      slug: user.slug,
    },
    process.env.SECRET_TOKEN
  );
};
export const verifyToken = (token) => {
  //Data decoded from the token
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);

    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
