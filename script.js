
// 폼 요소에 들어갈 것들을 DOM을 사용하여 변수로 만들어내고 있다. 아이디로 지정된 것을 자바스크립트로 사용하기 위해 변수에 넣는 것을 의미하고 있다. 변수에 대한 선언을 한 군데에 모아도 괜찮을 것 같다. 변수를 미리 선언하면 되니까 말이다.
    const ul = document.querySelector("ul.discussions__container");

    const formBox =document.getElementById("form_box")
    const formId = document.getElementById("name");
    const formTitle = document.getElementById("title");
    const formText = document.getElementById("story");
    const formSubmit = document.getElementById("submit");
    
    
  // 이것은 배열 데이터에서 시간을 가져올때 즉 createdAt을 가져오는 경우 UTC를 기준으로 시간이 표시되기 때문에 그것을 바꾸어주는 함수라고 보면 된다. Date.prototype에 대해서는 생각을 해보아야겠지만 어떤 객체가 데이터 타입으로 정의되어 있다면 그것에서 메서드의 형태로 함수를 사용할 수 있다는 것이다. 즉 데이터 프로토타입으로 정의된 객체는 모두 이 메서드를 공통적으로 가져오기 때문에 이 함수를 사용할 수 있다는 것이다. 이 함수에 대해서는 밑에 있는 함수를 사용하는 것이 나아 보인다. 지금 이 함수는 사용하지 않고 있다.


//  Date.prototype.hours_minute_second_convert = function(){
//   let convertHours = this.getHours();
//   const convertMinute = this.getMinutes();
//   const convertSecond = this.getSeconds();
//   if(convertHours > 12){
//     convertHours = `오후 ${convertHours - 12}`;
//   }
//   else {
//     convertHours = `오전 ${convertHours}`;
//   }

//   return convertHours + ":" + convertMinute + ":" + convertSecond;
//  }

