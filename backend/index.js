const express = require('express')

const app = express()

app.get('/api/getEvents', (req, res) => {
    res.send([
        {
            name: 'test',
            description: 'this is a test',
            date: '2019-01-24T23:00:00.000Z',
            id: 'some-id',
            club: {
                name: 'some club'
            }
        },
        {
            name: 'test 2',
            description: 'this is a different test',
            date: '2019-01-24T23:00:00.000Z',
            id: 'some-id-2',
            club: {
                name: 'another club'
            }
        },
        {
            name: 'test 3',
            description: 'this is a yet a different test',
            date: '2019-01-24T23:00:00.000Z',
            id: 'some-id-3',
            club: {
                name: 'yet another club'
            }
        },
        {
            name: 'test 4',
            description: 'this is a yet a different test',
            date: '2019-01-24T23:00:00.000Z',
            id: 'some-id-4',
            club: {
                name: 'club 4'
            }
        }
    ])
})

app.listen(5000, () => {
    console.log('backend listing on port 5000')
})