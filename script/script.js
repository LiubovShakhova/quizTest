// OBRABOCHIK SOBITIY, otslezivaet zagruzku kontenta______________
document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  const btnOpenModal = document.querySelector('#btnOpenModal');
  const modalBlock = document.querySelector('#modalBlock');
  const closeModal = document.querySelector('#closeModal');
  const questionTitle = document.querySelector('#question');
  const formAnswers = document.querySelector('#formAnswers');
  const burgerBtn = document.getElementById('burger');
  const nextButton = document.querySelector('#next');
  const prevButton = document.querySelector('#prev');
  const modalDialog = document.querySelector('.modal-dialog');
  const sendButton = document.querySelector('#send');
  const modalTitle = document.querySelector('.modal-title');

  let myVar = 2;
  
  /*if (myVar < 3) {
    console.log('myVar < 3');
  }
  if (myVar = 3) {
    console.log('myVar = 3');
  }
  if (myVar > 3) {
    console.log('myVar > 3');
  }*/
  switch(true) {
      case (myVar === 1):
        console.log('myVar < 3');
        break;
      case (myVar === 2):
        console.log('myVar = 2');
        break;
      default:
        console.log('nix');
  }
  //for (i = 0; i <= 5; i++) {}
  
 /* const string = `"etwas"`;
  console.log(`Ich liebe ${string} Großes`);*/

//QUESTION-ANSWERS________________________________
  const questions = [
    {
        question: "Какого цвета бургер?",
        answers: [
            {
                title: 'Стандарт',
                url: './image/burger.png'
            },
            {
                title: 'Черный',
                url: './image/burgerBlack.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Из какого мяса котлета?",
        answers: [
            {
                title: 'Курица',
                url: './image/chickenMeat.png'
            },
            {
                title: 'Говядина',
                url: './image/beefMeat.png'
            },
            {
                title: 'Свинина',
                url: './image/porkMeat.png'
            }
        ],
        type: 'radio'
    },
    {
        question: "Дополнительные ингредиенты?",
        answers: [
            {
                title: 'Помидор',
                url: './image/tomato.png'
            },
            {
                title: 'Огурец',
                url: './image/cucumber.png'
            },
            {
                title: 'Салат',
                url: './image/salad.png'
            },
            {
                title: 'Лук',
                url: './image/onion.png'
            }
        ],
        type: 'checkbox'
    },
    {
        question: "Добавить соус?",
        answers: [
            {
                title: 'Чесночный',
                url: './image/sauce1.png'
            },
            {
                title: 'Томатный',
                url: './image/sauce2.png'
            },
            {
                title: 'Горчичный',
                url: './image/sauce3.png'
            }
        ],
        type: 'radio'
    }
];



  /*questions.answers.forEach((item, index, arr) => {
    console.log(item);
    console.log(index);
    console.log(arr);
  });*/


  let clientWidth = document.documentElement.clientWidth;

  if (clientWidth < 768) {
    burgerBtn.style.display = 'flex';
  } else {
    burgerBtn.style.display = 'none';
  }

  window.addEventListener('resize', function() {
    clientWidth = document.documentElement.clientWidth;
    
    if (clientWidth < 768) {
      burgerBtn.style.display = 'flex';
    } else {
      burgerBtn.style.display = 'none';
    }
  });

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.add('active');
    
    modalBlock.classList.add('d-block');
    playTest();
});

let count = -100;
let interval;
modalDialog.style.top = count + '%';

const animateModal = () => {
    modalDialog.style.top = count + '%';
    count += 3;
    interval = requestAnimationFrame(animateModal);

    if (count >= 0) {
      cancelAnimationFrame(interval);
      count = -100;
  }

    /*if (count >= 0) {
        clearInterval(interval);
        count = -100;
    }*/
};

