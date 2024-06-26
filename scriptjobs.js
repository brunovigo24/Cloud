  // Evento para abrir o modal ao clicar em "Vaga"
  document.getElementById("vaga-btn").addEventListener("click", function() {
    $('#vagaModal').modal('show');
  });

  // Evento para salvar os dados do formulário em memória
  document.querySelector(".btn-primary").addEventListener("click", function() {
    const tituloVaga = document.getElementById("tituloVaga").value;
    const tipoVaga = Array.from(document.getElementById("tipoVaga").selectedOptions).map(option => option.value);
    const beneficios = document.getElementById("beneficios").value;
    const descricaoCompleta = document.getElementById("descricaoCompleta").value;

    const vaga = {
      titulo: tituloVaga,
      tipo: tipoVaga,
      beneficios: beneficios,
      descricao: descricaoCompleta
    };

    // Salvando a vaga em localStorage
    let vagas = JSON.parse(localStorage.getItem("vagas")) || [];
    vagas.push(vaga);
    localStorage.setItem("vagas", JSON.stringify(vagas));

    // Fechar o modal
    $('#vagaModal').modal('hide');

    // Limpar o formulário
    document.getElementById("tituloVaga").value = '';
    document.getElementById("tipoVaga").selectedIndex = -1;
    document.getElementById("beneficios").value = '';
    document.getElementById("descricaoCompleta").value = '';

    alert("Vaga salva com sucesso!");
  });

    // Função para exibir vagas no conteúdo principal
    function exibirVagas() {
      const vagaList = document.getElementById("vaga-list");
      const vagas = JSON.parse(localStorage.getItem("vagas")) || [];
  
      vagaList.innerHTML = ""; // Limpar lista de vagas
  
      if (vagas.length === 0) {
        vagaList.innerHTML = "<p>Nenhuma vaga disponível</p>";
      } else {
        vagas.forEach((vaga, index) => {
          const vagaItem = document.createElement("div");
          vagaItem.classList.add("vaga-item");
          vagaItem.innerHTML = `
            <h2>${vaga.titulo}</h2>
            <p><strong>Tipo:</strong> ${vaga.tipo.join(", ")}</p>
            <p><strong>Benefícios:</strong> ${vaga.beneficios}</p>
            <p><strong>Descrição:</strong> ${vaga.descricao}</p>
          `;
          vagaList.appendChild(vagaItem);
        });
      }
    }
  
    // Evento para exibir vagas ao clicar no botão "Vagas"
    document.querySelector(".nav-link.vagas").addEventListener("click", function() {
      exibirVagas();
    });