import _ from 'lodash';

const gradientShuffle = (index: number) => Math.random() * index;

/**
 * Sort the list using a "survival chance" function
 */
export default function gradientSort<T>(list: T[], chance: (index: number, item: T) => number = gradientShuffle): T[] {
    return _(list)
        .map((item, index) => ({item, score: chance(index, item)}))
        .sortBy(row => row.score)
        .map(row => row.item)
        .value();
};
