import service from "./config.services.js";
const getAllTutorialsService = () => {
    return service.get("/home/tutorial-list")
}
const getTutorialDetailsService = (tutorialId) => {
    return service.get(`/tutorial/details/${tutorialId}`)
}
const createTutorialService = (newTutorial) => {
    return service.post("/tutorial/create", newTutorial)
}
const editTutorialService = (tutorialId, updatedTutorial) => {
    return service.patch(`/tutorial/edit/${tutorialId}`, updatedTutorial)
}
const deleteTutorialService = (tutorialId) => {
    return service.delete(`/tutorial/delete/${tutorialId}`)
}
export {
    getAllTutorialsService,
    getTutorialDetailsService,
    createTutorialService,
    editTutorialService,
    deleteTutorialService
}