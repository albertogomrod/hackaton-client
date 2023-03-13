import service from "./config.services.js";

const getProfileService = ()=>{
return service.get(`/profile`)
}

const deleteProfileService = ()=>{
    return service.delete(`/profile/delete`)
}

const editProfileService = (updatedProfile) => {
    return service.patch(`/profile/edit`, updatedProfile)
}

const getHackatonByProfile = () => {
    return service.get("/profile/hackaton-list-company")
}

export {
    deleteProfileService,
    editProfileService,
    getProfileService,
    getHackatonByProfile
}