//   Date.prototype.yyyymmdd = function(){
//       const yyyy = this.getFullYear();
//       const mm = this.getMonth() < 9 ? 
//                       `0${this.getMonth() + 1}` : this.getMonth() +1;
//       const dd = this.getDate() < 10 ?
//         `0${this.getDate()}` : this.getDate();
//       return '' + yyyy + mm + dd;
//     }


    // chgUtcLocal은 UTC 시간 기준으로 받아온 데이터를 내가 표시하고 싶은 형태로 바꾸어주는 함수다. 결과적으로 이 함수는 chgDate를 리턴하고 있는데 이것은 내가 만들어낸 변수들을 모두 합쳐서 문자열 형태로 즉 시간 기준으로 치환해내는 것이다.

    function chgUtcLocal(date){
      let localDate;
      if(date instanceof Date){
        localDate = date;
      }else{
        localDate = new Date(date);
      }
      let nowMonth = (localDate.getMonth() + 1).toString();
      if((nowMonth).length === 1){
        nowMonth = "0" + nowMonth;
      }
    
      let nowDate = (localDate.getDate()).toString();
      if((nowDate).length === 1)
      nowDate = "0" + nowDate;
    
      let nowHours = localDate.getHours();
      if(nowHours > 12){
       nowHours = `오후 ${nowHours - 12}`;
      }
      else {
        nowHours = `오전 ${nowHours}`;
      }

      let nowMinutes = localDate.getMinutes().toString();
      if((nowMinutes).length === 1){
        nowMinutes = "0" + nowMinutes;
      }
      

      let nowSeconds = localDate.getSeconds().toString();
      if(nowSeconds.length === 1){
        nowSeconds = "0" + nowSeconds;
      }
      let chgDate = nowHours + ":" + nowMinutes + ":" + nowSeconds;
      return chgDate;
    }

    // saveDataLocalStorage 함수는 아고라데이터라는 키를 가진 로컬스토리지에 인자로 넣은 것을 저장하는데 그 인자로 넣은 것을 스트링리파이를 해서 즉 객체 형태를 문자열로 치환해서 밸류값으로 가지게 하는 함수다.
    const saveDataLocalStorage = (obj) => {
      localStorage.setItem('agoraData', JSON.stringify(obj));
      return;
    }


    // 그리고 이것은 아고라데이터라는 키에 아무것도 존재하지 않는다면(이 형태를 외우는 것이 중요해보이는데 이것이 널값으로 되어 있다면 즉 폴스 값이라면 이프문이 실행되는 형태이기 떄문에,) 세이브데이터로컬스토리지 함수를 사용할 것인데 이것은 아고라데이터라는 키에 어떤 밸류값을 넣어주는 것인데 그 밸류값은 아고라스테이츠디스커션이다. 그렇다면 이 함수가 실행되는 경우에는 아고라데이터라는 키에 아무것도 없으므로 로컬스토리지가 비어있다면 이 함수가 실행될 것인데, 새로고침을 하는 경우에 기본적으로 로컬스토리지가 존재하고 그것에는 아고라스테이츠디스커션이 들어가있다. 즉 새로고침하는 경우에 기본적으로 로컬스토리지가 존재하고 그것에서 데이터를 불러오는 형태이다. >>> 제대로 해석할 경우 아고라데이터에 아무것도 없을 경우에 겟 아이템을 하면 널 값 또는 언디파인드가 될 것이고 언디파인드를 !하면 트루가 되므로 아무것도 존재하지 않는다면 배열의 초기 요소를 가져오겠다는 것이다. 내가 이것을 직접 작성해볼 수 있어야 한다. 어떤 상황에서 무엇을 사용해야할지 변형해 보아야 한다.
    if (!localStorage.getItem('agoraData')) {
      saveDataLocalStorage(agoraStatesDiscussions)
    }

    // 겟데이터로컬스토리지는 지금 로컬데이터라는 변수를 만들어내는 함수이다. 정확히 말하면 로컬데이터라는 변수는 아고라데이터가 현재는 스트링파이해서 가지고 있는데, 이것을 파스해서 객체형태로 바꾸어주는 것이다. 로컬데이터에 저장되어있는 것은 문자열 형태로 저장되어있지만 우리가 로컬데이터라는 변수를 사용할 떄는 객체 형태로 사용하기 위해서 변형해주는 함수이다. 우리는 로컬 데이터를 사용을 여러번 하고 있는데 그것을 객체 형태로 바꾸어서 저장하는 것이다. 여기서 이런 작업이 필요한 이유는 바로 로컬스토리지에는 문자열만 넣을 수 있기 때문이다. 먼저 로컬스토리지에 문자열로 저장하는 것이 바로 setItem이고 getItem을 해서 가져올 때는 다시 객체로 가져오고 있다. 로컬데이터라는 변수는 위에서 정의되어 있지 않은데, 먼저 로컬스토리지를 초기에 만들어 넣고 그것은 문자열로 저장되어있으므로 객체형태로 변환해서 가져온다는 이야기이다.
    const getDataLocalStorage = (name) => {
      let localData = JSON.parse(localStorage.getItem(name))
      return localData;
    }


    let localData = getDataLocalStorage('agoraData')



    // 이것은 서브밋을 했을 때 어떤 기능이 필요한지에 대한 것이다. formBox라는 변수는 지금, 전체를 담고 있는 폼박스이다. 간단하게 말하면 폼이 시작되는 위치인 것이다. 여기에 이벤트리스너 서브밋을 해주어야 한다. 이 떄 어떤 이벤트를 e로 받고, 그 이벤트에 대해서 e.preventDefault()를 하여서 서브밋을 할 경우에 새로 고침을 하지 않고 있다. 그리고 폼에 입력된 데이터들을 하나씩 받아내고 있다. 서브밋 데이터라는 변수는 지금 서브밋을 입력하는 새로운 날짜를 만들어주는 함수이고, 폼오브젝트라는 변수에는 각각의 요소들을 다시 치환해주고 있다. 폼 아이디에 입력한 것, 폼 타이틀에 입력한 것, 그리고 현재 날짜, 그리고 우리가 사용할 이미지들을 고정시키고 있다. 여기서 만약 이미지들을 계속 받아오고 싶다면 이미지를 바꾸어주기 위한 배열을 만들어주고 반복문을 사용해서 새로운 것들을 넣어주면 될 것이다. 즉 배열이나 객체를 만들어내서 하나씩 데이터들을 뽑아내고 가장 앞쪽에 있는 데이터를 사용하는 형태가 되면 될 것이다. 그리고 여기서 서브밋을 하는 경우에 렌더링을 다시 하고 있다. 랜더링을 하기 전에 localData를 unshift를 사용해서 수정하고 있다. localData는 배열 형태로 저장되어 있을 것이고 그 로컬데이터라는 배열에 formObject라는 객체를 첫번째 요소로 추가하는 것이다. 그리고 세이브데이터로컬스토리지는 로컬 스토리지를 다시 만들어내는 함수인데, 로컬스토리지에 로컬데이터가 다시 만들어졌으므로 그것을 다시 문자열로 만들어서 다시 저장하는 것이 이벤트 서브밋이 될때 실행되는 것이다. 그리고 다시 랜더링을 시키고 있다. 원래 로컬스토리지를 사용하지 않았을 때는 append를 사용해서 리스트 요소를 하나를 추가해주었지만 로컬 스토리지를 사용하는 경우에는 로컬 스토리지에 저장되어있는 배열을 불러와서 그 배열에 요소를 집어 넣고 그것을 다시 로컬 스토리지에 저장하는 형태로 바뀌었다. 즉 append를 사용하는 것이 아니라 다시 배열 전체를 랜더링해준다는 것이다. 그리고 로컬스토리지를 사용하지 않았기 떄문에 파스나 스트링파이를 사용하지 않아도 되었기 떄문에 저장을 할 필요가 없다. 로컬스토리지를 사용하는 경우에 어펜드만 사용한다면 ??? 그 질문에 대해서는 현재 복잡해서 대답할 수 없을 것 같다.


    // 이벤트리스너에 대한 정리, 폼 서브밋에 대한 정리, 프리벤트디폴트에 대한 정리가 필요하다. 스토리지는 외울 수 있는 것이 적어도 이것은 공부할 수 있는 것이 많다.


    formBox.addEventListener('submit', function(e){
      e.preventDefault();
      const submitDate = new Date();
      const formObject = {
        id: formId.value,
        title: formTitle.value,
        createdAt: `${submitDate}`,
        avatarUrl: "https://avatars.githubusercontent.com/u/104333249?s=64&v=4"
      }
      // formToDiscussion(formObject);
      localData.unshift(formObject);
      saveDataLocalStorage(localData);
      totalRender(page);
    })
    

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다. 컨버트투디스커션은 돔을 만들어내는 함수다. 맨 처음에 있던 것은 리스트 하나로 된 구조인데, 그 구조를 새롭게 만들어내는 것이 컨버트투 디스커션이다. 아고라스테이트디스커션은 배열 형태로 인덱스 각각의 요소로 객체를 저장하고 있는 배열인데, 그 배열의 데이터를 가져와 하나씩 만들어주게 될 것인데, 그 리스트 구조를 만들어주는 함수가 바로 컨버트투 디스커션이다. 내가 돔 구조를 다루는 것에 약하므로 이 구조를 만들어내는 것을 암기하고 어펜드를 사용하는 방법에 대해서 생각을 해보아야 한다. 연습하기 위해서 하나의 구조를 쉽게 만들고 각각의 구조를 만들어내기 위한 빠른 방법을 생각해보자. 그리고 아래에 보면 TODO가 있는데 객체 하나에 담긴 정보를 DOM에 적절히 넣는 것이다. 우리가 가져올 데이터는 4개 정도인데, 이미지와 제목, 아이디, 그리고 만들어진 날짜이다. 우리는 돔 구조를 만들어냈고 그것의 어디에 데이터를 넣어야 하는지 여기서 지정을 해준 것이다.

