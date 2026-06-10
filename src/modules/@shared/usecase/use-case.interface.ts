export default interface UseCaseInterface<I = unknown, O = unknown> {
    execute(input: I): Promise<O>;
}