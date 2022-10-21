/* Desenvolva sua lógica aqui...*/
function buttonAtive(){
    document.getElementById('btn').disabled= true;

    document.getElementById('profilename').addEventListener('input', (event)=>{
        let conteudo = document.getElementById('profilename').value;

        if(conteudo !== null && conteudo !== ''){
            document.getElementById('btn').disabled = false;
        } else{
            document.getElementById('btn').disabled= true;
        }
    })
}

buttonAtive()

async function searchProfileGit(){
    const form = document.querySelector('#form')

    form.addEventListener('submit',async (event)=>{
        event.preventDefault()

        let profilename = ''

        const profileevent = [...event.target]

        profileevent.forEach((element)=>{
            if(element.value)
            profilename=element.value
        })
        await userGitApi(profilename)
        
    })
}


async function userGitApi(user){
    const localError = document.querySelector('alert')
    try{
        const response = await fetch(`https://api.github.com/users/${user}`)
        const profileUser = response.json()
        await localStorage.setItem('profile', user)
        await window.location.replace('../profile/index.html')
        return profileUser
    }catch(error){
        localError.innerHTML = `<p class="alert-not-found">Usuário não encontrado</p>`
    }
}

searchProfileGit()

async function beginVisiter(){
    const local = document.querySelector('#profilesList')
    const profilevisit = getProfileVisit()
    console.log(profilevisit)
    local.innerHTML=""

    profilevisit.forEach((obj)=>{
        local.insertAdjacentHTML(
            "beforeend",
            `
            <li class="profile-record">
            <div>    
            <a href="" class="link2"><img class="img-profile" src="${obj.avatar_url}"  id="${obj.login}" alt=""></a>
            <p class="txt-perf">Acessar perfil</p>
            </div>
            </li>
            `
        )

    })

}

beginVisiter()

function acessProfile(){
    const links = document.querySelectorAll('.link2')
    const arquivo = localStorage.getItem('profile')

    links.forEach((clicked)=>{
        clicked.addEventListener('click',(event)=>{
            event.preventDefault()
            let profileClick = event.target
            let profileid = profileClick.id
            
            localStorage.setItem('profile', profileid)
            window.location.replace('../profile/index.html')

        })
    })

}

acessProfile()
