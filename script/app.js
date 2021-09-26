const addBtn = document.getElementById("add");
const resetBtn = document.getElementById("reset");
const delBtn = document.getElementById("del");
const toDoInput = document.getElementById("to-do-input");
const toDoDate = document.getElementById("to-do-date");
const inputInvalid = document.getElementById("input-invalid");

// Estabelecendo a data minima do input
let dateMin = new Date().toJSON().slice(0, 10);
toDoDate.setAttribute("min", dateMin);

let list = JSON.parse(localStorage.getItem("list")) || [];

// Validando o input text (a data não será obrigatoria)
addBtn.addEventListener("click", () => {
  if (toDoInput.value.trim() === "" || toDoInput.value.length < 10) {
    inputInvalid.style.display = "block";
    inputInvalid.innerText = "A sua tarefa precisa ter mais de 10 caracteres";
  } else if (toDoInput.value.length > 25) {
    inputInvalid.style.display = "block";
    inputInvalid.innerText = "A sua tarefa precisa ter menos que 25 caracteres";
  } else {
    inputInvalid.style.display = "none";
    addItemToList();
    render();
    toDoInput.value = "";
    toDoDate.value = "";
    toDoInput.focus();
  }
});

// Criando um id aleatório para o localStorage
function createId() {
  return `id_${Math.ceil(Math.random() * 999999999)}`;
}

// Adicionando no array list do localstorage
function addItemToList(note) {
  let id = createId();

  list.push({
    id,
    title: toDoInput.value,
    date: toDoDate.value || undefined,
    createdAt: new Date(),
    checked: false,
  });

  localStorage.setItem("list", JSON.stringify(list));
}

// Renderizando as tarefas
function render() {
  const contentList = document.getElementById("content-list");
  contentList.innerHTML = "";

  for (const note of list) {
    const toDoDiv = document.createElement("div");
    toDoDiv.className = "to-do-card";

    const checkbox = document.createElement("input");
    checkbox.className = "checkbox";
    checkbox.name = "checkbox";
    checkbox.type = "checkbox";

    const p = document.createElement("label");
    p.className = "to-do-text";
    p.innerText = note.title;

    const dateButton = document.createElement("button");
    dateButton.className = "date-button";
    const dateImg = document.createElement("img");
    dateImg.className = "icons";
    dateImg.src = "https://image.flaticon.com/icons/png/512/1251/1251429.png";
    dateImg.alt = "calendário";

    const divDate = document.createElement("div");
    divDate.className = "div-date";
    const date = document.createElement("p");
    date.className = "date-p";

    const deleteButton = document.createElement("button");
    const deleteImg = document.createElement("img");
    deleteImg.className = "icons";
    deleteImg.src = "https://image.flaticon.com/icons/png/512/1251/1251305.png";
    deleteImg.alt = "lixeira";

    deleteButton.appendChild(deleteImg);
    toDoDiv.appendChild(checkbox);
    toDoDiv.appendChild(p);
    toDoDiv.appendChild(dateButton);
    dateButton.appendChild(dateImg);
    toDoDiv.appendChild(deleteButton);
    divDate.appendChild(date);
    contentList.appendChild(toDoDiv);
    contentList.appendChild(divDate);

    // Mudando o atributo checked e adicionando a class check
    if (note.checked) {
      p.classList.add("check");
      checkbox.checked = true;
    }

    // Checkbox para tachar o texto
    checkbox.addEventListener("click", () => {
      toggle(note.id);
      render();
    });

    p.addEventListener("click", () => {
      toggle(note.id);
      render();
    })

    // Botão para deletar a tarefa
    deleteButton.addEventListener("click", () => {
      del(note.id);
    });

    //   Botão para exibir as datas
    dateButton.addEventListener("click", () => {
      showDate(note.date, note.id, divDate, date);
    });
  }
}

function showDate(dateList, id, divDate, date) {
  // Instanciando a data do dia
  let today = new Date();
  let todayBr = today.toLocaleDateString("pt-BR", { timeZone: "UTC" });

  for (let i = 0; i < list.length; i++) {
    const note = list[i];
    if (note.id === id) {
      if (dateList === undefined) {
        date.innerText = `criado em ${todayBr}`;
      } else {
        let deadline = dateList.split("-").reverse().join("/");
        date.innerText = `criado em ${todayBr} -- concluir até ${deadline}`;
      }
      divDate.classList.toggle("visible");
    }
  }
}

// modal de confirmação do delete
function del(id) {
  const modal = document.getElementById("modal-delete");
  const buttonYes = document.getElementById("btn-yes");
  const buttonNo = document.getElementById("btn-no");

  modal.style.display = "flex";

  buttonNo.onclick = () => {
    modal.style.display = "none";
  };

  buttonYes.onclick = () => {
    for (let i = 0; i < list.length; i++) {
      const note = list[i];
      if (note.id === id) {
        list.splice(i, 1);
      }
    }

    localStorage.setItem("list", JSON.stringify(list));
    render();
    modal.style.display = "none";
  }
}

function toggle(id) {
  for (const note of list) {
    if (note.id === id) {
      note.checked = !note.checked;
    }
  }

  localStorage.setItem("list", JSON.stringify(list));
}

delBtn.addEventListener("click", () => {
  localStorage.removeItem("list");
  list = [];
  render();
});

render();
