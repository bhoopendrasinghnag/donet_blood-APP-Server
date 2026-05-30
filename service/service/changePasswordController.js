import changePasswordRepository from "../reposetory/changePasswordRepository.js";

const donationFormService = async (email, password) => {
        
    const response = await changePasswordRepository(email, password);    
    return response;
}

export default donationFormService;