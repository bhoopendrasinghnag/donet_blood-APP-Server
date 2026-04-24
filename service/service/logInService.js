import loginUserRepository from "../reposetory/logInRepository.js";

const registerUserService = async (data) => {

  const returnedUser = await loginUserRepository(data);

  return { returnedUser }
};

export default registerUserService;