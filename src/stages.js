
const stages = {
    0: {
        description: 'Welcome',
        obj: require('./stages/0')
    },
    1: {
        description: 'Location',
        obj: require('./stages/1')
    },
    2: {
        description: 'Incident',
        obj: require('./stages/2')
    },
    3: {
        description: 'Picture',
        obj: require('./stages/3')
    },
    4: {
        description: 'Others',
        obj: require('./stages/4')
    },
    5: {
        description: 'Finish',
        obj: require('./stages/5')
    },
}

exports.steps = stages