const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정
  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const avatarImage = document.createElement("img");
  avatarImage.className = "discussion__avatar--image"
  avatarWrapper.append(avatarImage);
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionTitle = document.createElement("h2");
  discussionTitle.className = "discussion__title";
  const discussionLink = document.createElement("a");
  discussionContent.append(discussionTitle);
  discussionTitle.append(discussionLink);

  // 여기서 링크 연결 a href 하는 방법은???

  const discussionInformation = document.createElement("div");
  discussionInformation.className = "discussion__information";
  discussionContent.append(discussionInformation);
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";
  const discussionAnswered__check = document.createElement("p");
  discussionAnswered__check.textContent = "☑"
  discussionAnswered.append(discussionAnswered__check);

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.
  avatarImage.src = obj.avatarUrl;
  discussionTitle.textContent = obj.title;
  discussionInformation.textContent = `${obj.id} / ${chgUtcLocal(obj.createdAt)}`;
  li.append(avatarWrapper, discussionContent, discussionAnswered);
  
  return li;
};


// 아래에 정의된 변수들은 내가 현재 HTML에 버튼 요소를 넣어주었기 떄문에 그 돔요소를 가져온 것, 그리고 페이지의 계산에 대한 변수들이다. 이것을 직접 내가 새롭게 구현할 수 있도록 암기해야 한다. 이 구조를 암기하면 버튼 자체를 만들어낼 수 있을 것이다. 넘오브컨텐트는 아고라스테이츠 디스커션의 길이를 가져온다(아마 여기서 오류가 발생해서 나중에 다른 작업을 해주었던 듯 하다 이것을 로컬스토리지의 길이를 바꾸어주어야 한다. 아고라스테이츠의 길이는 고정되어있기 떄문이다!!!!!). 그리고 맥스컨텐츠는 최대 몇개의 컨텐츠를 나타낼 것이냐 하는 것이고, 맥스버튼은 한 페이지에 몇 개의 버튼을 보여줄까 하는 것이다. 그리고 맥스페이지라는 변수가 중요한데, numofContent를 maxContent로 나눈 것이다. 즉 몇개의 페이지가 필요한지에 대해서 계산 하는 것이다. 그리고 렛 페이지는 1이라고 설정해두었는데 이것의 의미는 지금 정확하게 알지는 못하겠다.

