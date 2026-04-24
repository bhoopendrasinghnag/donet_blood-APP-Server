import jwt from "jsonwebtoken";

import getDonationListRepository from "../reposetory/getDonationListRepository.js";

const getDonationListService = async (token) => {
  const pureToken = token.split(" ")[1];
  const decoded = jwt.verify(pureToken, process.env.JWT_SECRET);
  const userId = decoded.id;
  return await getDonationListRepository(userId);
};

export default getDonationListService;