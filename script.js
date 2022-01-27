const lists = document.querySelectorAll('.list')
const button = document.querySelector('.add--board') 
const dot = document.querySelector('.dot')
let settingsApp = document.querySelector('.info-background')



let countBoard = 1
button.addEventListener('click', ()=> {
   addBoard() 
   countBoard++
    
}) 
function addBoard(title='Введите название', attribute="true"){

   const boards = document.querySelector('.boards')
   const board = document.createElement('div')
   board.id=`boards_${countBoard}`
   board.classList.add(`boards__item`)

   board.innerHTML = `
            <div class="list_style">
                 <span contenteditable=${attribute} >${title}</span>
                <span onclick="appBlock(${countBoard})"  class="dot">...</span>


                
            </div>
            <div class="list">
                
            </div>
            
            <div class="form">
                    <textarea class="textarea" placeholder="Введите название карточки"></textarea>
                    <div class="buttons">
                        <button onclick="createTask(${countBoard})" id="add_${countBoard}" class="add__item-btn">Добавить карточку</button>
                        <button  onclick=" closeForm(${countBoard})" class="cansel__item-btn">Отмена</button>
                    </div>
        </div>

             <div class="add__btn" onclick="addTaskNew(${countBoard})">
                <span>+</span> Добавить карточку
             </div>


             

                <div id="setings_board_${countBoard}"  class="setings_board">
                    <div class="board_top">
                        <h2>Настройки</h2>
                        <div onclick="boardClose(${countBoard})" class="close_settings" >X</div>
                    </div>
                    <div class="board_main">
                        <div class="background"> 
                            <h3>
                                1. Изменить фон   
                            </h3> 
                            <div class="board-background-color">
                                <div onclick="styleboard1(${countBoard})" class="red"></div>
                                <div onclick="styleboard2(${countBoard})" class="green"></div>
                                <div onclick="styleboard3(${countBoard})" class="black"></div>
                                <div onclick="styleboard4(${countBoard})" class="blue"></div>
                                <div onclick="styleboard5(${countBoard})" class="pink"></div>
                                <div onclick="styleboard6(${countBoard})" class="orange"></div>
                            </div>
                        </div>
                        <div onclick="boardDelete(${countBoard})" class="delete"> 
                                <h3>
                                    2. Удалить 
                                </h3>
                        </div>
                    </div>
                    <style>
                        #boards_${countBoard} {
                            position: relative;
                        }
                    </style>
                </div>
   `
   boards.append(board)  //в boards помещаем board
   changeTitle() // функция отвечает за очистку доски от названия
   dragNdrop()  // функция отвечает за перемещение карточек

}

let boardsTitle = ['To Do','In Progress','Done']
let attribute = ['false','false','false']
function loadBoads(count) {
    for (let i= 0; i<count; i++) {
        addBoard(boardsTitle[i], attribute[i])
        countBoard++

    }
    
}
loadBoads(3)


function addTaskNew(e) {
    const form = document.querySelector(`#boards_${e}>.form`)
    form.style.display = 'block'
    const  btn = document.querySelector(`#boards_${e}>.add__btn`)
     btn.style.display = 'none'
}
 

//создаем новую задачу
let amt=1   
function createTask(e)  {
    const list = document.querySelector(`#boards_${e}>.list`)
    let textarea = document.querySelector(`#boards_${e}>.form>textarea`)
    const form = document.querySelector(`#boards_${e}>.form`)
    const  btn = document.querySelector(`#boards_${e}>.add__btn`)
    let len = list.children.length;
   
    if (len<10) {
        const newItems = document.createElement('div') //создаем новый элемент 
        newItems.classList.add(`list__item`) //создаем новый элемент c класом list__item
        newItems.draggable = true   //создаем новый элемент c атрибутом
        newItems.textContent = textarea.value   // добавляем текст, которая храница в value 
        list.append(newItems) //сохраняем newItems в т lists
           
        // при введение текста убираем форму и лишние кнопки
        form.style.display = 'none'  
        textarea.value = '' 
        btn.style.display = 'flex'

            // filter
        const info = document.createElement('div')
        info.classList.add(`info_filter`)
        const filters = document.createElement('div')
        filters.classList.add(`filter`)
        const filter = document.createElement('div')
        filter.classList.add(`filter_item`)
        filter.classList.add(`filter_${amt}`)
        filters.innerHTML = `<div onclick="addFilter(this)">+</div>`

        newItems.append(info)
        info.append(filters)
        filters.append(filter)

        //DATA

        let dataNew = new Date 
        const data = document.createElement('div')
        data.classList.add(`data`)
        data.innerHTML = `${dataNew.getDate()} ${dataNew.getMonth()+1} ${dataNew.getFullYear()}`
        info.append(data)
       
        // data.addEventListener('click', )
      
        // изменить
        const change = document.createElement('div')
        change.classList.add(`change`)
        change.innerHTML = `
        <i class="fa fa-pencil fa-fw change__item"></i>
        <i class="fa fa-trash fa-fw delete_item" ></i>
        `
        newItems.append(change)


        //  отвечает за измениния задач из list__item
        const  changeItem = document.querySelector(`.change__item`)
        changeItem.addEventListener('click', () => {    
            let nnnnn = newItems.textContent 
    
            nnnnn = "12345"
            console.log(nnnnn)
        })

    }
   else { 
       form.style.display = 'none'
       textarea.value = '' 
       btn.style.display = 'flex'
       alert('Нельзя ввести больше 10 задач!')
      
   }

    dragNdrop()

    changeTitle() // функция отвечает за очистку доски от названия
  }

  function closeForm(e)  {
    const form = document.querySelector(`#boards_${e}>.form`)
    form.style.display = 'none'
    let textarea = document.querySelector(`#boards_${e}>.form>textarea`)
    textarea.value = ''
  }


