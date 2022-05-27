import Modal from "./modal.js";
//MODAL--

//instance of modal
const modal = new Modal('.modal-wrapper', 'active');

//take all buttons with the class .check and .delete
const checkButtons = document.querySelectorAll('.actions a.check');
const deleteButtons = document.querySelectorAll('a.delete');


const btns = [...checkButtons,...deleteButtons]

//add listener for open and close MODAL
btns.forEach(btn => {
    btn.addEventListener('click', modal.openCloseModal.bind(modal));
})

//ENTER ROOM --

const enterRoomForm = document.querySelector('#form-enter-room');

enterRoomForm && enterRoomForm.addEventListener('submit', e => {
    const roomId = e.target.querySelector('input').value;

    if(!roomId) return e.preventDefault();
    

    enterRoomForm.setAttribute('action', `/room/${roomId}`)
})

//COPYTOCLIPBOARD ID ROOM

const buttonIdRoom = document.querySelector('#room-id');
console.log(buttonIdRoom);

buttonIdRoom && buttonIdRoom.addEventListener('click', e => {
    const copyText = e.target.innerText.slice(1);

    //for mobiles
    e.target.select()
    



    navigator.clipboard.writeText(copyText)
    console.log('xd');

})
