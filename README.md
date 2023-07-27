# Aplicativo mobile para cadastro de CNPJ's
[![NPM](https://img.shields.io/npm/l/react)](https://github.com/devsuperior/sds1-wmazoni/blob/master/LICENSE) 

## Sobre

Aplicativo idealizado por mim para um teste de conhecimento em desenvolvimento mobile.

## Desafios e aprendizado

Esse projeto me ajudou muito no desenvolvimento de formulários utilizando os recursos do react hook forms e yup resolvers, 
que melhoram o desempenho não só do formulário, mas do aplicativo como um todo, pois tira a necessidade de criar um estado para cada 
campo do formulário e assim a aplicação não terá que executar cada estado toda vez que houver uma alteração e como um cadastro de CNPJ 
requer muitas informações, esses recursos foram muito importantes. Além disso, como se trata de um aplicativo pequeno, usei o async storage 
para armazenar todos registros e utilizá-los para a tela de pesquisas, nela, criei modos de pesquisas para CNPJ ou Nome Fantasia, além de 
exibir todos os registros já no corpo da tela sem qualquer filtro. Ao pesquisar os dados de uma empresa, o usuário tem a possibilidade de fazer upload alguns documentos 
e anexar ao cadastro, e por fim, usei o react animatable para deixar as telas mais dinâmicas.

## Tecnologias utilizadas

- Typescript
- React Hook Forms
- React Native
- Async Storage
- Expo cli
- Expo Document Picker
- Expo Image Picker

## Layout

<a src="https://youtu.be/1277i6x6Ah8" style="width: 200px; height: 200px;">
  <img src="https://github.com/devjoedson91/app-cadastro-pessoa-juridica/blob/main/src/assets/cover.jpg" width="100%" />
</a>

## Como usar

- Clone o repositório
git clone https://github.com/devjoedson91/app-cadastro-pessoa-juridica.git

- Entre no diretório
cd app-cadastro-pessoa-juridica

- Instale as dependencias
npm install

- Abra no VS code
code .

- Execute o projeto
Execute o projeto com o comando npx expo start no seu cmd, se você utiliza Expo cli, baixe o aplicativo expo go no seu dispositivo mobile e
abra a conexão utilizando o qrcode gerando na execução do app pelo cmd.

