import { getDB } from "../../db.js";
import { ObjectId } from "mongodb";
import dotenv from "dotenv";

const collectionName = process.env.MONGO_COLLECTION;
dotenv.config();

const getState = async (userID) => {
    try {
        const db = await getDB();
        const user = await db.collection(collectionName).findOne(
            { _id: new ObjectId(userID) },
            { projection: { password: 0 } }
        );
        
        return {
            success: true,
            data: user
        };

    } catch (error) {

    }

}

export default getState;