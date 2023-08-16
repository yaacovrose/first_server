import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt'

const app = express();
app.use(express.json());

const users = [
    {
        id: uuidv4(),
        email: 'yrose',
        password: '12345678'
    },
    {
        id: uuidv4(),
        email: 'zvika',
        password: '13579'
    },
    {
        id: uuidv4(),
        email: 'mendi',
        password: '2468'
    },
]


// get all users
app.get('/users', (req, res) => {
    res.status(200).json({ users });
});

// get user by email
app.get('/users/:email', (req, res) => {
    const userEmail = req.params.email
    const checkId = users.find(item => item.id === userEmail)
    if (!checkId == '') {
        res.status(200).json({ checkId });
    } else {
        res.status(404).send('id is not found')
    }
});

// add new user
app.post('/users', (req, res) => {
    let data = req.body;
    users.push(data)
    res.send('Data Received: ' + JSON.stringify(data));
})

// check if user exist
app.post('/users', (req, res) => {
    const { email, password } = req.body
    if (users.find(item => item.email === email && item.password === password)) {
        res.send('user is connected')
    } else {
        res.send('user not found')
    }
})

// add user with hash password
app.post('/users/ps', async (req, res) => {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 1);
        const newUser = {
            id: uuidv4(),
            email,
            passwordHash: hashedPassword
        };
        users.push(newUser);
        res.status(200).send('user successfully added');
});

// update user
app.put('/users/:email', (req, res) => {
    const userEmail = req.params.email
    const user = users.findIndex(item => item.email === userEmail)
    console.log(user)
    if (user !== -1) {
        const { email, password } = req.body
        console.log(email)
        users[user].email = email
        users[user].password = password
        res.send('user update')
    } else {
        res.status(404).send('user is not found')
    }
})

// delete user
app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const user = users.findIndex(item => item.id === userId)
    delete (users[user])
    res.send('Got a DELETE request at /user')
})



app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);




