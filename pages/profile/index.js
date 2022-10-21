/* Desenvolva sua lógica aqui...*/
const listprofile = []

async function renderUser(){
    const user = localStorage.getItem('profile')
    const newUser = await fetch(`https://api.github.com/users/${user}`)
    const userJson = await newUser.json();  
    


    const localUser = document.querySelector('#profile');

    localUser.insertAdjacentHTML(
        "afterbegin",
        `
        <div class="profile-inside">
          <img class="profile-img" src="${userJson.avatar_url}" alt="">
          <div class="profile-desc">
            <h3 class="profile-name">${userJson.name}</h3>
            <p class="profile-job">${ userJson.bio}</p>
          </div>
        </div>
        `
    )

    pushOrnot(userJson)


}



async function renderRepo(){
    const user = localStorage.getItem('profile')
    const localRepo = document.querySelector('#list-projects');
    const repodata = await fetch(`https://api.github.com/users/${user}/repos`)
    const repository = await repodata.json();


   await repository.forEach(obj => {
        localRepo.insertAdjacentHTML(
            "beforeend",
            `
            <li class="project-container">
                <h3 class="project-name">${obj.name}</h3>
                <p class="project-desc">${obj.description}</p>
                <div class="project-buttons">
                    <a class="button-repo" href="${obj.html_url}" target="_blank">Repositorio</a>
                    <a class="button-link" href="https://${user}.github.io/${obj.name}/" target="_blank">Demo</a>
                </div>
            </li>
            `
        )   
    });    
}

renderUser()
renderRepo()