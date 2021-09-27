let list = [];

fetch("https://jsonplaceholder.typicode.com/todos/")
  .then((resp) => resp.json())
  .then((data) => {
    list = data;
    render();
  });

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
    checkbox.disabled = true;

    const p = document.createElement("label");
    p.className = "to-do-text";
    p.innerText = note.title;

    const idButton = document.createElement("button");
    idButton.className = "id-button";
    idButton.id = note.id
    const idImg = document.createElement("img");
    idImg.className = "icons";
    idImg.src = "https://bit.ly/2ZCyT6I";
    idImg.alt = "id";

    const divId = document.createElement("div");
    divId.className = "div-id";
    const idText = document.createElement("p");
    idText.className = "id-p";
    idText.innerText = `Id: ${note.id} -- User Id: ${note.userId}`;

    toDoDiv.appendChild(checkbox);
    toDoDiv.appendChild(p);
    toDoDiv.appendChild(idButton);
    idButton.appendChild(idImg);
    divId.appendChild(idText);
    contentList.appendChild(toDoDiv);
    contentList.appendChild(divId);

    // Mudando o atributo checked e adicionando a class check
    if (note.completed) {
      p.classList.add("check");
      checkbox.checked = true;
    }

    idButton.addEventListener("click", () => {
      showId(note.id, divId);
    })
  }
}

function showId(id, divId) {
  for (let i = 0; i < list.length; i++) {
    const note = list[i];
    if (note.id === id) {
      divId.classList.toggle("visible");
    }
  }
}
