import getActiveRequestService from "../service/getActiveRequestService.js";

const getActiveRequestController = async (req, res) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token missing",
            });
        }

        const result = await getActiveRequestService(token);

        return res.status(200).json({
            success: true,
            data: result,
            message: "Active Requests Successful 🎉"
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export default getActiveRequestController;