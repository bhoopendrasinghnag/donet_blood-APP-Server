import donationFormService from "../service/donationFormService.js";

const donationFormController = async (req, res) => {
    try {
        const result = await donationFormService(req.body);
        if (result.success == true)
            res.status(200).json(result);
    } catch (error) {
        res.status(400).json(result);
    }
}


export default donationFormController;