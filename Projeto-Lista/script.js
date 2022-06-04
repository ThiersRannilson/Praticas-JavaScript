//obtendo todos os elementos necessários
const inputBox = document.querySelector('.campoInput input');
const addBtn = document.querySelector('.campoInput button');
const todoList = document.querySelector('.todoList');
const apagarTudoBtn = document.querySelector(".footer button");

//evento onkeyup
inputBox.onkeyup = () => {
    let valorInserido = inputBox.value; //obtendo o valor inserido pelo usuário
    if (valorInserido.trim() != 0) {    //se o valor do usuário não for apenas espaços
        addBtn.classList.add("active"); //ative o botão adicionar
    } else {
        addBtn.classList.remove("active"); //desative o botão adicionar
    }
}

mostrarTarefas(); //chamando a função mostrar tarefas

addBtn.onclick = () => {  //Quando o usuário clicar no botão de adicionar
    let valorInserido = inputBox.value;  //obtendo o valor do campo de entrada
    let getLocalStorageData = localStorage.getItem("New Todo");  //obtendo armazenamento local
    if (getLocalStorageData == null) {  //se o Localstorage não tiver dados
        listArray = [];  //criar um array em branco
    } else {
        listArray = JSON.parse(getLocalStorageData); //transformando a string json em um obj js
    }
    listArray.push(valorInserido); //empurrando ou adicionando novo valor do array
    localStorage.setItem("New Todo", JSON.stringify(listArray));  //transformando um obj js em uma string
    mostrarTarefas();  //chamando a função mostrarTarefas
    addBtn.classList.remove("active");  //desative o botão adicionar uma vez que a tarefa foi adicionada
}

function mostrarTarefas() {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else{
        listArray = JSON.parse(getLocalStorageData);
    }
    const tarefaPendenteNumb = document.querySelector(".tarefaPendente");
    tarefaPendenteNumb.textContent = listArray.length;
    if (listArray.length > 0) {   //se o comprimento do array for maior que 0
        apagarTudoBtn.classList.add("active");
    }else{
        apagarTudoBtn.classList.remove("active");
    }
    let newLiTag = "";
    listArray.forEach((element,index) => {
        newLiTag += `<li> ${element} <span class="icon" onclick="apagarTarefa(${index})">X</span></li>`;
    });
    todoList.innerHTML = newLiTag;  //adicionando nova tag li dentro da tag ul
    inputBox.value = "";  //Uma vez adicionando a tarefa deixe o campo em branco
}


function apagarTarefa(index) {
    let getLocalStorageData = localStorage.getItem("New Todo")
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1);  //excluir ou remover li
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    mostrarTarefas();
}

// Função excluir todas as tarefas
apagarTudoBtn.onclick = () => {
    let getLocalStorageData = localStorage.getItem("New Todo");
    if (getLocalStorageData == null) {
        listArray = [];
    } else {
        listArray = JSON.parse(getLocalStorageData); //transformando a string json em um objeto js
        listArray = [];
    }
    localStorage.setItem("New Todo", JSON.stringify(listArray))
    mostrarTarefas();
}