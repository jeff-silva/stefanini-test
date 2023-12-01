# Teste Stefanini

Olá! Este é o meu teste <a href="https://github.com/mvdornellas/serverless-challenge">Serverless Challange</a>.

O sistema roda em um lambda na AWS com banco de dados DynamoDB, tudo configurado por Serverless Framework rodando com NestJS.

Para começar, precisaremos obviamente instalar as dependências:

```bash
yarn
```

Fazer o <a href="https://www.serverless.com/framework/docs/providers/aws/guide/credentials">procedimento de autenticação</a> na Amazon AWS.

Após isso, podemos testar localmente em <a href="http://localhost:3000">http://localhost:3000</a>:

```bash
yarn start:dev
```

Ou ainda, simular o Lambda localmente:

```bash
sls offline start
```

E por fim, fazer o deploy para a nuvem:

```bash
sls deploy
```

Os testes unitários podem ser feitos pelo comando:

```bash
yarn test
```

Para testar as requests mais facilmente em algum software como o Postman, criei o arquivo `openapi.json`.

Perdoe qualquer erro de estrutura, backend com Node+Nest e Lambda AWS foram uma novidade para mim, mas muito interessante.

Espero ter alcançado as espectativas, muito obrigado!
