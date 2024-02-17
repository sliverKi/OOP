const h1 = document.querySelector('h1');
//const h1 = document.getElementById('Dive')
h1.textContent = "New text I'm h1 tag";
h1.style.backgroundColor = 'pink';

// const ul = document.querySelector('ul');
// ul.style.border = '1px solid red';

// const li = document.querySelectorAll('.list-item');

// for (const el of li) { 
//     console.log(el)
//     el.textContent = "new Content"
//     el.style.border = "2px solid green"
//     el.style.backgroundColor = "tomato"
// } 

// console.log(ul.previousElementSibling)
// console.log(ul.previousSibling)
// console.log(ul.parentNode)
// console.log(ul.parentElement)

const h2Tag = document.getElementsByTagName('h2')[0]
h2Tag.style.backgroundColor = 'yellow';
h2Tag.textContent = "I'm h2"


let ul = document.body.firstElementChild//body의 첫번째 자식 요소 선택 
console.log(ul)//header선택
console.log(ul.nextElementSibling)//header다음의 형제 요소 선택  : ul tag 선택 
ul = ul.nextElementSibling
const firstLi = ul.firstElementChild;
console.log(firstLi) 
const section = document.querySelector('section')
const button = document.querySelector('button')

const list = document.querySelector('ul')
//list.innerHTML += '<li>new Content</li>'//전체 ul tag가 다시 렌더링 됨~> 성능 떨어짐, 브라우저가 다시 분석함, 사용자 경험이 적어질 수 있어 



section.className = 'red-bg';
button.addEventListener('click', () => { 

    // if (section.className === 'red-bg visible') {
    //     section.className = 'red-bg invisible'
    // } else { 
    //     section.className = 'red-bg visible'
    // }
    section.classList.toggle('visible');//주석되어진 조건문과 동일함. 
    section.classList.toggle('invisible');

    //classList : 해당 요소에 자동으로 className을 검사함.

})


//section.innerHTML = '<h2> A new TITLE! </h2>';
//innerHTML : 새로운 HTML code로 대체 되어짐~> section 태그 사이에 있는 이전 노드, 직속 자식 노드, 자손들도 모두 세롭게 대체됌


const div = document.querySelector('div')
//div.innerHTML += '<p>Something went to wrong! <p>'//새로운 요소가 렌더링 되기 때문에 사용자가 기존에 입력한 코드는 잃게 됌~> 기존의 코드에 뭔가를 추가해야 할때 innerHTML사용이 적합하지 않음

//사용자의 입력값을 유지하는 방법
//새로운 코드를 기존의 코드를 유지한 채로 추가하는 방법 
//요소를 한번 이상 삽입하게 되면 복사되지 않고 이동함

//1. insertAdjacentHTML('위치', '추가할 코드')
// 단점 : 삽입된 요소에 관한 직접 엑세스가 누락되어 문제될 수 있음 ex.)이벤트 리서너를 추가하는 코드를 작성한 경우
//2. createElement()
div.insertAdjacentHTML('beforeend', '<p>Something went to wrong! <p>')


const newLi = document.createElement('li')
newLi.textContent = 'test4'
//list.append(newLi)//==appendChild 마지막 요소에 삽입하겠다.
//list.prepend(newLi)//newLi를 가장 첫번째 요소로 삽입하겠다.
//list.lastElementChild.before(newLi)//현재리스트의 마지막 항목 앞에 삽입하고 싶다.
//list.firstElementChild.after(newLi)
//list.firstElementChild.replaceWith()//첫번째 요소를 삭제 함
//주의: before, after은 inerternetExplore와 Safari에서 지원돼지 않음,
newLi.style.color = 'green' 


const secondLi = list.children[1]
secondLi.insertAdjacentElement('afterend', newLi)


//요소 복제 
//노드를 복제하여 새로운 노드를  반환하는 것 

//newLi.cloneNode(false) //default : false ~> 중첩요소는 복제 되지 않음 / true: 전체 자손 요소가 복제의 일부가 됌 
const cloneNewLi = newLi.cloneNode(true)
cloneNewLi.style.color = 'blue' 
list.append(newLi, cloneNewLi)




