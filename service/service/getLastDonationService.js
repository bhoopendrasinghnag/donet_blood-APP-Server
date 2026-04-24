import getLastDonationRepository from "../reposetory/getLastDonationRepository.js"

const getLastDonationservice = async (id) => {
    const result = await getLastDonationRepository(id);
    return result;
}

export default getLastDonationservice;