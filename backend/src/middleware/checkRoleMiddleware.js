import dotenv from "dotenv";
dotenv.config();

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    // Đảm bảo authMiddleware đã chạy và gắn req.user
    if (!req.user || !req.user.role) {
      // Lỗi này không nên xảy ra nếu authMiddleware được dùng trước đó
      console.error(
        "checkRole middleware requires req.user with role property. Ensure authMiddleware runs first."
      );
      return res
        .status(500)
        .json({ message: "Erreur de configuration du serveur" });
    }

    const userRole = req.user.role;

    if (allowedRoles.includes(userRole)) {
      next(); // Vai trò hợp lệ, cho phép tiếp tục
    } else {
      res.status(403).json({ message: "Accès interdit: Rôle non autorisé" }); // Forbidden
    }
  };
};

export default checkRole;
