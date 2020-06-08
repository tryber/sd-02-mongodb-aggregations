# Bem vindo ao repositório do projeto Aggregations

Você já usa o GitHub diariamente para desenvolver os exercícios, certo? Agora, para desenvolver os projetos, você deverá seguir as instruções a seguir. Fique atento a cada passo e, se tiver qualquer dúvida, nos envie por Slack! #vqv 🚀

Aqui você vai encontrar os detalhes de como estruturar o desenvolvimento do seu projeto a partir desse repositório, utilizando uma branch específica e um Pull Request para colocar seus códigos.

---

## O que deverá ser desenvolvido

É isso aí, mais um bloco finalizado! Agora chegamos ao fim do último bloco do nosso módulo de NoSQL e MongoDB. Você viu vários métodos e operadores para executar operações de agregação de dados no **MongoDB**, e vai colocá-los em prática em mais um projeto.

Para esse projeto, diferentemente dos outros, você vai utilizar vários datasets, de forma que possa praticar em vários cenários os diversos operadores e estágios do `aggregation pipeline`.

Vamos trabalhar com dados do **IMDB**, dados sobre empresas aéreas e também dados que contenham registros de deslocamento de pessoas que utilizam bicicletas. Esperamos que você curta muito o projeto e fixe muito bem o que aprendeu até aqui!

Então vamos lá aplicar seu conhecimento nesses cenários muito legais! 😉

---

### Instruções para restaurar o banco de dados `aggregations`

1. Faça o download dos aquivos de backup [imdb](./imdb.tar.gz), [airlines](./airlines.tar.gz) e [citibike](./citibike.tar.gz). Clique com botão direito e selecione "Salvar como" para salvar os arquivos em seu computador.

