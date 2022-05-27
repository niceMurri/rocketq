const enterRoomForm = document.querySelector('#form-enter-room');

enterRoomForm.addEventListener('submit', e => {
    e.preventDefault();
    const idRoom = e.target.querySelector('input').value;
    enterRoomForm.setAttribute('action', `/room/${idRoom}`)
})
