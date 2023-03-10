import service from "./config.services.js";

const getAllTutorialsService = () => {
    return service.get("/home/tutorial-list")
}

const getTutorialDetailsService = (tutorialId) => {
    return service.get(`/details/${tutorialId}`)
} 

const createTutorialService = (newTutorial) => {
    return service.post("/tutorial/create", newTutorial)
}

const editTutorialService = (tutorialId, updatedTutorial) => {
    return service.patch(`/edit/${tutorialId}`, updatedTutorial)
}

const deleteTutorialService = (tutorialId) => {
    return service.delete(`/delete/${tutorialId}`)
}


export {
    getAllTutorialsService,
    getTutorialDetailsService,
    createTutorialService,
    editTutorialService,
    deleteTutorialService
}