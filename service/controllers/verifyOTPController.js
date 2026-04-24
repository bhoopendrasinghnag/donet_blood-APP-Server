import verifyOtpService from "../service/verifyOTPService.js";

const verifyOtpController = async (req, res) => {
  try {
    const result = await verifyOtpService.verifyOtpService(req.body);

    res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export default verifyOtpController;