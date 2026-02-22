import jwt from "jsonwebtoken";

const SECRET = "mysecretkey123"; // baad me env me shift karna

export function signToken(user) {
  return jwt.sign(
    { id: user._id, email: user.email },
    SECRET,
    { expiresIn: "7d" }
  );
}

export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
