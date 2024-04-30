const socket = io('http://localhost:8000')
const form = document.getElementById("send-container")
const messageInp = document.getElementById('messageInp')
const messageContainer =  document.querySelector('.container')

const append = (message, position)=>{
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.classList.add('card')
    messageElement.classList.add('card-body')
    messageElement.classList.add(position)
    messageContainer.append(messageElement)
}

const name = prompt("Enter your name to join")
socket.emit('New-user-joined', name)

socket.on('user-hasBeen-joined', name=>{
    append(`${name} has been joined the chat`, 'right')
})

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const message = messageInp.value 
    append(`You: ${message}`,'right')
    socket.emit('send', message)
    messageInp.value = ''

})
socket.on('receive', data=>{
    append(`${data.name}: ${data.message}`, 'left')
})

socket.on('left', data=>{
    append(`${data.name} has left the chat`, 'left')
})