const modalId = document.getElementById("modalId");
let tarefas = [];

const agora = new Date();
agora.setHours(agora.getHours() + 1);
const dataPadrao = agora.toISOString()/*.split("T")[0]*/;
const horaPadrao = agora.toTimeString().slice(0,5);
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


function compararDataHora(a, b) {
  const diaA = a.dia || "0000-01-01";
  const diaB = b.dia || "0000-01-01";

  if (diaA !== diaB) return diaA.localeCompare(diaB);

  const horaA = a.hora || "00:00";
  const horaB = b.hora || "00:00";
  return horaA.localeCompare(horaB);
}

function ordenarTarefas(tarefaOrdenada) {
    if (tarefas.length === 0) {
        tarefas.push(tarefaOrdenada);
        return;
    }

    let i = 0;
    while (i < tarefas.length && compararDataHora(tarefas[i], tarefaOrdenada) <= 0) {
        i++;
    }
    tarefas.splice(i, 0, tarefaOrdenada);
}

function renderTabela(){
    const tbody = document.getElementById("corpoTabela");
    tbody.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const data = new Date(tarefa.dia);
        const dataFormatada = data.toLocaleDateString("pt-BR");
        const novaLinha = document.createElement("tr");
        const celulaTexto = document.createElement("td");
        celulaTexto.innerHTML = `
            ${tarefa.texto}<br>
            <small>${dataFormatada} ${tarefa.hora}</small>
        `;

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
    const dia = document.getElementById("dia");
    const hora = document.getElementById("hora");
    const valor = input.value;
    if (valor != '') {

        const tarefa = {
            texto: valor,
            dia: dia.value || dataPadrao,
            hora: hora.value || horaPadrao
        };

        ordenarTarefas(tarefa);
        //tarefas.push(tarefa);
        salvarCache();
        renderTabela();

        input.value = "";
        dia.value = "";
        hora.value = "";
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
    
