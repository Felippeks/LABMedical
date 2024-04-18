# Lab Medical

## Descrição

Lab Medical é um projeto desenvolvido em Angular que tem como objetivo fornecer uma solução abrangente para a gestão hospitalar, com foco no gerenciamento de pacientes, consultas e exames.

## Problema

A Medicine365 Inc identificou a necessidade de um software robusto para gerenciar o inventário médico e melhorar a eficiência operacional. O Lab Medical foi concebido para atender a essa demanda, oferecendo uma solução eficaz e fácil de usar para a gestão de pacientes e registros médicos.

## Tecnologias Utilizadas

- Angular: Framework utilizado para o desenvolvimento do frontend da aplicação.
- RxJS: Biblioteca para programação reativa usada para lidar com eventos assíncronos.
- TypeScript: Linguagem de programação que estende o JavaScript adicionando tipos estáticos.
- Prettier: Ferramenta para formatação automática do código, mantendo-o consistente e legível.
- json-server: Simulador de API REST para o armazenamento de dados em ambiente de desenvolvimento.
- TailwindCss: Framework CSS utilizado para estilização do layout da aplicação.


## Como Executar

1. Clone o repositório para a sua máquina local usando `git clone`.
2. Navegue até a pasta do projeto e execute `npm install` para instalar as dependências.
3. Execute `npm run start-dev` para iniciar o servidor de desenvolvimento e o json-server simultaneamente.
4. Abra o navegador e acesse `http://localhost:4200`.

## Funcionalidades Implementadas

- Autenticação de Usuário: Implementação de um sistema de autenticação seguro, permitindo que os usuários façam login e acessem as funcionalidades do sistema.
- Gerenciamento de Estado Global: Utilização de técnicas para gerenciamento eficiente do estado da aplicação, garantindo consistência e performance.
- Integração com API ViaCEP: Utilização da API ViaCEP para obter informações de endereço durante o cadastro de pacientes.
- Armazenamento de Dados com JSON Server: Utilização do JSON Server para simular uma API REST e armazenar as informações cadastradas pelo usuário de forma persistente.
- Versionamento de Código com GitFlow: Adoção do padrão GitFlow para organização e controle de versões do código fonte.


## Melhorias Futuras

- Melhorar a responsividade do design para garantir uma boa experiência do usuário em dispositivos de diferentes tamanhos.
- Implementação de testes de unidade e de integração para garantir a qualidade do código.
- Melhorar a interface do usuário para torná-la mais intuitiva e fácil de usar.
- Recuperação de Senha: Implementação da funcionalidade de recuperação de senha para oferecer uma experiência completa de autenticação.


## Licença

Este projeto está licenciado sob a licença MIT.