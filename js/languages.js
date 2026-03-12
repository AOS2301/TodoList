document.addEventListener("DOMContentLoaded", () => {
    trocarIdioma("pt");
});

const idiomas = {
    pt: {
        titulo: "Lista de Tarefas!",
        botaoAdicionar: "Adicionar",
        remover: "Remover todas as tarefas",
        modalText: "Informe a atividade!",
        save: "Salvar",
        close: "Fechar"
    },
    en: {
        titulo: "To do List!",
        botaoAdicionar: "Add task",
        remover: "Remove all tasks",
        modalText: "Insert an activity!",
        save: "Save",
        close: "Close"
    }
};

function trocarIdioma(lang) {
    localStorage.setItem("idioma", lang);

    document.getElementById("titulo").innerText = idiomas[lang].titulo;
    document.getElementById("btnAdd").innerText = idiomas[lang].botaoAdicionar;
    document.getElementById("btnRemove").innerText = idiomas[lang].remover;
    document.getElementById("modalText").innerText = idiomas[lang].modalText;
    document.getElementById("save").innerText = idiomas[lang].save;
    document.getElementById("close").innerText = idiomas[lang].close;
}