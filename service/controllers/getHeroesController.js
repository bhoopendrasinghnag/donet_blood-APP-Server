import getHeroesService from "../service/getHeroesService.js";

const getHeroesController = async (req, res) => {
    try {

        const { location } = req.params;
        const { state_district } = req.query;
        const result = await getHeroesService(location,state_district);
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
export default getHeroesController;