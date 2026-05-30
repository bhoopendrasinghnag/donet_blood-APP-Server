import changePasswordController from "../service/changePasswordController.js";

const donationFormController = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const result = await changePasswordController(email, password);

        if (result?.success) {
            return res.status(200).json(result);
        } else {
            return res.status(400).json(result);
        }

    } catch (error) {
        console.log({ message: error.message || "Server Error" });
        return res.status(500).json({
            success: false,
            message: error.message || "Server Error"
        });
    }
};

export default donationFormController;