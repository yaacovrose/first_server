

const users = [
    {
        "id": '1',
        "email": 'yrose',
        "password": '12345678'
    },
    {
        "id": '2',
        "email": 'zvika',
        "password": '13579'
    },
    {
        "id": '3',
        "email": 'mendi',
        "password": '2468'
    },
]
const user = 3
for (let i = 0; i < users.length; i++) {
    if (users[i].id == user) {

        console.log(users[i])
    }
}