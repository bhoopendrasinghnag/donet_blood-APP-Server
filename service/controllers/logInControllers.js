import logInUserService from "../service/logInService.js";

const logInUser = async (req, res) => {
  console.log("Here")
  try {

    const result = await logInUserService(req.body);

    return res.status(result.returnedUser.status).json(result.returnedUser);

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

export default logInUser;
