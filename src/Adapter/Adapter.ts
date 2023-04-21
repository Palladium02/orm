export abstract class Adapter {
  public abstract query<T>(query: string): Promise<T>;

  protected abstract connection?: unknown;
}
