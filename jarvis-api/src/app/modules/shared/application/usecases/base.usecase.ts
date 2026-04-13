export interface UseCase<C, R> {
  execute(input: C): Promise<R>;
}
