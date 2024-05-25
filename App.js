/*usamos o framework express para criar rotas de solicitações http*/
const express = require('express');
/*o path é um módulo do node para trabalhar com o caminho de arquivos e diretórios*/
const path = require('path');

//Criamos uma instancia 'app' do express, ela que vai lidar com as requisições http
const app = express();

/*a requisição GET é usada para obter dados do servidor
Passamos a rota, o endereço que ele deve seguir
Quando chegar no endereço, temos a função de retorno, com os parâmetros res (request), o que é pedido
e res (response), o que será retornado*/

/*Essa requisição envia meu arquivo index.html como resposta
Ou seja, quando acesso 'localhost:3000', verei a página index.html*/
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


/*Nessa requisição, eu pego a rota da url que criei na função ' pesquisarPokemon'
Como req, pego o parâmetro nome que veio no endereço, indicado por ':', 
e a res é um objeto dos dados do pokemon, em formato json*/
app.get('/pokemon/:nome', async (req, res) => {
    //Salvo o nome do pokemon a ser buscado
    const nome = req.params.nome;
    //Crio uma url para o site pokeapi, o qual fornece as informações de pokemons, e coloco o endereco especifico do pokemon que quero achar
    const url = `https://pokeapi.co/api/v2/pokemon/${nome}`;

    
    try {
        //usamos o fetch para fazer a requisição da url que criamos
        const resposta = await fetch(url);
        
        //Após obter resposta da requisição, convertemos pro formato json
        const jsonDados = await resposta.json();

        //Criamos um objeto 'pokemonDados', pegando da resposta apenas as informações selecionadas que queremos do pokemon
        const pokemonDados = {
            nome: jsonDados.name,
            tipos: jsonDados.types,
            imagem: jsonDados.sprites.front_default
        };
        //Convertemos o objeto dos dados selecionados em javascript para json e enviamos como resposta
        res.json(pokemonDados);
        
    /*A resposta tem um atributo 'status', se houver algum erro na requisção, esse atributo será 404
    Nesse caso, se for 404 mandaremos uma mensagem de erro*/ 
    } catch (error) {
        res.status(404).json({ erro: error.message });
    }
});

//A requisição LISTEN inicia um servidor na porta especificada e ouve as requisições http dela

/*Passamos como argumento o número da porta, 3000, e também uma função de retorno,
a qual vai imprimir uma mensagem no terminal, uma pratica comum para informar o programador 
que o servidor foi inciado com sucesso e que já podem ser feitas requisições*/
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
