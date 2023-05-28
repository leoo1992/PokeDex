// VARIAVEIS DA API;
let pokemonName = document.querySelector(".pokemon__name"); // NOME DO POKEMON QUE SERA PASSADO PELA API;
let pokemonNumber = document.querySelector(".pokemon__number"); // NUMERO DO POKEMON QUE SERA PASSADO PELA API;
let pokemonImage = document.querySelector(".pokemon__image"); // IMAGEM DO POKEMON QUE SERA PASSADO PELA API;

let modalPokeNumber = document.querySelector(".modalPokemon__number"); // NUMERO DO POKEMON QUE SERA PASSADO PELA API;
let modalPokeName = document.querySelector(".modalPokemon__name"); // NOME DO POKEMON QUE SERA PASSADO PELA API;
let modalPokeType = document.querySelector(".modalPokemon__type"); // TIPO DO POKEMON QUE SERA PASSADO PELA API;
let modalPokeExp = document.querySelector(".modalPokemon__exp"); // EXP DO POKEMON QUE SERA PASSADO PELA API;
let modalPokeAltura = document.querySelector(".modalPokemon__altura"); // ALTURA DO POKEMON QUE SERA PASSADO PELA API;
let modalPokePeso = document.querySelector(".modalPokemon__peso"); // PESO DO POKEMON QUE SERA PASSADO PELA API;
let modalPokeImg = document.querySelector(".modalPokemon__image"); // IMAGEM DO POKEMON QUE SERA PASSADO PELA API;

//
// VARIAVEIS DO HTML;
const form = document.querySelector(".form");
const input = document.querySelector(".input__search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const buttonInfo = document.querySelector(".btn-infor");

//
// VARIAVEL DE REFERENCIA DO ID DO POKEMON:
let searchPokemon = 1;
//
// INICIO DAS FUNÇÕES-----------------------------------------------------------------------------------------------
//
//FUNÇÃO Submit chama a função RENDER abaixo - quando o formulario é enviado
form.addEventListener("submit", (event) => {
  event.preventDefault();
  //converte para lowercase
  renderPokemon(input.value.toLowerCase());
});
//FUNÇÃO renderiza/"monta" o JSON do pokemon informado no HTML, utiliza a função FETCH abaixo
const renderPokemon = async (pokemon) => {
  pokemonName.innerHTML = "Carregando...";
  pokemonNumber.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  // valida o recebimento do JSON pela função fech na variavel data
  if (data) {
    pokemonImage.style.display = "block";
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];

    //RENDERIZA MODAL
    modalPokeNumber.innerHTML = data.id;
    modalPokeName.innerHTML = data.name.toUpperCase();
    modalPokeType.innerHTML = "";
    modalPokeType.innerHTML = `${
      modalPokeType.innerHTML + data["types"]["0"]["type"]["name"]
    }`;

    let indice = 1;
    while (data["types"][indice]) {
      modalPokeType.innerHTML =
        modalPokeType.innerHTML + ", " + data["types"][indice]["type"]["name"];
      indice = indice + 1;
    }

    modalPokeExp.innerHTML = data.base_experience;
    modalPokeAltura.innerHTML = "" + data.height + "0 cm";
    modalPokePeso.innerHTML = data.weight + "00 gr";
    modalPokeImg.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];

    input.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImage.style.display = "none";
    pokemonName.innerHTML = "Não encontrado :(";
    pokemonNumber.innerHTML = "";
  }
};
//FUNÇÃO realiza solicitação HTTP para a API - RETORNA o JSON do pokemon:
const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    // chamada para API:
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );
  // validação se retorna 200 para converção da resposta em um JSON
  if (APIResponse.status === 200) {
    const data = await APIResponse.json();
    return data;
  }
};
//FUNÇÃO do botão PREV, altera o valor do pokemon procurado para -1
buttonPrev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});
//FUNÇÃO do botão NEXT, altera o valor do pokemon procurado para +1
buttonNext.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});
//FUNÇÃO do botão INFO, mostra na tela as info do pokemon - Modal
buttonInfo.addEventListener("click", () => {
  var myModal = new bootstrap.Modal(document.getElementById("modal-infos"), {
    keyboard: false,
  });
  myModal.show();
});
//CHAMADA PRINCIPAL
renderPokemon(searchPokemon);
