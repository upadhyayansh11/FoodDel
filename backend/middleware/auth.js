// import jwt from "jsonwebtoken";

// const authMiddleware = async (req, res, next) => {
//   const token = req.headers.authorization?.split(" ")[1];
//   console.log("Token:", token); // Debug log
//   if (!token) {
//     return res.json({ success: false, message: "Not Authorized Login Again" });
//   }
//   try {
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded Token:", decodedToken);
//     req.user = { id: token_decode.id };
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };
// export default authMiddleware;
import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({
      success: false,
      message: "Not Authorized. Login Again.",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Invalid or expired token." });
  }
};

export default authMiddleware;
