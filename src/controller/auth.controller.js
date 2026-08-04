const UserModel = require("../model/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../services/mail.service");

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

  const html = `
        <div>
            <h2>Welcome to Our Platform 🎉</h2>
            <p>Hi  ${user.fullName.firstName},</p>
            <p>Your account has been successfully created.</p>
            <p>Thank you for registering with us.</p>
            <br />
            <p>Regards,<br/>Team</p>
        </div>
    `;

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
