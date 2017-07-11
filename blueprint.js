
class Transmutter {
  method(source, proxy, property) {
    `source` aponta pro original, selado, nao pode nunca ser alterado.
    `proxy` começa como {} e vai adicionando valores pelo caminho, de 2 formas.:
      - diretamente no metodo, por `proxy[property]`
      - retornando valor que nao undefined, de modo que a engine executa `proxy[property] = returned`
  }
}


a engine deve iniciar pegando os `models`, selando-os e embrulhando-os com um `Proxy` capaz de:
  - gerar um novo objeto e aplicar a ele regras a serem definidas por meio de extensoes, todas as vezes que uma requisicao de acesso ocorrer.
  - desviar requisicoes para o objeto gerado se este contiver algum registro compativel com a requisicao.
  - dirigir requisicoes para o devido modelo, sem desvios, se a regra acima falhar.
