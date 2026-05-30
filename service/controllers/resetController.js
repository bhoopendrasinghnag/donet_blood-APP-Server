import forgotService from "../service/forgotService.js";

const updatePasswordController = async (req, res) => {


  try {
    const result = await forgotService.updatePasswordService(req.body);
console.log(result);

    return res.status(200).json({
      success: true,
      otp: result.otp,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export default updatePasswordController;