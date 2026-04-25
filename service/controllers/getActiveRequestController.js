import getActiveRequestService from "../service/getActiveRequestService.js"; ''

const getActiveRequestController = async (req, res) => {
    console.log("token")
    try {
        const token = req.headers.authorization;
        const response = await getActiveRequestService(token);
        return response.status(201).json({
            success: true,
            data: result,
            result: result,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export default getActiveRequestController