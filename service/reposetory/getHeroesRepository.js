import { getDB } from "../../db.js";

const getHeroesRepository = async (location, state_district) => {
    try {
        const db = await getDB();
        console.log(location);

        const donations = await db.collection(process.env.DONATION_COLLECTION).aggregate([
            {
                $match: {
                    "address.state": location
                }
            },
            {
                $group: {
                    _id: "$userId",
                    totalDonations: { $sum: 1 },
                    bloodGroup: { $first: "$bloodGroup" },
                    address: { $first: "$address" },
                    userName: { $first: "$userName" },
                    gender: { $first: "$gender" },
                    state: { $first: state_district }
                }
            },
            {
                $sort: { totalDonations: -1 }
            },
            {
                $limit: 10
            }
        ])
            .toArray();

        if (!donations || donations.length === 0) {
            const donation = "No Records"
            return donation
        }

        return donations;

    } catch (error) {
        console.error("Error fetching heroes:", error);
        throw error;
    }
};

export default getHeroesRepository;