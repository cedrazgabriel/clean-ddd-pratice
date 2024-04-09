// Either : Ou um ou outro
// No funtional error handling, existe um conceito de Left ou Right (LEFT = ERRO | RIGHT = SUCESSO)

// Erro
export class Left<L> {
  readonly value: L

  constructor(value: L) {
    this.value = value
  }
}

// Sucesso
export class Right<R> {
  readonly value: R

  constructor(value: R) {
    this.value = value
  }
}

export type Either<L, R> = Left<L> | Right<R>

export const left = <L, R>(value: L): Either<L, R> => {
  return new Left(value)
}

export const right = <L, R>(value: R): Either<L, R> => {
  return new Right(value)
}