// функция отвечает за очистку доски от названия
function changeTitle() {
    const titles = document.querySelectorAll(`.title`) 
     titles.forEach( title => {
            title.addEventListener('click', e => e.target.textContent = '')
        })
        
}
changeTitle()


            // filter

function addFilter(e) {
    if(amt<3){
        const filters = document.querySelector('.filter')
        const filter = document.createElement('div')
        filter.classList.add(`filter_item`)
        filter.classList.add(`filter_${amt+1}`)
        filters.append(filter)
            amt++
    } else {
        alert('Не возможно больше создавать фильтры!')
    }
}

function deleteFilter(e) {
    const filter = document.querySelector(`.filter_item`)
      filter.addEventListener('dblclick', () => {
        //   let a = confirm('Delete filter?') 
        //   if(a==true) {
        //      e.filter.remove() 
        //   }  
          filter.remove() 
        })
}

const btrIconsFilter = document.querySelector('.title_filter')
btrIconsFilter.addEventListener('click', ()=> {
    setingsFilter()
})
 

function setingsFilter() {
    const  allFilter = document.querySelector(`.filter_all`)
    allFilter.style.display ='flex'
        allFilter.innerHTML = `
        <div class = "filter_top">
            <div onclick="closeFilter()" class ="close_filter">x</div>
        </div>
        <div class = "filter_main">
            <div class ="filter_1"></div>
            <div class ="filter_2"></div>
            <div class ="filter_3"></div>
            <div class ="filter_4"></div>
        </div>
        `
}


function closeFilter() {
    const  allFilter = document.querySelector('.filter_all')
    allFilter.style.display ='none'
}

// функция отвечает за перемещение карточек
let draggedItem = null

function dragNdrop() {
    const listItems = document.querySelectorAll('.list__item') 
    const lists = document.querySelectorAll('.list') 

    for ( let i =0; i<listItems.length; i++){
        const item = listItems[i]


//  отвечает за вытаскивание задач из list__item
        item.addEventListener('dragstart', () => { 
            draggedItem = item
            setTimeout( () => {
                item.style.display = 'none'
            }, 0) //задержка
        } )


//  отвечает за возвращение задач из list__item
        item.addEventListener('dragend', () => {  
            setTimeout( () => {
                item.style.display = 'block'
                draggedItem = null
            })
        })

//  отвечает за удаление задач из list__item
        const  deletItem = document.querySelector(`.delete_item`)
        deletItem.addEventListener('click', () => {    
            item.remove()
        })
//  //  отвечает за измениния задач из list__item
//         const  changeItem = document.querySelector(`.change__item`)
//         changeItem.addEventListener('click', () => {    
//             // const listItemsNew = document.querySelector('.list__item') 
//             // listItemsNew.setAttribute(contenteditable, true)
//             // let imf = listItemsNew.textContent
//             // console.log(imf)
//         })


        for(let j =0; j<lists.length; j++){
            const list = lists[j]


            list.addEventListener('dragover', e => e.preventDefault())

            //создаем тень
            list.addEventListener('dragover', function (e) {
                e.preventDefault()
                this.style.backgroundColor = 'rgba(0,0,0,.3)'

            })


            list.addEventListener('dragleave',  function (e) {
                e.preventDefault()
                this.style.backgroundColor = 'rgba(0,0,0,0)'
             } )

            list.addEventListener('drop',  function (e) {
                this.style.backgroundColor = 'rgba(0,0,0,0)'
                this.append(draggedItem)
            })
        }

    }
}
dragNdrop()


