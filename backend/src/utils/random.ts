export function randomInt(from: number, to: number) {
    return Math.round(Math.random() * (to - from)) + from
}

export function crossProduct<TypeA, TypeB>(a: TypeA[], b: TypeB[]) {
    const results: [TypeA, TypeB][] = []
    for (let elementA of a) {
        for (let elementB of b) {
            const item: [TypeA, TypeB] = [elementA, elementB]
            results.push(item)
        }
    }
    return results
}

export function sample<ListItemType>(list: ListItemType[]) {
    const randomIndex = randomInt(0, list.length - 1)
    return list[randomIndex]
}

export function sampleMultipleWithoutRepition<ListItemType>(list: ListItemType[], amount: number) {
    const result: ListItemType[] = []
    if (amount > list.length) {
        throw Error('you cannot sample more elements than the list has entries')
    }
    while (result.length < amount) {
        const sampled = sample(list)
        if (!result.includes(sampled)) {
            result.push(sampled)
        }
    }
    return result
}