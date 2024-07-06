$(document).ready(function () {
    invitados.loadGuestInfo();
    document.getElementById("btnConfirmar").onclick = function (e) {
        e.preventDefault();
        invitados.confirm();
    };
})