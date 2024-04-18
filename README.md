
[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#-lab-medical)


# ➤ ➤ Lab Medical


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#descrio)


## ➤ ➤ Descrição

Lab Medical é um projeto desenvolvido em Angular que tem como objetivo fornecer uma solução abrangente para a gestão hospitalar, com foco no gerenciamento de pacientes, consultas e exames.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#problema)


## ➤ ➤ Problema

A Medicine365 Inc identificou a necessidade de um software robusto para gerenciar o inventário médico e melhorar a eficiência operacional. O Lab Medical foi concebido para atender a essa demanda, oferecendo uma solução eficaz e fácil de usar para a gestão de pacientes e registros médicos.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#-tecnologias-utilizadas)


## ➤ ➤ Tecnologias Utilizadas

- Angular: Framework utilizado para o desenvolvimento do frontend da aplicação.
- RxJS: Biblioteca para programação reativa usada para lidar com eventos assíncronos.
- TypeScript: Linguagem de programação que estende o JavaScript adicionando tipos estáticos.
- Prettier: Ferramenta para formatação automática do código, mantendo-o consistente e legível.
- json-server: Simulador de API REST para o armazenamento de dados em ambiente de desenvolvimento.
- TailwindCss: Framework CSS utilizado para estilização do layout da aplicação.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#-como-executar)


## ➤ ➤ Como Executar

1. Clone o repositório para a sua máquina local usando `git clone`.
2. Navegue até a pasta do projeto e execute `npm install` para instalar as dependências.
3. Execute `npm run start` para iniciar o servidor de desenvolvimento.
4. Servidor Json server rodando na web: `http://evolucaoagil.com.br:3000/`
5. Abra o navegador e acesse `http://localhost:4200`.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#-extutura-da-aplicao)


## ➤ ➤ Extutura da aplicação

```
lab-medical 
│ ├──➤ app/ # Pasta raiz da aplicação 
│ │  ├──➤ components/ # Componentes da aplicação 
│ │  │ ├──➤ appointment-registration/ # Componente de cadastro de consulta 
│ │  │ ├──➤ exam-registration/ # Componente de cadastro de exame 
│ │  │ ├──➤ home/ # Componente da página inicial 
│ │  │ ├──➤ login/ # Componente de login 
│ │  │ │  └──➤ sign-up/ # Componente de cadastro de usuário 
│ │  │ ├──➤ medical-listing/ # Componente de listagem médica 
│ │  │ │  └──➤ patient-listing/ # Componente de listagem de pacientes 
│ │  │ ├──➤ patient-registration/ # Componente de cadastro de paciente 
│ │  │ └──➤ shared_components/ # Componentes compartilhados 
│ │  │ │  ├──➤ sidebar/ # Componente de barra lateral 
│ │  │ │  ├──➤ spinner/ # Componente de spinner de carregamento 
│ │  │ │  ├──➤ toolbar/ # Componente de barra de ferramentas
│ │  │ │  └──➤ Modal/ # Componente de Modal Dinamico
│ │  ├──➤ guardsRoutes/ # Guardas de rotas 
│ │  ├──➤ pipes/ # Pipes da aplicação 
│ │  └──➤ services/ # Serviços da aplicação 
│ ├──➤ assets/ # Arquivos estáticos 
├──➤ package.json # Metadados e dependências do projeto 
└──➤ README.md # Documentação do projeto
```

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#funcionalidades-implementadas)


## ➤ ➤ Funcionalidades Implementadas

- Autenticação de Usuário: Implementação de um sistema de autenticação seguro, permitindo que os usuários façam login e acessem as funcionalidades do sistema.
- Gerenciamento de Estado Global: Utilização de técnicas para gerenciamento eficiente do estado da aplicação, garantindo consistência e performance.
- Integração com API ViaCEP: Utilização da API ViaCEP para obter informações de endereço durante o cadastro de pacientes.
- Armazenamento de Dados com JSON Server: Utilização do JSON Server para simular uma API REST e armazenar as informações cadastradas pelo usuário de forma persistente.
- Versionamento de Código com GitFlow: Adoção do padrão GitFlow para organização e controle de versões do código fonte.


[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#-melhorias-futuras)


## ➤ ➤ Melhorias Futuras

- Melhorar a responsividade do design para garantir uma boa experiência do usuário em dispositivos de diferentes tamanhos.
- Implementação de testes de unidade e de integração para garantir a qualidade do código.
- Melhorar a interface do usuário para torná-la mais intuitiva e fácil de usar.
- Recuperação de Senha: Implementação da funcionalidade de recuperação de senha para oferecer uma experiência completa de autenticação.



[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#licença)


## ➤ ➤ Licença

Este projeto está licenciado sob a licença MIT.
