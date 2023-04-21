/* TODO: inserite il codice JavaScript necessario a completare il MHW! */
const unCheckedImage = 'images/unchecked.png';
const checkedImage = 'images/checked.png';
const grid = document.querySelectorAll('.choice-grid div');
const answers = {};

for (const square of grid){
  square.addEventListener('click', selectedImage);
}

const resultDiv = document.querySelector('#result');
resultDiv.classList.add('hidden');
const buttonDiv = document.querySelector('#button');
buttonDiv.classList.add('hidden');
buttonDiv.addEventListener('click', ricominciaQuiz);

function selectedImage(event){
  const selectedSquare = event.currentTarget;
  const questionId = selectedSquare.dataset.questionId;
  const choiceId = selectedSquare.dataset.choiceId;
  const questionAnswered = document.querySelectorAll("[data-question-id ='" + questionId + "']" );
  for (const div of questionAnswered){
    if(div.dataset.choiceId !== choiceId)
    {
      div.style.backgroundColor = '#f4f4f4';
      div.style.opacity = 0.6;
      div.querySelector('.checkbox').src = unCheckedImage;
      
    }
  }
  selectedSquare.style.backgroundColor = '#cfe3ff';
  selectedSquare.style.opacity = 1;
  selectedSquare.querySelector('.checkbox').src = checkedImage;
  answers[questionId] = choiceId;
  //check if answers are equal to 3
   if(Object.keys(answers).length === 3){
   
    for(const square of grid){
      square.removeEventListener('click', selectedImage);
    }
    risultato();
  }
  
}

function risultato(){
  const maxKey = checkAnswers();
  const map = RESULTS_MAP[maxKey];
  const h1 = document.querySelector('#result h1');
  const p = document.querySelector('#result p');
  h1.textContent = map['title'];
  p.textContent = map['contents'];
  resultDiv.classList.remove('hidden');
  buttonDiv.classList.remove('hidden');

}

function checkAnswers(){
  const answersCount = {};
  //FOR PER LE OCCORRENZE
  for(let answer in answers){
    //se all interno della nuova mappa esiste già il valore della chiave answers[answer] (ovvero il valore di answers della chiave answer) allora aggiungo uno al valore
    if(answersCount[answers[answer]]) {
      answersCount[answers[answer]] += 1;
    } else{
    //altrimenti se non esiste, lo aggiungo ponendo uno come suo valore. Se si ripresenterà, finirà nell'if statement
      answersCount[answers[answer]] = 1;
    }
  }
  let maxChoosenAnswer = 0;
  let maxChoosenKey = null;
  //se tutte e tre le risposte sono diverse allora verrà scelta la prima, altrimenti verrà scelta la risposta con più occorrenze
  for (let key in answersCount){
    if(answersCount[key] > maxChoosenAnswer){
      maxChoosenAnswer = answersCount[key];
      maxChoosenKey = key;
    }
  }
  return maxChoosenKey;
}

function ricominciaQuiz(){
   //window.location.reload();
  
   //reset the grid status
   for (const square of grid){
    square.style.backgroundColor = '#f4f4f4';
    square.style.opacity = 1;
    square.querySelector('.checkbox').src = unCheckedImage;
    square.addEventListener('click', selectedImage);
  }
   
  //reset the object map
  for(let key in answers) delete answers[key];
  
  //reset the results status
  resultDiv.classList.add('hidden');
  //reset the button status
  buttonDiv.classList.add('hidden');
}