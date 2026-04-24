
import stateService from "../service/stateService.js";
const stateController = async (req, res) => {


    try {
        const userID = req.body;
        const result = await stateService(userID);
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
}
export default stateController;