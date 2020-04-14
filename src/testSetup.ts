export default `const experiment = {

    fitness: state => state.x,
    
    spawn:   () => ({
        heading: Math.random() * Math.PI * 2,
        speed:   2.5 + Math.random() * 2,
    }),
    step:    (state, dna) => ({
        x: state.x + Math.cos(dna.heading) * dna.speed,
        y: state.y + Math.sin(dna.heading) * dna.speed,
    }),
    mutate:  dna => ({
        heading: dna.heading + Math.random() * .1 - .05,
        speed:   dna.speed + Math.random() * .4 - .2,
    }),
    halt:    simulation => simulation.steps >= 100,
};`;
