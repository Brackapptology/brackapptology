const { User } = require('./models');
const db = require('./db');

const data = {
    users: [
        {
            name: 'Ari Kramer',
            userName: 'ari',
            isAdmin: true,
            email: 'arikramer24@gmail.com',
            photoUrl: 'https://lh3.googleusercontent.com/-T0ByE5iwLY0/AAAAAAAAAAI/AAAAAAAAADI/Ai5EHJERUmQ/photo.jpg?sz=50',
            googleId: '101391036987203459079'
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