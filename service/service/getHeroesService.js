import getHeroesRepository from "../reposetory/getHeroesRepository.js";

const getHeroesService = async (location, state_district) => {
  return await getHeroesRepository(location, state_district);
};

export default getHeroesService;