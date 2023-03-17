import service from "./config.services";

const uploadImageHackatonService = (imageFile) => {
  return service.post("/upload/hackaton", imageFile);
};

const uploadImageProfilelService = (imageFile) => {
  return service.post("/upload/profile", imageFile);
};

export { uploadImageHackatonService, uploadImageProfilelService };
