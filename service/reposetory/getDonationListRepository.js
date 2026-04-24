import { getDB } from "../../db.js";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";

const getDonationListRepository = async (userId) => {
    try {
        const db = await getDB();
        const donations = await db
            .collection(process.env.DONATION_COLLECTION)
            .find({ userId: new ObjectId(userId) })
            .sort({ date: -1 })
            .toArray();

        return donations;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching donations"
        });
    };
};

export default getDonationListRepository;