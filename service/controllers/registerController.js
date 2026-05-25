import registerUserService from "../service/registerService.js";
import verifyOtpService from "../service/verifyOTPService.js"
import createUserRepository from "../reposetory/registerReposetory.js"

const registerUser = async (req, res) => {
  try {
    const result = await registerUserService(req.body);
    return res.status(200).json(result);
  } catch (error) {
    console.log("REGISTER ERROR ❌");
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { formData, token, otp } = req.body;
    const result = await verifyOtpService.verifyregisterOtpService(formData, token, otp);
    if (result.success == true)
      console.log(result);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(result);
  }
};

const createUser = async (req, res) => {
  try {
    const result = await createUserRepository.createUser(req.body)

    if (result.success == true)
      res.status(200).json(result);
  } catch (error) {
    res.status(400).json(result);
  }
}

export default { registerUser, verifyOtp, createUser }