2. Abra o terminal e conecte-se à sua instância local do **MongoDB**. Se você receber uma mensagem de erro com uma mensagem como ***Connection refused***, tente reiniciar sua instância ([Veja como fazer isso aqui](https://course.betrybe.com/back-end/mongodb/introduction/#conectando)).

3. Agora que você tem certeza de que a instância está no ar e que você está conectado a ela, digite `exit` para sair do **MongoDB Shell**. Você voltará ao terminal para restaurar os backups.

4. Extraia os arquivos baixados:
    ```bash
    tar -xvf imdb.tar.gz
    tar -xvf airlines.tar.gz
    tar -xvf citibike.tar.gz
    ```

5. Agora, passando o caminho local de cada arquivo extraído, execute os comandos de _restore_ abaixo:
    ```bash
    mongorestore --db aggregations <caminho_do_arquivo_movies.bson>
    mongorestore --db aggregations <caminho_do_arquivo_air_airlines.bson>
    mongorestore --db aggregations <caminho_do_arquivo_air_alliances.bson>
    mongorestore --db aggregations <caminho_do_arquivo_air_routes.bson>
    mongorestore --db aggregations <caminho_do_arquivo_trips.bson>

    ```

6. Esses comandos criarão um banco de dados chamado `aggregations` com cinco coleções dentro dele. Para confirmar, execute o comando abaixo:
    ```javascript
    use aggregations
    show collections
    ```

---

## Como desenvolver e entregar este projeto

Temos, a seguir, uma série de desafios com diferentes níveis de complexidade. Cada desafio deve ser resolvido em seu arquivo próprio.

1. Leia a pergunta e crie um arquivo chamado `desafioN.js`, em que N é o número do desafio.

2. O arquivo deve conter apenas o código MQL (_Mongo Query Language_) do desafio resolvido. **Não se esqueça de incluir o ponto e vírgula (";")** no final de suas queries e também de **colocar a instância no contexto correto**, como no exemplo a seguir:
    ```js
    use aggregations;
    db.movies.count();
    ```

3. Faça isso até finalizar todos os desafios. Em seguida, siga as instruções de como entregar o projeto em [**Instruções para entregar seu projeto**](#instruções-para-entregar-seu-projeto).

---

## Desafios

Monte queries para encontrar as informações dos desafios a seguir.

##### Desafio 1

Ajude a Trybe a escolher um filme para a próxima noite! Baseado em uma pesquisa, decidimos que os filmes em potencial devem atender aos seguintes critérios:

* `imdb.rating` deve ser ao menos `7`;
* `genres` não deve conter `Crime` ou `Horror`;
* `rated` deve ser igual a `PG` ou `G`;
* `languages` contém `English` e `Spanish`.

Utilizando a coleção `movies`, faça um _pipeline_ que retorne todos esses filmes.

Sua query deve retornar `41` documentos.

##### Desafio 2

A escolha do filme da noite foi um sucesso, mas infelizmente ficamos com nossa banda de internet quase esgotada, e ainda precisamos de uma nova recomendação de filme. Para diminuir o volume de dados trafegados, utilizando o mesmo _pipeline_ anterior, retorne apenas os campos `title`, `rated`, `imdb.rating`, `imbd.votes` e `year`, modificando seus nomes para `titulo`, `avaliado`, `notaIMDB`, `votosIMDB` e `ano`, respectivamente.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "titulo" : "A Streetcar Named Desire", "avaliado" : "PG", "notaIMDB" : 8.1, "votosIMDB" : 72364, "ano" : 1951 }
// Demais documentos
```

##### Desafio 3

Agora que você tem os campos essenciais, retorne esses filmes ordenados por ano e nota IMDB de forma decrescente e por ordem alfabética.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "titulo" : "McFarland, USA", "avaliado" : "PG", "notaIMDB" : 7.5, "votosIMDB" : 14091, "ano" : 2015 }
// Demais documentos
```

##### Desafio 4

Nosso dataset de filmes tem muitos documentos diferentes, alguns com títulos "mais complexos" do que outros. Se quisermos analisar nossa coleção para encontrar títulos de filmes que têm uma só palavra no título, poderíamos buscar todos os filmes do dataset e processar isso na aplicação, mas o `Aggregation Framework` nos permite fazer isso diretamente no lado do banco de dados.

Crie um _pipeline_ que retorne apenas os filmes com o título composto apenas de uma palavra. Por exemplo, `"Cinderela"` e `"3-25"` devem entrar nessa contagem, mas `"Cast Away"` não.

Dica: utilize os operadores `$split` e `$size` para te auxiliar.

Sua query deve retornar `8068` documentos.

##### Desafio 5

Temos outra noite de filme aqui na Trybe e, desta vez, nós perguntamos à equipe quais são seus atores ou atrizes preferidos. Aqui está o resultado:

* Sandra Bullock
* Tom Hanks
* Julia Roberts
* Kevin Spacey
* George Clooney

Para filmes lançados nos Estados Unidos (campo `countries`), com `tomatoes.viewer.rating` maior ou igual a `3`, crie um novo campo chamado `num_favs`, que represente quantos atores ou atrizes favoritos aparecem no elenco (campo `cast`) do filme.

Ordene os resultados por `num_favs`, `tomatoes.viewer.rating` e `title`, todos em ordem decrescente.

Por fim, utilizando o mesmo _pipeline_, responda: Qual o **título** do vigésimo quinto filme do resultado dessa agregação?

Dica: coloque a lista de atores e atrizes favoritos em uma variável e explore operadores como `$size` e `$setIntersection`.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "title" : <nome_do_filme> }
```

##### Desafio 6

Vamos explorar mais operadores aritméticos!

Considerando todos os filmes que ganharam o Oscar pelo menos uma vez, calcule o **desvio padrão**, o **maior valor**, o **menor valor** e a **média** da avaliações (campo `imdb.rating`).

Dica: todos os filmes na coleção, que já ganharam um Oscar, começam com uma sequência de string parecida com essas abaixo, portanto `$regex` é um operador bem-vindo:

```
Won 10 Oscars
Won 1 Oscar
```

O resultado da sua query deve ter o seguinte formato:

```javascript
{
  "maior_rating" : <maior_rating>,
  "menor_rating" : <menor_rating>,
  "media_rating" : <media_rating>,
  "desvio_padrao" : <desvio_padrao>
}
```

##### Desafio 7

Vamos nos aprofundar um pouco mais em nossa coleção de filmes. Queremos contar quantos filmes cada um dos atores e atrizes do elenco (`cast`) já participou e obter uma média do campo `imdb.rating` para cada um desses atores e atrizes.

Traga o nome do ator ou atriz, número de filmes em que participou e a média do imdb desses filmes com apenas uma casa decimal. Considere somente os membros do elenco de filmes com o idioma inglês (`English`).

Sua query deve retornar `47055` documentos. Cada documento no resultado deve ter o seguinte formato:

```javascript
{ "_id" : "John Wayne", "numeroFilmes" : 107, "mediaIMDB" : 6.4 }
```

##### Desafio 8

Trocando de contexto, vamos utilizar nosso outro dataset que contém dados de empresas aéreas, suas rotas, seus voos e parcerias.

Liste todas as parcerias da coleção `air_alliances`, que voam rotas com um Boing 747 ou um Airbus A380 (que estão abreviados para `747` e `380` no campo `airplane` na coleção `air_routes`, respectivamente), e descubra qual delas tem o maior número de rotas com esses aviões.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "_id" : <nome_da_rota>, "totalRotas" : <total_de_rotas> }
```

##### Desafio 9

Determine o menor e o maior ano de nascimento. Guarde essa informação, você precisará dela mais tarde.

Não considere documentos com valores vazios (`""`) ou em que o campo não existe!

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "maiorAnoNascimento" : <ano>, "menorAnoNascimento" : <ano> }
```

##### Desafio 10

Encontre a média de viagens por tipo de usuário. Exiba o valor em horas com apenas duas casas decimais.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "tipo" : <tipo>, "duracaoMedia" : <duracaoMedia> }
// ...
```

