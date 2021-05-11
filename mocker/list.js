let list = [
    {
        id: 1,
        name: 'BB2',
        'user name': 'kenny',
        'home / address': 'Fu Zhou Road',
        'home / number': 'Yes:666',
        age: 4
    }, {
        id: 2,
        name: 'Sky walker',
        'user name': 'bumpy',
        'home / address': 'Yan An Road',
        'home / number': 'No:777',
        age: 6
    }, {
        id: 3,
        name: 'Judy',
        'user name': 'len',
        'home / address': 'No.1 Road',
        'home / number': '88',
        age: 2
    }, {
        id: 4,
        name: 'Honger',
        'user name': 'hunny',
        'home / address': '187 Road',
        'home / number': '99',
        age: 8
    }, {
        id: 5,
        name: 'Gopro',
        'user name': 'gpn',
        'home / address': 'Da Xing Street',
        'home / number': '000',
        age: 5
    }
]
list = Array.from(Array(3), _ => list).reduce((r, c) => r.concat(c)).map((item, i) => ({
    ...item,
    id: i + 1
}))

module.exports = list
