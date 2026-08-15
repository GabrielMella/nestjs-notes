// NOTE: Este projeto usa autenticação stateless via JWT (ver src/auth/strategies/jwt.strategy.ts),
// portanto não há necessidade de uma entidade de persistência para autenticação.
// A classe `Auth` abaixo era um placeholder vazio, sem atributos/métodos e sem nenhuma
// referência em todo o codebase (confirmado via busca por `Auth`/`auth.entity` em src/).
// Ela foi mantida apenas como classe vazia neutra para não quebrar builds que eventualmente
// ainda apontem para este caminho; o arquivo pode ser excluído com segurança do repositório
// (via `git rm`) assim que essa referência residual for removida do controle de versão.
// Caso no futuro seja necessário rastrear sessões ou tokens revogados, crie uma entidade
// com propósito específico (ex.: TokenBlacklist) em vez de reaproveitar este placeholder.
export class Auth {}
