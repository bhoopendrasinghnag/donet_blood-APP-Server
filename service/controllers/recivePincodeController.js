
const pincode = async (req, res) => {

  try {
    console.log(req.params.pin);

    const response = await fetch(`https://api.postalpincode.in/pincode/${req.params.pin}`);
    const data = await response.json();

    // ✅ Check if API returned valid data
    if (!data || data[0].Status !== "Success" || !data[0].PostOffice) {
      return res.status(400).json({
        success: false,
        message: "Invalid pincode ❌",
      });
    }

    const postOffice = data[0].PostOffice[0];

    return res.json({
      success: true,
      district: postOffice.District,
      state: postOffice.State,
      city: postOffice.Name, // ✅ better than Block
    });

  } catch (error) {
    console.error("Pincode API Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch pincode ❌",
    });
  }
};

export default { pincode }