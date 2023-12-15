
const IsValidFields = () => {
  return document.getElementById("myform").reportValidity();
};

const clear_li = () => {
  const itens = document.querySelectorAll("#receita-lista");
  itens.forEach((row) => row.parentNode.removeChild(row));
};


document.addEventListener('DOMContentLoaded', () => {
  readReceitas();
  dbreceita();
});

const clearFields = () => {
  const fields = document.querySelectorAll(".book-field");
  fields.forEach((field) => (field.value = ""))
  
  const modal = document.getElementById("modal");
  modal.classList.remove("active");
};


const update_li = () => {
  clear_li();
  readReceitas();
};


let modo = "create"

//---------------------------------------


const createrow = (receita, index) => {
  const newrow = document.createElement("li");
  newrow.id = "receita-lista";
  newrow.innerHTML = `
    <div id='${index}'  class='pai'>
    <header>
    
        <h2>${receita.nomereceita}</h2>
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



const createreceita = async (receita) => {
  try {
    const response = await fetch('/receitas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(receita),
    });
    const result = await response.text();
    // Use 'result' para lidar com sucesso ou falha
  } catch (error) {
    console.error('Erro ao criar receita:', error);
  }
};

const readReceitas = async () => {
  try {
    const data = await dbreceita();
    data.forEach(createrow);
    console.log(data);
    if (data.length > 0){
        document.getElementById("vazio").classList.add("false");
      } else {
        document.getElementById("vazio").classList.remove("false");
    }
    //vazio();
    
  } catch (error) {
    console.error('Erro ao carregar receitas:', error);
  }
  
};

const dbreceita = async () => {
  try {
    const response = await fetch('/receitas');
    const data = await response.json();
    return data; 
  }
    catch (error) {
    console.error('Erro ao obter receitas:', error);
    throw error; // Propagar o erro para o chamador da função
  }
};


const updatereceita = async (idreceita, receita) => {
  try {
    const response = await fetch(`http://localhost:3000/receitas/${idreceita}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(receita),
    });
    // Use 'response' para lidar com sucesso ou falha
  } catch (error) {
    console.error('Erro ao atualizar receita:', error);
  }
};


const deletereceita = async () => {
  const idreceita = document.getElementById('delete-btn').getAttribute("class");
  console.log(idreceita, "id no banco");
  try {
    const response = await fetch(`http://localhost:3000/receitas/${idreceita}`, {
      method: 'delete',
    });
if (response) {
  console.log("Excluido")
  const msg = document.getElementById("mensagem")
  msg.textContent = "Receita apagada";
  msg.style.backgroundColor = "#FF8080"
  mostrarMensagem()
  closeView();
  update_li();

}
    // Use 'response' para lidar com sucesso ou falha
  } catch (error) {
    console.error('Erro ao excluir receita:', error);
  }
};



const savereceita = async () => {
  if (IsValidFields()) {
    const receita = {
      nomereceita: document.getElementById("nome").value,
      tempo: document.getElementById("tempo").value,
      rendimento: document.getElementById("rendimento").value,
      ingredientes: document.getElementById("ingredientes").value,
      preparo: document.getElementById("preparo").value
    };

    const idreceita = document.getElementById('nome').dataset.index
    console.log(idreceita, "idreceita");
    const msg = document.getElementById("mensagem")

    if (modo === "create"){
        await createreceita(receita);
        console.log("Cadastrando");
        msg.textContent = "Receita adicionada";
        msg.style.backgroundColor = "#CDFAD5"
        
    }
    if (modo === "edit"){
        await updatereceita(idreceita, receita)
        msg.textContent = "Receita editada";
        msg.style.backgroundColor = "#FFD89C"
        
    
    }
    clearFields();
    closeModal();
    // window.alert('Salvo')
    mostrarMensagem()
    modo = 'create'
    update_li();
    
    
  }
};

function mostrarMensagem() {
  var mensagem = document.getElementById("mensagem");
  mensagem.style.display = "block"; // Torna a mensagem visível
  setTimeout(function () {
    mensagem.style.display = "none";
  }, 3000);
}

function atualizarPagina() {
  location.reload(); // O parâmetro true força a recarga do cache
}

const animain = (elemento) =>{
   
    elemento.style.setProperty('-webkit-animation', 'swing-in-left-fwd 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both')
    elemento.style.setProperty('animation', 'swing-in-left-fwd 1s cubic-bezier(0.175, 0.885, 0.320, 1.275) both')
}

const editreceita = async () => {
  try {
    const index = document.getElementById("edit-btn").className;
    const data = await dbreceita();
    const receita = data[index];
    console.log(receita)
    fillfields(receita);
    modo = 'edit'
    openModal();

  }catch (error){

  }
};

const openreceita = async (index) => {
  try {
    const receitas = await dbreceita();
    const receita = receitas[index];  
    console.log(index, "delete");
    filltext(receita, index);
    openView();
  }catch (error){
    console.error('Erro')
  }
};

const opentela = (event) => {
  const child = event.target;
  console.log(child);
  const pai = child.closest(".pai");
  if(pai){
    const index = pai.id
    const view = document.getElementById("view2");
    console.log(index, "index-pai");
    view.scrollTop = 0;
    openreceita(index);
  }
};

const fillfields = (receita) => {
  document.getElementById("nome").value = receita.nomereceita;
  document.getElementById("tempo").value = receita.tempo;
  document.getElementById("rendimento").value = receita.rendimento;
  document.getElementById("ingredientes").value = receita.ingredientes;
  document.getElementById("preparo").value = receita.preparo;
  document.getElementById("nome").dataset.index = receita.idreceita;
  
};

const filltext = (receita, index) => {
  document.querySelector("#view #nome").innerText = receita.nomereceita;
  document.querySelector("#view #tempo").innerText = receita.tempo;
  document.querySelector("#view #rend").innerText = receita.rendimento;
  document.querySelector("#view #ingred").innerText = receita.ingredientes;
  document.querySelector("#view #preparo").innerText = receita.preparo;
  document.querySelector("#edit-btn").setAttribute("class", index);
  document.querySelector("#delete-btn").setAttribute("class", receita.idreceita);
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



document.getElementById("salvar").addEventListener("click", savereceita);

document.getElementById("cancelar").addEventListener("click", clearFields);

document.getElementById("lista").addEventListener("click", opentela);

document.getElementById("btn-create").addEventListener("click", openModal);

document.getElementById("edit-btn").addEventListener("click", editreceita);

document.getElementById("delete-btn").addEventListener("click", deletereceita);

document.getElementById("x").addEventListener("click", closeModal);

document.getElementById("x2").addEventListener("click", closeView);

