const { User, Bracket } = require('./models');
const db = require('./db');

const data = {
    users: [
        {
            firstName: 'Pauly',
            lastName: 'Paulicap',
            userName: 'pauly33',
            isAdmin: false,
            email: 'pauly@pauly.com',
            password: 'pauly'
        },

        {
            firstName: 'Dundrecous',
            lastName: 'Nelson',
            userName: 'drecyoself',
            isAdmin: true,
            email: 'dundrecous@dundrecous.com',
            password: 'dundrecous'
        }
    ],

    brackets: [
        {
            field: {
                1: 'Duke',
                2: 'Arizona',
                3: 'Oklahoma',
                4: 'Villanova',
                5: 'Clemson',
                6: 'West Virginia',
                7: 'Virginia',
                8: 'Texas Tech'
            }
        }
    ]
}

db.sync({ force: true })
    .then(() => {
        data.users.forEach(user => {
            User.create(user)
        })
    })
    .then(() => {
        data.brackets.forEach(bracket => {
            Bracket.create(bracket)
        })
    })
    .catch(err => console.error(err));