const contents = document.querySelector(".contents");
const buttons = document.querySelector(".buttons");
const numOfContent = localData.length -1;

const maxContent = 5;
const maxPage = Math.ceil(numOfContent / maxContent);
let page = 1;
const maxButton = 5;

// const showContent = 5;
// const showButton = 5;

// 메이크버튼이라는 함수는 아이디를 인자로 받아서 버튼을 만들어주는 함수다. 즉 이것은 버튼을 몇개를 만들어낼지에 대한 함수이다. 왜냐하면 버튼은 클래스리스트로 계속 추가될 것인데, 여기서 몇 개의 버튼을 만들어낼지에 대해서 결정하는 함수이고 그것은 HTML로 나타나기 때문에 돔 조작을 해주고 있는 것이다. 만들어낸 버튼에 클래스 이름을 추가하는 것이 바로 add이고, dataset.num은 여기서 어떤 모듈을 사용하고 있는데 그 모듈에 버튼들의 숫자를 결정하는 형태의 메서드라고 생각하면 된다. 여기서 아이디로 사용하고 있는 것은 숫자이다. 그렇다면 어디서 아이디를 받아오는지에 대해서 생각을 해보자. 그리고 버튼을 눌렀을 경우에 어떤 이벤트가 발생하고 있는데, 그것은 다른 것을 눌렀을 때 액티브를 지우고, 그 다른 요소에 액티브를 달아주는 것이다. 이 구조에 대해서는 정확히 이해하기 어려우므로 다른 함수를 만들거나 해야하는데 그럴 경우에 우리가 사용하는 모듈을 사용하지 않아야 한다. 모듈에 대해서 이해를 하면 될 것이고 우리가 이것을 직접 만들어주는 경우도 생각을 해보아야 할 것이다. 랜더컨텐트는 아래에 다른 함수를 사용하고 있는데 그것에 대해서 생각을 해보자. 그리고 여기서 버튼을 새롭게 만들어냈으므로 메이크버튼 함수는 버튼이라는 것을 다시 리턴해주는 함수이다.

const makeButton = (id) => {
  const button = document.createElement("button");
  button.classList.add("button");
  button.dataset.num = id;
  button.innerText = id;
  button.addEventListener("click", (e) => {
    Array.prototype.forEach.call(buttons.children, (button) => {
      if (button.dataset.num) button.classList.remove("active");
    });
    e.target.classList.add("active");
    renderContent(parseInt(e.target.dataset.num));
  });
  return button;
};

