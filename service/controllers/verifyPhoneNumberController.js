import dotenv from "dotenv";
dotenv.config();

const verifyPhoneNumberController = async (req, res) => {

  try {
    const phone = req.params.phone;
    const response = await fetch(
      `https://api.veriphone.io/v2/verify?phone=91${phone}&key=${process.env.PHONE_SECRET_KEY}`
    );

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: "Phone validation failed"
    });
  }
};

export default verifyPhoneNumberController;


