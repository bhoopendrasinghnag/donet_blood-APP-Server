import { getDB } from "../../db.js";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const getLastDonationRepository = async (id) => {
    try {
        const db = await getDB();
        const donation = await db.collection(process.env.DONATION_COLLECTION).findOne({ userId: new ObjectId(id) }, { sort: { date: -1 } }
        );
        return donation;
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching donations"
        });
    };
};
export default getLastDonationRepository;