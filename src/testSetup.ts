export default `function spawn() {
    return {heading: Math.random() * Math.PI * 2};
}

function mutate(dna) {
    return {heading: dna.heading + Math.random() * .2 - .1};
}

function step(entity) {
    entity.x += Math.cos(entity.dna.heading);
    entity.y += Math.sin(entity.dna.heading);
}

function fitness(entity) {
    return entity.x;
}`;
