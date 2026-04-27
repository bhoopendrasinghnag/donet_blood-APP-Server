import jwt from "jsonwebtoken";
import getActiveRequestRepository from "../reposetory/getActiveRequestRepository.js";
const getActiveRequestService = async (token) => {
    const pureToken = token.split(" ")[1];
    const decoded = jwt.verify(pureToken, process.env.JWT_SECRET);

    const userId = decoded.id;
    console.log(userId);

    // const loc = decoded.
    return await getActiveRequestRepository(userId);
}

export default getActiveRequestService;