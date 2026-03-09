const modalId = document.getElementById("modalId");
let tarefas = [];
carregarCache();
renderTabela();

function abrirModal() {
    modalId.style.display = "flex";
    document.getElementById("input").focus();
}

function fecharModal() {
    modalId.style.display = "none";
}

function salvarCache(){
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarCache(){
    const cache = localStorage.getItem("tarefas");

    if(cache){
        tarefas = JSON.parse(cache);
    }
}

function renderTabela(){
    const tbody = document.getElementById("corpoTabela");
    tbody.innerHTML = "";

    tarefas.forEach((tarefa, index) => {

        const novaLinha = document.createElement("tr");

        const celulaTexto = document.createElement("td");
        celulaTexto.textContent = tarefa;

        const celulaBotao = document.createElement("td");

        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "❌";
        botaoRemover.classList.add("remover");

        botaoRemover.addEventListener("click", function(){
            removerItem(index);
        });

        celulaBotao.appendChild(botaoRemover);

        novaLinha.appendChild(celulaTexto);
        novaLinha.appendChild(celulaBotao);

        tbody.appendChild(novaLinha);
    });
}

function addTable() {
    const input = document.getElementById("input");
    const valor = input.value;
    if (valor != '') {

        tarefas.push(valor);
        salvarCache();
        renderTabela();

        input.value = "";
    }
    fecharModal();
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        fecharModal();
    } 
    else if (event.key === "Enter") {
        if (modalId.style.display === "flex") {
            addTable();
        } else {
            abrirModal();
        }
    }
});

function removerTarefas(){
    const confirmar = confirm("Tem certeza que deseja remover todas as tarefas?");
    if(confirmar){
        tarefas = [];
        salvarCache();
        renderTabela();
    }
}

function removerItem(index){
    tarefas.splice(index, 1);

    salvarCache();
    renderTabela();
}
    
