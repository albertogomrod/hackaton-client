import service from "./config.services";

const uploadImageHackatonService = (imageFile) => {
  return service.post("/upload/hackaton", imageFile);
};
const uploadImageTutorialService = (imageFile) => {
  return service.post("/upload/tutorial", imageFile);
};
const uploadImageProfilelService = (imageFile) => {
  return service.post("/upload/profile", imageFile);
};

export {
  uploadImageHackatonService,
  uploadImageTutorialService,
  uploadImageProfilelService,
};
