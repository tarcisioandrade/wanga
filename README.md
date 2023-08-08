<br />
<div align="center">
  <a href="https://github.com/tarcisioandrade/wanga">
    <img src="mobile/assets/logo.svg" alt="Logo" width="150" height="150">
  </a>

  <h1 align="center">Wanga</h1>

  <p align="center">
    Imagine mergulhar em histórias fascinantes, repletas de personagens cativantes e cenários deslumbrantes. Agora, essa experiência está ao alcance das suas mãos com o Wanga - o aplicativo definitivo de leitura de mangás, manhua e novels!
    <br />
    <br />
    <br />
    <br />
  </p>
</div>




## Sobre o Projeto
</br>

![Wanga Hero Image](https://github.com/tarcisioandrade/wanga/assets/61153830/f1755370-54e9-4e65-83d4-2dfc0a660342)


O Wanga é um aplicativo de leitura de mangás, manhuas e novels que oferece uma experiência imersiva e envolvente para os amantes de histórias ilustradas. Com uma biblioteca em constante expansão e atualizações frequentes, o Wanga é o destino ideal para saciar sua sede por aventura e imaginação.

Com uma interface intuitiva e fácil de usar, o Wanga permite que você mergulhe de cabeça em histórias emocionantes, repletas de personagens cativantes e cenários deslumbrantes. Através do aplicativo, você terá acesso a uma ampla variedade de gêneros, incluindo ação, romance, fantasia, ficção científica e muito mais.

Além de oferecer uma experiência de leitura visualmente estimulante, o Wanga também conta com recursos que tornam a sua jornada ainda mais personalizada. Você pode salvar seus mangás, manhuas e novels nos favoritos, salva automaticamente seu histórico e você tambem pode retomar a leitura do capítulo onde parou.

## Inicializar o Projeto

Clone o projeto `git clone https://github.com/tarcisioandrade/wanga.git`

### Mobile

**Pré-requisitos**

    npm i -g eas-cli
    npm install
    
Atualize o arquivo .env.example com suas informações.

#### Android Emulator

 1. `npx expo run:android`
 2. O APK vai ser gerado em android/
 3. Após o processo de build completar o app deve ser executado automaticamente no emulador.

## Movendo para sua conta Expo

Se você quiser copiar esse repositório e usá-lo em sua própria conta Expo para poder aproveitar compilações em seus próprios dispositivos, você precisará fazer o seguinte:

> Os passos abaixo assumem que você já concluiu os pré-requisitos.

 1. Faça um [Fork](https://github.com/tarcisioandrade/wanga/fork) do projeto.
 2. Vá para o painel de projetos do `expo.dev`: https://expo.dev/accounts/{username}/projects (Certifique-se de atualizar `{username}` com seu nome de usuário do Expo)
 3. Clique em `Create a Project`
 4. Em app.json atualize os seguintes valores do seu projeto recém gerado encontrado em https://expo.dev/accounts/{username}/projects/{slug}:
- **slug**
- **extra.eas.projectId**
- **android.package**

### Backend

O banco de dados usado foi o nosql da mongoDB, mas você pode trocar para qualquer um dos [bancos de dados compatíveis ](https://www.prisma.io/docs/concepts/database-connectors)com o prisma.

**Pré-requisitos**

Node versão >= 16.

    npm install

Atualize o arquivo .env.example com suas informações.
  

     npx prisma db push

**Inicializando servidor**
 
    npm run dev
