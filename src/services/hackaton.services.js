import service from "./config.services.js";

const getAllHackatonsService = () => {
    return service.get("/home/hackaton-list")
}

const getHackatonDetailsService = (hackatonId) => {
    return service.get(`/hackaton/details/${hackatonId}`)
} 

const createHackatonService = (newHackaton) => {
    return service.post("/hackaton/create", newHackaton)
}

const editHackatonService = (hackatonId, updatedHackaton) => {
    return service.patch(`/hackaton/edit/${hackatonId}`, updatedHackaton)
}

const deleteHackatonService = (hackatonId) => {
    return service.delete(`/hackaton/delete/${hackatonId}`)
}

const getHackatonByCityService = () => {
    return service.get("/hackaton/cercaDeTi")
}

export {
    getAllHackatonsService,
    getHackatonDetailsService,
    createHackatonService,
    editHackatonService,
    deleteHackatonService,
    getHackatonByCityService
}