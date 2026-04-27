import { getDB } from "../../db.js";
import dotenv from "dotenv";

const getActiveRequestRepository = async (userId) => {
    const db = await getDB();
    const response = await db.collection(process.env.DONATIONFORM_COLLECTION).find({
        userID: { $ne: userId },
    })
        .toArray();

    return response;
}
export default getActiveRequestRepository;