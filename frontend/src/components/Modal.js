import React from "react"; 

class Modal extends React.Component{ 
    render() { return (
<div className="container">
    <button class="btn modal-trigger blue" data-target="modal1">Modal</button>
    <div id="modal1" class="modal">
        <div class="modal-content">
            <p>¿Está seguro que desea eliminar el cliente?</p>
        </div>
        <div class="modal-footer" dismissible="false">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Cerrar</a>
        </div>
    </div>
</div>
) } } export default Modal;
