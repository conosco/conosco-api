<p align="center"> <img src="https://raw.githubusercontent.com/conosco/docs/master/_media/bg.png" width="auto" height="400" /> 
<br> 
<a href="https://gitlab.com/guilhermesiqueira/conosco-api/commits/master"><img alt="pipeline status" src="https://gitlab.com/guilhermesiqueira/conosco-api/badges/master/pipeline.svg" /></a>
<a href="https://codeclimate.com/github/conosco/conosco-api/maintainability"><img src="https://api.codeclimate.com/v1/badges/e7184329fbb02d9ea608/maintainability" /></a>

# Conosco API

## Como executar o projeto
1. Abra um terminal dentro do repositório clonado do conosco-api
2. Digite no terminal:
```bash
docker build -t guilhermesiqueira/conosco-api .
```
3. Em seguida, digite no mesmo terminal: 
```bash
docker-compose up
```
Pronto, o uma instância do banco de dados já está rodando em conjunto com a aplicação NestJS
