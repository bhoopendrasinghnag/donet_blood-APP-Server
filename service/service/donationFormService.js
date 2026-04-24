import donationFormRepository from "../reposetory/donationFormRepository.js";

const donationFormService = async (formData) => {
    const response = await donationFormRepository(formData);
    return response;
}

export default donationFormService;