##### Desafio 11

Determine qual o dia da semana com maior número de viagens iniciadas.

Dica: Utilize o operador `$dayOfWeek` para extrair o dia da semana como um número de uma data.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "diaDaSemana" : <dia_da_semana>, "total" : <total_de_viagens> }
```

##### Desafio 12

Agora que você já sabe o dia com mais viagens, determine qual estação tem o maior número de viagens nesse dia da semana. Mas, para isso, adicione o que for necessário ao _pipeline_ anterior. Exiba apenas o nome da estação e o total de viagens.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "nomeEstacao" : <nome_da_estacao>, "total" : <total_de_viagens> }
```

##### Desafio 13

Determine a duração média das viagens iniciadas no dia `10/03/2016`, em minutos. Arredonde o resultado para cima.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "duracaoMediaEmMinutos" : <duracao_media_em_minutos> }
```

##### Desafio 14

Baseado na duração média das viagens, determine quais são as `5` bicicletas que foram mais utilizadas. Exiba o resultado em minutos arredondados para cima.

O resultado da sua query deve ter o seguinte formato:

```javascript
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
{ "bikeId" : <bike_id>, "duracaoMedia" : <duracao_media> }
```

---

## Instruções para entregar seu projeto:

### ANTES DE COMEÇAR A DESENVOLVER:

1. Clone o repositório
  * `git clone git@github.com:tryber/sd-02-mongodb-aggregations.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd sd-02-mongodb-aggregations`

2. Crie uma branch a partir da branch `master`
  * Verifique que você está na branch `master`
    * Exemplo: `git branch`
  * Se não estiver, mude para a branch `master`
    * Exemplo: `git checkout master`
  * Agora, crie uma branch onde você vai guardar os `commits` do seu projeto
    * Você deve criar uma branch no seguinte formato: `nome-de-usuario-nome-do-projeto`
    * Exemplo: `git checkout -b leandro-domingues-mongodb-aggregations`

3. Para cada exercício, você deve criar um novo arquivo js seguindo a seguinte estrutura:
  * desafio1.js, desafio2.js, ..., desafioN.js

4. Adicione as mudanças ao _stage_ do Git e faça um `commit`
  * Verifique que as mudanças ainda não estão no _stage_
    * Exemplo: `git status` (deve aparecer o arquivo que você alterou como desafio1.sql)
  * Adicione o novo arquivo ao _stage_ do Git
      * Exemplo:
        * `git add .` (adicionando solução para desafio 1)
        * `git status` (deve aparecer listado o arquivo _desafio1.js_ em verde)
  * Faça o `commit` inicial
      * Exemplo:
        * `git commit -m 'iniciando o projeto MongoDB aggregations'` (fazendo o primeiro commit)
        * `git status` (deve aparecer uma mensagem tipo _nothing to commit_ )

6. Adicione a sua branch com o novo `commit` ao repositório remoto
  * Usando o exemplo anterior: `git push -u origin seunome-mongodb-aggregations`

7. Crie um novo `Pull Request` _(PR)_
  * Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/tryber/sd-02-mongodb-aggregations/pulls)
  * Clique no botão verde _"New pull request"_
  * Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
  * Clique no botão verde _"Create pull request"_
  * Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
  * **Não se preocupe em preencher mais nada por enquanto!**
  * Volte até a [página de _Pull Requests_ do repositório](https://github.com/tryber/sd-02-mongodb-aggregations/pulls) e confira que o seu _Pull Request_ está criado

---

### DURANTE O DESENVOLVIMENTO

* ⚠ **LEMBRE-SE DE CRIAR TODOS OS ARQUIVOS DENTRO DA PASTA COM O SEU NOME** ⚠

* Faça `commits` das alterações que você fizer no código regularmente

* Lembre-se de sempre após um (ou alguns) `commits` atualizar o repositório remoto

* Os comandos que você utilizará com mais frequência são:
  1. `git status` _(para verificar o que está em vermelho - fora do stage - e o que está em verde - no stage)_
  2. `git add` _(para adicionar arquivos ao stage do Git)_
  3. `git commit` _(para criar um commit com os arquivos que estão no stage do Git)_
  5. `git push -u nome-da-branch` _(para enviar o commit para o repositório remoto na primeira vez que fizer o `push` de uma nova branch)_
  4. `git push` _(para enviar o commit para o repositório remoto após o passo anterior)_

### Entregáveis

Para entregar o seu projeto você deverá criar um Pull Request neste repositório. Este Pull Request deverá conter os arquivos js dos desafios 1 ao 14.

Qualquer dúvida, procure a monitoria. Lembre-se que você pode consultar nosso conteúdo sobre Git & GitHub sempre que quiser!

---

### DEPOIS DE TERMINAR O DESENVOLVIMENTO

Para **"entregar"** seu projeto, siga os passos a seguir:

* Vá até a página **DO SEU** _Pull Request_, adicione a label de _"code-review"_ e marque seus colegas
  * No menu à direita, clique no _link_ **"Labels"** e escolha a _label_ **code-review**
  * No menu à direita, clique no _link_ **"Assignees"** e escolha **o seu usuário**
  * No menu à direita, clique no _link_ **"Reviewers"** e digite `students`, selecione o time `tryber/students-sd-02`

Se ainda houver alguma dúvida sobre como entregar seu projeto, [aqui tem um video explicativo](https://vimeo.com/362189205).

---

### REVISANDO UM PULL REQUEST

⚠⚠⚠

À medida que você e os outros estudantes forem entregando os projetos, vocês serão alertados **via Slack** para também fazer a revisão dos _Pull Requests_ dos seus colegas. Fiquem atentos às mensagens do _"Pull Reminders"_ no _Slack_!

Use o material que você já viu sobre [Code Review](https://course.betrybe.com/real-life-engineer/code-review/) para te ajudar a revisar os projetos que chegaram para você.
