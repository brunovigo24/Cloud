  // Evento para abrir o modal ao clicar em "Vaga"
  document.getElementById("vaga-btn").addEventListener("click", function() {
    $('#vagaModal').modal('show');
  });

  function editarVaga(index) {
    const vagas = JSON.parse(localStorage.getItem("vagas")) || [];
    const vaga = vagas[index];
  
    // Preencher o formulário com os dados da vaga
    document.getElementById("tituloVaga").value = vaga.titulo;
    document.getElementById("tipoVaga").value = vaga.tipo;
    document.getElementById("beneficios").value = vaga.beneficios;
    document.getElementById("descricaoCompleta").value = vaga.descricao;
  
    // Mostrar o modal para editar a vaga
    $('#vagaModal').modal('show');
  
    // Atualizar o evento do botão salvar para atualizar a vaga
    const salvarBtn = document.querySelector(".btn-primary");
    salvarBtn.removeEventListener("click", salvarVaga);
    salvarBtn.addEventListener("click", function() {
      vaga.titulo = document.getElementById("tituloVaga").value;
      vaga.tipo = Array.from(document.getElementById("tipoVaga").selectedOptions).map(option => option.value);
      vaga.beneficios = document.getElementById("beneficios").value;
      vaga.descricao = document.getElementById("descricaoCompleta").value;
  
      // Atualizar a vaga no localStorage
      vagas[index] = vaga;
      localStorage.setItem("vagas", JSON.stringify(vagas));
  
      // Fechar o modal
      $('#vagaModal').modal('hide');
  
      // Limpar o formulário
      document.getElementById("tituloVaga").value = '';
      document.getElementById("tipoVaga").selectedIndex = -1;
      document.getElementById("beneficios").value = '';
      document.getElementById("descricaoCompleta").value = '';
  
      // Atualizar a lista de vagas exibidas
      exibirVagas();
    }, { once: true });
  }
  
  function deletarVaga(index) {
    if (confirm("Tem certeza de que deseja deletar esta vaga?")) {
      let vagas = JSON.parse(localStorage.getItem("vagas")) || [];
      vagas.splice(index, 1);
      localStorage.setItem("vagas", JSON.stringify(vagas));
      exibirVagas();
    }
  }

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

    // Atualizar a lista de vagas exibidas
      exibirVagas();
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
            <button class="edit-btn" data-index="${index}">Editar</button>
            <button class="delete-btn" data-index="${index}">Deletar</button>
          `;
          vagaList.appendChild(vagaItem);
        });
      }
    
      // Adicionar evento de clique para os botões de editar e deletar
      document.querySelectorAll(".edit-btn").forEach(button => {
        button.addEventListener("click", function() {
          const index = this.getAttribute("data-index");
          editarVaga(index);
        });
      });
    
      document.querySelectorAll(".delete-btn").forEach(button => {
        button.addEventListener("click", function() {
          const index = this.getAttribute("data-index");
          deletarVaga(index);
        });
      });
    }    


  
    // Evento para exibir vagas ao clicar no botão "Vagas"
    document.querySelector(".nav-link.vagas").addEventListener("click", function() {
      exibirVagas();
    });