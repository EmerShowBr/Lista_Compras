const form = document.querySelector(".form-row");
const input = document.querySelector("#add");
const lista = document.querySelector("#listaItens ul");
const error = document.querySelector(".error");
const closeBtn = document.querySelector(".close")


// Função que adiciona o item na lista
function adicionarItem() {
  let texto = input.value.trim();
  if (texto === "") return; // não adiciona se estiver vazio

  //trnafomar para musculo a prmiera
  texto = texto.charAt(0).toUpperCase() + texto.slice(1);

  const li = document.createElement("li");

  const label = document.createElement("label");
  label.classList.add("item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.textContent = texto;

  const img = document.createElement("img");
  img.src = "icons/lixo.svg";
  img.alt = "ícone de excluir";

  label.appendChild(checkbox);
  label.appendChild(span);
  label.appendChild(img);

  li.appendChild(label);
  lista.appendChild(li);
  lista.insertBefore(li, lista.firstChild);

  input.value = ""; // limpa o input
}

// Captura o submit do form (Enter ou clique no botão)
form.addEventListener("submit", (e) => {
  e.preventDefault(); // evita que a página recarregue
  adicionarItem();
});

input.addEventListener("input", () => {
  const suggestion = document.querySelectorAll("#listaItens ul li.suggestion");

  suggestion.forEach(li => {
    if (input.value.trim() !== "") {
      li.style.opacity = 0;       // vai sumindo
      li.style.transform = "translateY(-10px)"; 
      li.style.pointerEvents = "none";  
    } else {
      li.style.opacity = 1;       // volta
      li.style.transform = "translateY(0)";   
      li.style.pointerEvents = "auto";
    }
  });
});

lista.addEventListener("click", (e) => {
  if (e.target.tagName === "IMG" && e.target.alt === "ícone de excluir") {
    // remove o item
    const li = e.target.closest("li");
    li.remove();

    // mostra a mensagem
    error.classList.add("visible");
    setTimeout(() => {
      error.classList.remove("visible");
    }, 3000); // 3000ms = 3 segundos
  }
});

// fecha a mensagem quando clica no X
closeBtn.addEventListener("click", () => {
  error.classList.remove("visible");
});