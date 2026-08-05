const UserModel = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../services/mail.service");
const { getEmailVerifiedHtml } = require("../services/emailVerifiedPage");
const { getVerificationEmailHtml } = require("../services/verificationEmailTemplate");

exports.registerContoller = async (req, res) => {
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;

  /* is already exist  */
  const isAlreadyExist = await UserModel.findOne({ email });
  if (isAlreadyExist) {
    return res.status(400).json({
      message: "User already exist please login",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await UserModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password: hashedPassword,
  });

  const verificationToken = jwt.sign({ id: user._id }, process.env.SECRECT_KEY, { expiresIn: '1d' });
  const verificationLink = `${req.protocol}://${req.get("host")}/api/auth/verified-email?token=${verificationToken}`;

  const html = getVerificationEmailHtml(user.fullName.firstName, verificationLink);

  try {
    await sendEmail({
      to: user.email,
      subject: "Registration Successful",
      html,
      text: "Your account has been successfully created.",
    });
  } catch (error) {
    console.log("Email sending failed:", error);
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRECT_KEY);
  res.cookie("token", token);

  return res.status(200).json({
    message: "User Register Successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

exports.logincontroller = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "Please verify your email address before logging in.",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "invalid email or password",
    });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRECT_KEY);
  res.cookie("token", token);

  res.status(200).json({
    message: "User login successfully",
    user: {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    },
  });
};

exports.verifyEmailController = async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.status(400).json({ message: "Verification token is missing" });
    }

    const decoded = jwt.verify(token, process.env.SECRECT_KEY);
    const user = await UserModel.findById(decoded.id);

    if (!user) {
      return res.status(400).json({ message: "Invalid token or user does not exist" });
    }

    if (user.verified) {
      return res.status(400).json({ message: "Email is already verified" });
    }

    user.verified = true;
    await user.save();

    const loginUrl = process.env.CLIENT_URL ? `${process.env.CLIENT_URL}/login` : '/login';
    return res.status(200).send(getEmailVerifiedHtml(loginUrl));
  } catch (error) {
    console.error("Email verification error:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(400).json({ message: "Verification token has expired" });
    }
    return res.status(500).json({ message: "Internal server error during email verification" });
  }
};


exports.getMe = async (req, res) => {
  const userId = req.user.id;
  try {
    const user = await UserModel.findById(userId).select("-password");
    return res.status(200).json({
      message: "User found",
      user: user,
    })

  } catch (error) {   
    return res.status(500).json({
      message: "Internal server error during user fetching",
    })
  }
}