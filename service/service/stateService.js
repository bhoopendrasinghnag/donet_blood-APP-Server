import stateRespository from "../reposetory/stateRespository.js"

const stateService = async (userID) => {
    try {    
        const response = await stateRespository(userID);
        return response;
    } catch (error) {

    }
}

export default stateService;