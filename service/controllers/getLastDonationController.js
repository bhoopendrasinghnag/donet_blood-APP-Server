import getLastDonationListService from "../service/getLastDonationService.js"

const getLastDonationController = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await getLastDonationListService(id);

        return res.status(201).json({
            success: true,
            data: result,
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

export default getLastDonationController;