import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"


import registerUser from "../service/controllers/registerController.js";
import logInUser from "../service/controllers/logInControllers.js";
import sendOtpController from "../service/controllers/sendOtpController.js";
import verifyOtpController from "../service/controllers/verifyOTPController.js";
import updatePasswordController from "../service/controllers/resetController.js";
import changePasswordController from "../service/controllers/changePasswordController.js"
import recivePincodeController from "../service/controllers/recivePincodeController.js"
import verifyPhoneNumberController from "../service/controllers/verifyPhoneNumberController.js"
import getDonationController from "../service/controllers/getDonationListController.js"
import heroesController from "../service/controllers/getHeroesController.js";
import getLastDonationController from "../service/controllers/getLastDonationController.js"
import donationFormController from "../service/controllers/donationFormController.js"
import getDonores from "../service/controllers/getDonoresController.js"
import getActiveRequestController from "../service/controllers/getActiveRequestController.js";

// import donationState from "../service/controllers/stateController.js"
const router = express.Router();
router.post("/register", registerUser.registerUser);
router.post("/verify-register-otp", registerUser.verifyOtp);
router.post("/saveUser", registerUser.createUser)

router.post("/logIn", logInUser);
router.post("/send-otp", sendOtpController);
router.post("/verify-forget-otp", verifyOtpController);
router.post("/reset-password", updatePasswordController);

router.post("/update-password", changePasswordController);

router.get("/pincode/:pin", recivePincodeController.pincode);
router.get("/verify-phone/:phone", verifyPhoneNumberController);

router.get("/heroes/:location", heroesController);

router.get("/donation-list", authMiddleware, getDonationController);
router.get("/lastDonation/:id", getLastDonationController);

router.post("/donation-form", donationFormController)

router.get("/activeRequests", authMiddleware, getActiveRequestController);

router.get("/get-donor", getDonores)


import donations from "../service/DonationManually.js";
router.post("/donations", donations);

export default router;


