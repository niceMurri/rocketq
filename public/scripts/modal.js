function Modal(modal, className){
    this.modal = document.querySelector(modal);
    this.className = className;

    //cancel modal(Close MODAL)
    this.cancel = document.querySelector('.cancel');
    
    if(!this.cancel) return; 
    
    this.cancel.addEventListener('click', this.openCloseModal.bind(this));
}

Modal.prototype.openCloseModal = function(event){
    event.preventDefault();
    const element = event.target

    this.changeModalContent(element);
    this.modal.classList.toggle(this.className);


};

Modal.prototype.changeModalContent = function(element){
    //remove all button classes
    const button = this.modal.querySelector('button');
    button.removeAttribute('class');

    //evento foi clicado no check?
    const check = element.classList.contains('check');
    
    //take title and description
    const title = this.modal.querySelector('.title');
    const description = this.modal.querySelector('.description');
    const form = this.modal.querySelector('form');

    
    //change content
    title.innerText = check ? 'Marcar como lida' : 'Excluir pergunta'

    description.innerText = 
        check
        ? 'Tem certeza que você deseja marcar essa pergunta como lida?' 
        : 'Tem certeza que você deseja excluir essa pergunta?'

        //form
    const roomId = document.querySelector('#room-id').dataset.id;
    const questionId = element.dataset.id;
    console.log(questionId)
    const slug = check ? 'check' : 'delete'
    form.setAttribute('action', `/question/${roomId}/${questionId}/${slug}`)


    check ? button.setAttribute('class', 'btn btn-solid-blue')
          : button.setAttribute('class', 'btn btn-solid-red');

    button.innerText = check ? 'Sim, marcar como lido' : "Sim, excluir";

}

export default Modal;