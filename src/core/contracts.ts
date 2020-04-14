export interface Entity {
    // stub
}

export interface Environment {
    // stub
}

export interface State {
    entities: Entity[];
}

/**
 * Transient state model that is modified on every tick. The state will only be converted
 * to an ImmutableState instance once the simulation iteration has ended in order for it
 * to be added to the persistent experiment structure.
 */
export interface MutableState extends State {
    // stub
}

/**
 * The ImmutableState is used as a "snapshot" of the result of every simulation iteration
 * and stored in the persistent experiment structure.
 */
export interface ImmutableState extends State {
    // stub
}

export interface Experiment {

    environment: Environment;
    beginState: ImmutableState;
    states: ImmutableState[]; // Resulting states from iterations

    // For save/load:
    serialize(): string;
    deserialize(serialized: string): this;
    // "deserialize" is actually static or abstract to the ExperimentI implementation itself so
    // we should probably eventually use some kind of generic ExperimentIO or whatever interface

}

export interface Iteration {

    // Every simulation iteration consists of an arbitrary number of ticks. The intermediate states
    // (stored in memory at `currentState`) are not persistent but once the iteration completes, the
    // resulting state is stored to `resultState`

    environment: Environment;
    beginState: ImmutableState;
    currentState: MutableState;
    resultState: ImmutableState | undefined;

    tick(): void;

    // TODO some sort of predicate that determines whether the simulation iteration should halt
}
