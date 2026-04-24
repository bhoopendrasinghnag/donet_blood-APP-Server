import { getDB } from "../db.js";
import { ObjectId } from "mongodb";

const userCollection = process.env.MONGO_COLLECTION;
const donationCollection = process.env.DONATION_COLLECTION;

const donationmanually = async (req, res) => {
  try {
    const db = await getDB();

    const { userId, userName, gender, date, bloodGroup, address } = req.body;

    if (!userId || !date) {
      return res.status(400).json({
        success: false,
        message: "userId and date required ❌"
      });
    }

    const userObjectId = new ObjectId(userId);

    const user = await db
      .collection(userCollection)
      .findOne({ _id: userObjectId });


    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found ❌"
      });
    }

    const donationDate = new Date(date);

    const donationData = {
      userId: userObjectId,
      userName: user?.name || "",
      date: donationDate,
      address: {
        hospital: address?.hospital || "",
        city: address?.city || "",
        state: address?.state || "",
        pincode: address?.pincode || ""
      },
      bloodGroup: bloodGroup || user.bloodGroup,
      gender: user?.gender || "",
      createdAt: new Date()
    };

    const donationResult = await db
      .collection(donationCollection)
      .insertOne(donationData);

    // next eligible after 3 months
    const nextEligibleDate = new Date(donationDate);
    nextEligibleDate.setMonth(nextEligibleDate.getMonth() + 3);

    const availability =
      new Date() >= nextEligibleDate ? "Available" : "Unavailable";

    await db.collection(userCollection).updateOne(
      { _id: userObjectId },
      {
        $set: {
          lastDonationDate: donationDate,
          nextEligibleDate,
          availability
        }
      }
    );

    return res.json({
      success: true,
      message: "Donation added successfully 💉",
      donationId: donationResult.insertedId
    });

  } catch (error) {
    console.error("Donation Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server error ❌"
    });
  }
};

export default donationmanually;