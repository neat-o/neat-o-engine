import delay from 'delay';
import {flatMap, sortBy} from 'lodash';

import container from "./inversify.config";
import gradientSort from "./util/gradientSort";

type Immutable<T> = {
    readonly [K in keyof T]: Immutable<T[K]>;
}

export type SimpleEntityState = {
    x: number,
    y: number,
}

export type EntityI<ES = SimpleEntityState, DNA extends Immutable<any> = any> = {
    state: ES,
    dna: DNA,
}

// TODO type hack below.. the state interface should ultimately also be
//  a part of the experiment rather than hardcoded here
const initialState: SimpleEntityState | any = {x: 0, y: 0};

class Entity<ES = SimpleEntityState, DNA extends Immutable<any> = any> implements EntityI<ES, DNA> {

    state!: ES;
    readonly dna!: DNA;

    constructor(state: ES, dna: DNA) {
        this.state = state;
        this.dna   = dna;
    }
}

export interface ExperimentI<ES = SimpleEntityState, DNA extends Immutable<any> = any> {
    spawn(): DNA;

    mutate(dna: DNA): DNA;

    step(entityState: ES, dna: DNA): ES;

    fitness(entityState: ES): number;

    halt(simulation: Simulation<ES, DNA>): boolean;
}

// TODO "compile experiment"

export class Simulation<ES = SimpleEntityState, DNA extends Immutable<any> = any> {

    steps = 0;

    experiment!: ExperimentI<ES, DNA>;

    entities!: EntityI<ES, DNA>[];

    constructor(experiment: ExperimentI<ES, DNA>, entities?: EntityI<ES, DNA>[]) {
        this.experiment = experiment;
        this.entities   = entities ? entities : this.setup();
    }

    private setup(): EntityI<ES, DNA>[] {
        const entities = [];
        for (let i = 0; i < 100; i++) {
            // "Generate" random DNA
            const dna = this.experiment.spawn();
            entities.push(new Entity(initialState, dna));
        }
        return entities;
    }

    private step() {
        for (const entity of this.entities) {
            entity.state = this.experiment.step(entity.state, entity.dna);
        }
        this.steps++;
    }

    private shouldHalt() {
        return this.experiment.halt(this);
    }

    async run(interval: number, render?: (simulation: Simulation<ES, DNA>) => boolean) {
        while (!this.shouldHalt()) {
            if (interval) await delay(interval);
            this.step();
            if (render) {
                const stillRunning = render(this);
                if (!stillRunning) break;
            }
        }
    }
}

const compile = (src: string): ExperimentI => {

    let experiment: any;

    // Remove "const" or "let" from the beginning and evaluate dirty
    eval(src.replace(/^(const|let) /, ''));

    return experiment;
};

const render = (simulation: Simulation, context: CanvasRenderingContext2D) => {

    const width  = context.canvas.width;
    const height = context.canvas.height;

    context.clearRect(0, 0, width, height);
    context.lineWidth   = 1;
    context.strokeStyle = 'black';
    for (const entity of simulation.entities) {
        context.beginPath();
        context.arc(
            width / 3 + entity.state.x,
            height / 2 + entity.state.y,
            4, 0, Math.PI * 2
        );
        context.stroke();
    }
};

/**
 * Start the simulation given the experiment source code.
 * Returns a function that will stop the simulation.
 * @param src
 */
export const start = (src: string): () => void => {

    const experiment = compile(src);
    const context    = container.get<CanvasRenderingContext2D>('context');

    let simulation = new Simulation(experiment);
    let running    = true;

    (async () => {
        while (true) {
            await simulation.run(30, simulation => {
                render(simulation, context);
                return running;
            });

            if (!running) break;

            const entities = simulation.entities;

            const survivors = gradientSort(sortBy(entities,
                entity => -experiment.fitness(entity.state)
            )).splice(0, entities.length / 2);

            const offspring = flatMap(survivors, entity => [
                new Entity(initialState, experiment.mutate(entity.dna)),
                new Entity(initialState, experiment.mutate(entity.dna)),
            ]);

            simulation = new Simulation(experiment, offspring);
        }
    })();

    return () => running = false;
};
