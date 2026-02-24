

// initialize the scrollama
var scroller = scrollama();

// scrollama event handlers
function handleStepEnter(response) {
    // response = { element, direction, index }

    // add to color to current step
    response.element.classList.add("is-active");
    //get attribute data-background from element
	let bg=response.element.getAttribute("data-background");
			// console.log(bg)
			// change body color to this attribute
			document.body.style.backgroundColor=bg;

}

function handleStepExit(response) {
    // response = { element, direction, index }
    //console.log(response);
    // remove color from current step
    response.element.classList.remove("is-active");
}

function handleStepProgress(response) {
   /* if(response.progress < 0.5){
        response.element.children[0].style.opacity = (1.0-response.progress);
    }else{
        response.element.children[0].style.opacity = (response.progress);
    }*/
    

}

function init() {


    // 1. setup the scroller with the bare-bones options
    // 		this will also initialize trigger observations
    // 2. bind scrollama event handlers (this can be chained like below)
    scroller
        .setup({
            step: "#container .step",
            debug: false,
            offset: 0.5,
            progress: true
        })
        .onStepEnter(handleStepEnter)
        .onStepExit(handleStepExit)
        .onStepProgress(handleStepProgress);

}

// kick things off
init();



// 1) 오디오 요소 가져오기
const audioEng = document.getElementById('audio-eng');
const audioKor = document.getElementById('audio-kor');

// 2) 클릭 대상 가져오기
const engPara = document.querySelector('.paragraph.english');
const korPara = document.querySelector('.paragraph.korean');

// 3) 영어 텍스트 클릭 시 영어 오디오 재생
engPara.addEventListener('click', () => {
  audioKor.pause();
  audioKor.currentTime = 0;
  audioEng.play();
});

// 4) 한국어 텍스트 클릭 시 한국어 오디오 재생
korPara.addEventListener('click', () => {
  audioEng.pause();
  audioEng.currentTime = 0;
  audioKor.play();
});
