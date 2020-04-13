# NEAT-O-Engine

NEAT-O (a.k.a. NeuroEvolution of Augmenting Topologies-Onderzoekjes)

The aim of this project is to create a modular engine for running cross-platform (browser-based, more specifically) neuro-evolutionary experiments.
As you can tell by our index page, we're not there yet.

### Goals:

 - The simulation is tick-based and thus deterministic excluding randomness introduced by the actual algorithm implementation used for evolution / mutation
 - The result of every simulation iteration is an immutable state and can be saved / loaded based on a persistent "Experiment" model that serializes / deserializes to a buffer that can be written to LocalStorage, redis, etc.
 - The GUI should be intuitive and moreover non-repulsive for a change
 - The GUI should enable full insight into both the realtime state of the simulation (in case of realtime simulation) as well as every resulting iteration state (`ImmutableState`) not entirely unlike [Redux DevTools](https://github.com/reduxjs/redux-devtools)
 - The tick-based architecture should allow the simulation to be ran at whatever frequency the CPU allows and be fully consistent with the real-time equivalent
 - The GUI should ultimately facilitate the setup of experiments fully, providing - if necessary - an intelligent "code" input component (based on e.g. [monaco](https://microsoft.github.io/monaco-editor/index.html)) for expression parameters such as the fitness function

### To get started:

```
npm install
npm run start

# or if you're using yarn:

yarn
yarn start
```
