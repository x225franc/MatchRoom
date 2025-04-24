import bcrypt from "bcrypt";
import speakeasy from "speakeasy";
import dotenv from "dotenv";
dotenv.config();
import User from "../models/usersModel.js";
import {
	generateJWT,
	verify2FA as verify2FAToken,
} from "../utils/authUtils.js";

const register = async (req, res) => {
	const { email, password, name } = req.body;

	if (!email || !password || !name) {
		return res.status(400).json({ message: "Mettre ton email et password" });
	}

	try {
		const existingUser = await User.findByEmail(email);
		if (existingUser)
			return res.status(400).json({ message: "Email déjà utilisé" });

		const hashedPassword = await bcrypt.hash(password, 10);
		const user = await User.create({ email, password: hashedPassword, name });
		res
			.status(201)
			.json({ message: "Utilisateur enregistré", userId: user.id });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Erreur lors de l'enregistrement", error: err.message });
	}
};



const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		if (!email || !password) {
			return res.status(400).json({ message: "Mettre ton email et password" });
		}

		const user = await User.findByEmail(email);
		if (!user || !(await bcrypt.compare(password, user.password))) {
			return res.status(401).json({ message: "Identifiants invalides" });
		}
		if (user.status !== "active") {
			return res.status(403).json({ message: "Compte non actif" });
		}

		if (user.two_factor_enabled) {
			return res.json({ requires2FA: true, userId: user.id });
		}

    const token = generateJWT(user.id);
    const expiresAt = new Date(Date.now() + 3600000); // 1h
    await User.updateSession(user.id, token, expiresAt);
    res.json({ token, roles: user.roles });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur lors de la connexion", error: err.message });
  }
};

const setup2FA = async (req, res) => {
	try {
		const user = await User.findById(req.userId);
		if (user.two_factor_enabled) {
			return res.status(400).json({ message: "2FA déjà configuré" });
		}

		const secret = speakeasy.generateSecret({
			name: `TinderHotels:${user.email}`,
		});
		await User.update2FASecret(user.id, secret.base32);
		res.json({ qrCode: secret.otpauth_url });
	} catch (err) {
		res.status(500).json({
			message: "Erreur lors de la configuration 2FA",
			error: err.message,
		});
	}
};

const verify2FA = async (req, res) => {
	const { userId, token } = req.body;
	try {
		const user = await User.findById(userId);
		if (!user || !user.two_factor_enabled) {
			return res.status(400).json({ message: "2FA non configuré" });
		}

		const verified = verify2FAToken(user.two_factor_secret, token);
		if (!verified) {
			return res.status(401).json({ message: "Code 2FA invalide" });
		}

//     const jwtToken = generateJWT(user.id);
//     const expiresAt = new Date(Date.now() + 3600000);
//     await User.updateSession(user.id, jwtToken, expiresAt);
//     res.json({ token: jwtToken });
//   } catch (err) {
//     res.status(500).json({
//       message: "Erreur lors de la vérification 2FA",
//       error: err.message,
//     });
//   }
// };

const logout = async (req, res) => {
	try {
		await User.clearSession(req.userId);
		res.json({ message: "Déconnexion réussie" });
	} catch (err) {
		res
			.status(500)
			.json({ message: "Erreur lors de la déconnexion", error: err.message });
	}
};

export { register, login, setup2FA, verify2FA, logout };
