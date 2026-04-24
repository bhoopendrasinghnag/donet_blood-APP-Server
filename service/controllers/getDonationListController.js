import getDonationListService from "../service/getDonationListService.js";

const getDonationListController = async (req, res) => {
    try {
        const token = req.headers.authorization;
        const result = await getDonationListService(token);

        return res.status(201).json({
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

export default getDonationListController;