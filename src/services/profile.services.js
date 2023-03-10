import service from "./config.services.js";

const getProfileService = ()=>{
return service.get(`/profile`)
}

const deleteProfileService = ()=>{
    return service.delete(`/profile/delete`)
}

const editProfileService = (profileId, updatedProfile) => {
    return service.patch(`/profile/edit/${profileId}`, updatedProfile)
}

export {
    deleteProfileService,
    editProfileService,
    getProfileService,
}