// 랜더컨텐트라는 함수를 메이크 버튼에서도 사용하고 있다. 이 함수는 와일문을 사용하고 있는데, ul이 hasChildNodes를 실행했을 때 트루이면 라스트 차일드를 계속 지워나간다. 이것이 왜 필요한지에 대해서 잘 모르겠다. 전체를 이해해야 알 수 있는 부분인 것 같다. 그리고 랜더3은 이름을 바꾸어야겠지만, 화면에 몇 개의 글을 만들어줄지에 대한 함수이다. 이 떄 아이디라는 요소가 많이 사용되고 있다. 이 아이디가 무엇일까. 현재의 페이지가 1 페이지라면 id는 0부터 시작한다. 그리고 최대치를 넘지 않는 경우에는 5개까지 반복된다. 그리고 그것에 대한 로컬데이터를 불러온다는 것이다. 즉 전체를 만들어내는 것이 아니라 로컬 데이터의 요소는 우선 40개 정도 있을 텐데 그것에 대해서 부분적으로 가져온다는 이야기이다. 이 수식에 대한 이해가 페이지네이션의 핵심이다. 우리는 데이터를 불러와서 랜더링할 것인데, 한 화면에 5개만 불러올 것인데, 그것이 각각의 페이지에 따라 어떻게 바뀔 것인가 하는 것이다. 밑에 페이지라는 변수에 들어있는 숫자를 바꾸는 함수, 즉 페이지가 이동될때 숫자가 바뀔텐데, 그 숫자에 따라 이 for문이 다르게 실행되는 것이다. 그렇다면 페이지가 바뀌어서 2 페이지라면, id는 6부터 시작된다 페이지 3에서는 11부터 시작한다. 즉 5개의 데이터만을 불러온다는 것이다. 그리고 조건문에서 &&된 것은 전체 데이터를 넘지 않는 아이디만을 가져온다는 것이다. 아이디는 0부터 시작하고 그것은 배열의 첫번째 요소를 가져온다는 것이다. 아마 그래서 길이에서 1 뺴준것 까지만 가져오게 설정이 되는 것 같다. 그리고 여기서 하나가 불러오지 않는 것은 id가 처음 시작이 1이기 떄문이다. 복붙해온 것에서는 요소를 1번부터 시작해주었지만 우리는 아이디를 사용한 것을 배열의 요소 하나씩을 불러올 것이기 떄문에 0부터 시작해야 한다. 컨버트투디스커션은 리스트 요소 하나를 만들어주는 것이고 그 인자로 사용한 로컬데이터아이디는 배열의 데이터 하나의 요소씩을 가져오는 구조이다. 그렇게 복붙한 것을 바꾸어낸 것이기 때문에 0이 되는 것이 맞다. 그리고 그 함수는 포문을 실행시키는 것으로 끝을 내기 위해서 리턴 값은 아무것도 존재하지 않는다. 여기서 ul을 인자로 받아서 렌더로컬데이터를 실행하면 리턴 값은 없지만 ul에 모든 요소들이 추가 된다. 이것을 다시 전체 렌더함수에서 사용하고 있다.

const renderContent = (page) => {
  // 목록 리스트 초기화

  while (ul.hasChildNodes()) {
    ul.removeChild(ul.lastChild);
  }

  const renderLocalData = (element) => {
    for (let id = (page - 1) * maxContent; id <= page * maxContent - 1 && id <= numOfContent; id++) {
      element.append(convertToDiscussion(localData[id]));
    }
    return;
  };
  renderLocalData(ul);
};


// 이것은 버튼의 넘버링을 바꾸어주는 것, 버튼이 12345가 되어있다가 이것을 누르면 678 이런식으로 바뀌게 될 것이다.(이것의 역으로 움직인다. 프리브페이지이니까 말이다.) 그리고 다시 랜더를 해준다. 페이지가 바뀌었으니 지금의 페이지에 맞게 요소가 나타난다. 이것을 누르면 페이지는 -5가 된다. 

const goPrevPage = () => {
  page -= maxButton;
  totalRender(page);
};

const goNextPage = () => {
  page += maxButton;
  totalRender(page);
};

// <ion-icon name="chevron-forward-outline" role="img" class="md hydrated" aria-label="chevron forward outline"></ion-icon>

const prev = document.createElement("button");
prev.classList.add("button", "prev");
prev.innerHTML = '<ion-icon name="chevron-back-outline"></ion-icon>';
prev.addEventListener("click", goPrevPage);


const next = document.createElement("button");
next.classList.add("button", "next");
next.innerHTML = '<ion-icon name="chevron-forward-outline"></ion-icon>';
next.addEventListener("click", goNextPage);

// 이 부분만 이해하면 끝이 난다.

const renderButton = (page) => {

  // 버튼 리스트 초기화
  while (buttons.hasChildNodes()) {
    buttons.removeChild(buttons.lastChild);
  }

  // 화면에 최대 5개의 페이지 버튼 생성
  for (let id = page; id < page + maxButton && id <= maxPage; id++) {
    buttons.appendChild(makeButton(id));
  }

  // 첫 버튼 활성화(class="active")
  buttons.children[0].classList.add("active");
  buttons.prepend(prev);
  buttons.append(next);

  // 이전, 다음 페이지 버튼이 필요한지 체크
  if (page - maxButton < 1) buttons.removeChild(prev);
  if (page + maxButton > maxPage) buttons.removeChild(next);
};

const totalRender = (page) => {
  renderContent(page);
  renderButton(page);
};

totalRender(page);


// 기능을 추가하고 싶은데 어떤 기능을 추가할까? 목록에 있는 요소들을 삭제하는 것을 추가해보자. 돔 요소에 대한 공부가 될 것이다.


