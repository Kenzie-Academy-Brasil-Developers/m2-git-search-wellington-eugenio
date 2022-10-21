function getProfileVisit(){
    return JSON.parse(localStorage.getItem('profiles')) || []
}

function profileExists(user){
    return getProfileVisit().findIndex(element => element.name === user.name)
}

function pushOrnot(user){
    const profileExist = profileExists(user)
    let profilesList = getProfileVisit()

    if(profileExist < 0){
        profilesList = [...profilesList, user]
    }else{
        profilesList = [...profilesList]
    }
    localStorage.setItem('profiles', JSON.stringify(profilesList))
}

