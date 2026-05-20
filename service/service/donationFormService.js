import donationFormRepository from "../reposetory/donationFormRepository.js";

const donationFormService = async (formData) => {
    console.log("send to Repo" );
    const response = await donationFormRepository(formData);
    return response;
}

export default donationFormService;