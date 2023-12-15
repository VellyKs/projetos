const getLocalStorage = () =>
  JSON.parse(localStorage.getItem("db_receita")) ?? [];

const setLocalStorage = (db_receita) =>
  localStorage.setItem("db_receita", JSON.stringify(db_receita));

const IsValidFields = () => {
  return document.getElementById("myform").reportValidity();
};

const clearFields = () => {
  const fields = document.querySelectorAll(".book-field");
  fields.forEach((field) => (field.value = ""))
  
  const modal = document.getElementById("modal");
  modal.classList.remove("active");
};

const clear_li = () => {
  const itens = document.querySelectorAll("#receita-lista");
  itens.forEach((row) => row.parentNode.removeChild(row));
};

const ordenar = () => {
  const db_receita = readreceita();
  db_receita.sort((a, b) => a.nome.localeCompare(b.nome));
  setLocalStorage(db_receita);
};

const update_li = () => {
  ordenar();
  const db_receita = readreceita();
  clear_li();
  db_receita.forEach(createrow);
  vazio();
};


let modo = "create"

//---------------------------------------


const createrow = (receita, index) => {
  const newrow = document.createElement("li");
  newrow.id = "receita-lista";
  newrow.innerHTML = `
    <div id='${index}' class='pai'>
    <header>
    
        <h2>${receita.nome}</h2>
        </header>
        <div class="info-resumo">
        <div class="tempo">
        <p>${receita.tempo}</p>
        <img src="css/time-outline.svg" alt="">
        
        </div>
        <div class="rendimento">
        <p>${receita.rendimento}</p>
        <img src="css/icons8-gráfico-de-pizza-64.png" alt="">
        </div>
        </div>
        </div>
        </div>

    `;

  document.getElementById("lista").appendChild(newrow);
};

const vazio = () => {
  const receitas = getLocalStorage().length;

  if (receitas >= 1) {
    document.getElementById("vazio").classList.add("false");
  } else {
    document.getElementById("vazio").classList.remove("false");
  }
};

//create
const createreceita = (receita) => {
  const db_receita = getLocalStorage();
  db_receita.push(receita);
  
  setLocalStorage(db_receita);
};

//read
const readreceita = () => getLocalStorage();

//update
const updatereceita = (index, receita) => {
  const db_receita = readreceita();
  db_receita[index] = receita;
  setLocalStorage(db_receita);
};

//delete
const deletereceita = () => {
  const index = document.getElementById("delete-btn").className;
  const db_receita = readreceita();
  db_receita.splice(index, 1);
  setLocalStorage(db_receita);
  update_li();
  closeView();
};

const savereceita = () => {
  if (IsValidFields()) {
    const receita = {
      nome: document.getElementById("nome").value,
      tempo: document.getElementById("tempo").value,
      rendimento: document.getElementById("rendimento").value,
      ingredientes: document.getElementById("ingredientes").value,
      preparo: document.getElementById("preparo").value
    };

    const index = document.getElementById('nome').dataset.index
    console.log(index)

    if (modo === "create"){
        createreceita(receita);
        console.log("Cadastrando");
        clearFields();
        update_li();
        closeModal();
    }
    if (modo === "edit"){
        updatereceita(index, receita)
        clearFields();
        update_li();
        closeModal();
    }

    // window.alert('Salvo')
    mostrarMensagem()
    modo = 'create'
  }
};

function mostrarMensagem() {
  var mensagem = document.getElementById("mensagem");
  mensagem.style.display = "block"; // Torna a mensagem visível
  setTimeout(function() {
      mensagem.style.display = "none";
  }, 1000); 
}


const animain = (elemento) =>{
    // const lista = document.getElementById("lista")
    // lista.style.setProperty('-webkit-animation', "slide-in-right .8s .3s both")
    // lista.style.setProperty('animation', "slide-in-right .8s .3s both")
    elemento.style.setProperty('-webkit-animation', 'swing-in-left-fwd 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both')
    elemento.style.setProperty('animation', 'swing-in-left-fwd 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both')
}





const editreceita = () => {
  const index = document.getElementById("edit-btn").className;
  const receita = readreceita()[index];
  receita.index = index;
  modo = 'edit'
  fillfields(receita);
  openModal();
};

const openreceita = (index) => {
  const receita = readreceita()[index];
  receita.index = index;
  filltext(receita);
  openView();
};

const opentela = (event) => {
  

  const child = event.target;
  console.log(child);
  const pai = child.closest(".pai");
  if(pai){
    const index = pai.id
    console.log(index);
    const receita = readreceita()[index];
    const view = document.getElementById("view2");
    view.scrollTop = 0;
    openreceita(index);
  }
};

const fillfields = (receita) => {
  document.getElementById("nome").value = receita.nome;
  document.getElementById("tempo").value = receita.tempo;
  document.getElementById("rendimento").value = receita.rendimento;
  document.getElementById("ingredientes").value = receita.ingredientes;
  document.getElementById("preparo").value = receita.preparo;
  document.getElementById("nome").dataset.index = receita.index;
};

const filltext = (receita) => {
  document.querySelector("#view #nome").innerText = receita.nome;
  document.querySelector("#view #tempo").innerText = receita.tempo;
  document.querySelector("#view #rend").innerText = receita.rendimento;
  document.querySelector("#view #ingred").innerText = receita.ingredientes;
  document.querySelector("#view #preparo").innerText = receita.preparo;
  document.querySelector("#edit-btn").setAttribute("class", receita.index);
  document.querySelector("#delete-btn").setAttribute("class", receita.index);
};

const listaMax = () => {
  const receitas = document.getElementById("lista").children;
  const itens = receitas.length;

  if (itens > 4) {
    const lastitem = receitas[itens - 1];
    lastitem.classList.add("last");
  }
};

const troca = () => {
  const input = document.querySelectorAll(".book-field");

  for (var i = 0; i < 5; i++) {
    input[i].setAttribute("disabled", "");
  }

  //document.querySelectorAll(".book-field").

  //input.classList.add('disabled')
};

const openModal = () => {
  if (modo === 'edit'){
    document.getElementById("modal-modo").innerHTML = 'Editando'
  } else{
    document.getElementById("modal-modo").innerHTML = 'Nova receita'

  }

  closeView();
  const modal = document.getElementById("modal");
  animain(modal)
  modal.classList.add("active");
};
const closeModal = () => {
  const modal = document.getElementById("modal");
  modal.classList.remove("active");
  clearFields();
};
const openView = () => {
  closeModal();
  const open = document.getElementById("view");
  animain(open)
  open.classList.add("active");
};
const closeView = () => {
  const view = document.getElementById("view");
  view.classList.remove("active");
};

//ações

update_li();
vazio();
listaMax();

document.getElementById("salvar").addEventListener("click", savereceita);

document.getElementById("cancelar").addEventListener("click", clearFields);

document.getElementById("lista").addEventListener("click", opentela);

document.getElementById("btn-create").addEventListener("click", openModal);

document.getElementById("edit-btn").addEventListener("click", editreceita);

document.getElementById("delete-btn").addEventListener("click", deletereceita);

document.getElementById("x").addEventListener("click", closeModal);

document.getElementById("x2").addEventListener("click", closeView);
