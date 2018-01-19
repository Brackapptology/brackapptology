const { User } = require('./models');
const db = require('./db');

const data = {
    users: [
        {
            name: 'Pauly Paulicap',
            userName: 'pauly33',
            isAdmin: false,
            email: 'pauly@pauly.com',
            photoUrl: 'https://thenypost.files.wordpress.com/2017/12/pauly_paulicap.jpg?quality=90&strip=all',
            password: 'pauly'
        },

        {
            name: 'Dundrecous Nelson',
            userName: 'drecyoself',
            isAdmin: true,
            email: 'dundrecous@dundrecous.com',
            photoUrl: 'http://media.gulflive.com/mississippi-press-sports/photo/9375513-large.jpg',
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