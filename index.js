import express from 'express'
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors'

const id = uuidv4();



const port = process.env.PORT || 3001;

const app = express()
app.use(express.json())
app.use(cors())



const users = []
const checkUserId = (request, response, next) => {
    const { id } = request.params 

    
    const index = users .findIndex( user => user.id ===id )

    
    if(index < 0) {
        return response.status(404).json({message: "User not found."})
    }

    request.userIndex = index 
    request.userId = id

    next()
}

app.get("/", (req, res) => {
    return res.json("Hello World")
});

app.get('/users', (request,response) => { 
    return response.json(users)
})

app.post('/users', (request,response) => {
    const { name, email, password} = request.body

   const user = { id:uuidv4(),  name, email, password } 

   users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id', checkUserId, (request,response) => {
    const { name, email, password} = request.body
    const index = request.userIndex
    const id = request.userId

    const updatedUser = { id, name, email, password}
   
    users[index] = updatedUser

    return response.json({updatedUser})
})

app.delete('/users/:id', checkUserId, (request,response) => {
     const index = request.userIndex

    users.splice(index,1)

    return response.status(204).json(users)
})









app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})