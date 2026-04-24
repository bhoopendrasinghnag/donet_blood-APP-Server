import registerUserService from "../service/sendOtpService.js";

const sendOtpController = async (req, res) => {
  try {
    const response = await registerUserService(req.body);
    res.json(response);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });

  }
}

export default sendOtpController;
