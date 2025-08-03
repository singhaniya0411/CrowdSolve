import jwt from "jsonwebtoken";

const verify = (req, res, next) => {
  console.log(req.headers);
  let token = req.header("Authorization"); // ✅ use let

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "Access denied! No token provided." });
  }

  try {
    token = token.replace(/^Bearer\s+/, ""); // ✅ safely modify the token
    console.log("🔑 Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded:", decoded);

    req.user = decoded;
    next();
  } catch (error) {
    console.log("❌ Invalid or expired token:", error.message);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

export default verify;
