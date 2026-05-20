import forgotService from "../service/forgotService.js";

const updatePasswordController = async (req, res) => {
  console.log(req.body);
  
  try {
    const result = await forgotService.updatePasswordService(req.body);

    return res.status(200).json({
      success: true,
      message: result.message,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
export default updatePasswordController;