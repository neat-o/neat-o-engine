# NEAT-O-Engine

NEAT-O (a.k.a. NeuroEvolution of Augmenting Topologies-Onderzoekjes)

The aim of this project is to create a modular engine for running cross-platform (browser-based, more specifically) neuro-evolutionary experiments.

### Design:

 - The simulation is tick-based and thus deterministic (allows the simulation to be ran at whatever frequency the CPU allows and be fully consistent with the real-time equivalent)
 - The result of every iteration is an immutable state and can be saved / loaded based on a persistent "Experiment" model that serializes / deserializes to a buffer that can be written to LocalStorage, redis, etc.
 - The GUI is intuitive and moreover non-repulsive for a change
 - The GUI enables full insight into both the realtime state of the simulation (in case of realtime simulation) as well as the history of every resulting iteration state (`ImmutableState`) not entirely unlike [Redux DevTools](https://github.com/reduxjs/redux-devtools)
 - The GUI facilitates the setup of experiments fully, providing - if necessary - an intelligent "code" input component (based on e.g. [monaco](https://microsoft.github.io/monaco-editor/index.html)) for expression parameters such as the fitness function

### To get started:

```
npm install && npm run start

# or if you're a yarn type of person:

yarn && yarn start
```
