let users = []


$.ajax({
    url: 'https://randomuser.me/api/?results=5&inc=name,gender,picture&noinfo',
    dataType: 'json',
    success: function(data) {
      users = data.results
      users.forEach((user, id)=> getPhoto(user.picture.large, id))
    }
    
  });


  function getPhoto(urlPhoto, id) {
    let icons = document.querySelector('.title--icons')
    let img = new Image(); 
    img.src = urlPhoto;
    img.id = `img_${id}`
    img.alt = 'alt';
    
    icons.appendChild(img);
  }

// открыть блок 5 при загрузке
let page=6
const btrIcons = document.querySelector('.add_icons')

btrIcons.addEventListener('click', ()=> {
  const icons = document.querySelector('.icons__item')
  icons.style.display = "flex"
  const title = document.querySelector('.trello__title')
  
  users.forEach((user,id) => { 
    const userInfo = document.createElement('div')
    userInfo.classList.add(`user_info`)
    userInfo.id = `user_info_${id}`
    userInfo.innerHTML = `
                    <img class="user" src="${user.picture.large}">
                    <p>${user.name.first} ${user.name.last}</p>
                    <div onclick="deleteUser(${id})"> <p>X</p> </div>
                      `
    title.append(icons)
    icons.append(userInfo)
  })
}) 

//создать юзеров +1
let qt=5
function addUser() {
  $.ajax({
    url: `https://randomuser.me/api/?page=${page}&results=1`,
    dataType: 'json',
    success: function(data) {
      page++
      console.log(data);
      users.push(data.results[0])
      let user = users[users.length - 1]
      console.log(users)
      getPhoto(user.picture.large, qt)

      const title = document.querySelector('.trello__title')
      const icons = document.querySelector('.icons__item')
      const userInfo = document.createElement('div')
      userInfo.classList.add(`user_info`)
      userInfo.id = `user_info_${qt}`
      userInfo.innerHTML = `
                       <img class="user" src="${user.picture.large}">
                       <p>${user.name.first} ${user.name.last}</p>
                       <div onclick="deleteUser(${users.length - 1})"> <p>X</p> </div>
                         `
      title.append(icons)
   
      icons.append(userInfo)
     qt++
    }
  });  
}

//создать юзеров
const addUsers = document.querySelector('.add_users')
addUsers.addEventListener('click', ()=> {
  console.log(users.length)
  if(users.length==10){
    addUsers.style.display = "none"
    alert('No')
  }
  else {
     addUser()
  }
 
})


// delete
function deleteUser(id) {
  const userInfo = document.querySelector(`#user_info_${id}`)
  const photo = document.querySelector(`#img_${id}`)
  const addUsers = document.querySelector('.add_users')
  addUsers.style.display = "block"
  if(users.length==1) {
    alert('No')
  }
  else {
    
    users=users.splice(id,6) 
    userInfo.remove()
    photo.remove()
    console.log(users, id)
   
  }
   
}


  // function iconsUser() {
  //   const userInfo = document.querySelector('.list__item')
  //   const iconsUser = document.createElement('div')
  //   iconsUser.classList.add(`user_info`)
    
  //   userInfo.append(iconsUser)
  //   iconsUser.append(img);

  // }
   

// close 
function closeUser() {
  const users = document.querySelector('.icons__item')
  users.style.display = "none"

}
