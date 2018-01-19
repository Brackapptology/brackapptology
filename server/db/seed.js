const { User } = require('./models');
const db = require('./db');

const data = {
    users: [
        {
            name: 'Pauly Paulicap',
            userName: 'pauly33',
            isAdmin: false,
            email: 'pauly@pauly.com',
            password: 'pauly'
        },

        {
            name: 'Dundrecous Nelson',
            userName: 'drecyoself',
            isAdmin: true,
            email: 'dundrecous@dundrecous.com',
            password: 'dundrecous'
        }
    ]
}

db.sync({ force: true })
    .then(() => {
        data.users.forEach(user => {
            User.create(user)
        })
    })
    .catch(err => console.error(err));