//OBRABOCHIK SOBITIY otkritiya/zakritiya Modalnogo okna_______________
  btnOpenModal.addEventListener('click', () => {
    //interval = setInterval(animateModal, 15);
    interval = requestAnimationFrame(animateModal);
    modalBlock.classList.add('d-block');
    playTest();
  });

  closeModal.addEventListener('click', function() {
    modalBlock.classList.remove('d-block');
    burgerBtn.classList.remove('active');
  });

  document.addEventListener('click', function(event) {
    
    if (
    !event.target.closest('.modal-dialog') && 
    !event.target.closest('.openModalButton') && 
    !event.target.closest('.burger')) {
      modalBlock.classList.remove('d-block');
      burgerBtn.classList.remove('active');
    }
  });

//FUNCTION testirovaniya__________________________________________
  const playTest = () => {

    const finalAnswers = [];
    const obj = {};

    //Peremennaya s nomerom voprosa_____________________________
    let numberQuestion = 0;

    //FUNCTION rendering otvetov
    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'justify-content-center' );

        answerItem.innerHTML = `
            <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
            <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
            </label>
        `;
        formAnswers.appendChild(answerItem);

      })
  }

  //FUNCTION rendering voprosov + otvetof_________________
    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = '';

      if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
        questionTitle.textContent = `${questions[indexQuestion].question}`;

        renderAnswers(indexQuestion);
        nextButton.classList.remove('d-none');
        prevButton.classList.remove('d-none');
        sendButton.classList.add('d-none');
      };

      if (numberQuestion === 0) {
        prevButton.classList.add('d-none');
      };

      if (numberQuestion === questions.length) {
          questionTitle.textContent = '';
          modalTitle.textContent = '';

          prevButton.classList.add('d-none');
          sendButton.classList.remove('d-none');
          formAnswers.innerHTML =`
            <div class="form-group>
              <label for="numberPhone">Enter your number</label>
              <input type="phone" class="form-control" id="numberPhone">
            </div>
          `;
          const numberPhone = document.getElementById('numberPhone');
          numberPhone.addEventListener('input', (event) => {
              event.target.value = event.target.value.replace(/[^0-9+-]/, ``);
          })

          nextButton.classList.add('d-none');
      };

      if (numberQuestion === questions.length + 1) {
          formAnswers.textContent = 'Spasibo za test';
          sendButton.classList.add('d-none');

          for (let key in obj) {
              let newObj = {};
              newObj[key] = obj[key];
              finalAnswers.push(newObj);
          }
          console.log(finalAnswers);

          setTimeout(() => {
            modalBlock.classList.remove('d-block');
          }, 2000)
      }

      //const name = 'Стандарт';
      //const img = './image/burger.png';

      /*formAnswers.innerHTML = `
      <div class="answers-item d-flex flex-column">
                <input type="radio" id="answerItem1" name="answer" class="d-none">
                <label for="answerItem1" class="d-flex flex-column justify-content-between">
                  <img class="answerImg" src="${questions.answers[0].url}" alt="burger">
                  <span>${questions.answers[0].title}</span>
                </label>
              </div>
              
      `;*/
    };

    //ZAPUSK Function renderinga____________________________
    renderQuestions(numberQuestion);

    const checkAnswer = () => {
        console.log('check');
        

        const inputs = [ ...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone')
        
        inputs.forEach((input, index) => {
            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                obj[`${index}_${questions[numberQuestion].question}`] = input.value;
            }

            if (numberQuestion === questions.length) {
              obj[`Your number`] = input.value;
            }
        });
      

        //finalAnswers.push(obj);
    };

    //Obrabochiki sobitiy knopok______________________________
    nextButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    };
    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };

    sendButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      console.log(finalAnswers);
    }

    document.getElementById('formAnswers')
    .addEventListener('click', (even) => {
        console.log(even.target);
    });
};



/*function animate() {
  console.log('this is Timeout');
};

//setTimeout(animate, 3000);
setInterval(animate, 3000);*/


});



/*btnOpenModal.onclick = function() {
  console.log('fist');
}

function summNumbers(a, b) {
  return a + b;
}

const summNumbers2 = function(a, b) {
  return a + b;
}

const summNumbers3 = (a, b) => {
 return a + b;
}

console.log(summNumbers3(3, 8));

btnOpenModal.addEventListener('click', function() {
  console.log('next');
})

btnOpenModal.addEventListener('click', function() {
 console.log('fourth');
 console.dir(btnOpenModal);
}) */


