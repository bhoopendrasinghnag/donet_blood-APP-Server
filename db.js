import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB;

let dbConnection = null;
let client = null;


export async function connectToDatabase() {
    if (dbConnection) return dbConnection;

    if (!uri) {
        throw new Error("Please define the MONGO_URI environment variable");
    }

    try {
        client = new MongoClient(uri);
        await client.connect();

        if (!dbName) {
            console.warn("⚠️ MONGO_DB not defined in .env, using default cluster DB");
        }
        
        dbConnection = client.db(dbName);
        
        console.log("Database Connected ✅");
        
        return dbConnection;
    } catch (error) {
        console.error("MongoDB Connection Failed ❌", error);
        throw error;
    }
}


export async function getDB() {
    if (!dbConnection) {
        return await connectToDatabase();
    }
    return dbConnection;
}