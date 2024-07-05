var qrcode = new QRCode("qrcode");
var Invitacion = {aux:2};




$(document).ready(function () {
    
})

function PullInvitados(){

    Invitacion.tipo = 'get'
    var t = $.param(Invitacion);
    $.post("https://script.google.com/macros/s/AKfycbxl3X8gmBrRV14Afx-ZfKSNfIdjrEvvpJM7HviIzNNb3L25-zJcb1Im10AFeF3Jip6v/exec", t).done(function (e) {
       
    if(e.result =='error'){
        console.log('error');
    }
    else{
        invitaciones = e.data;
        Invitacion = UrlCode();
        if (Invitacion.code == '500') {
            $('.invitacion').hide();
        }
        else if (Invitacion.code == 'INVALID') {
        }
        else {
            $('.invitacion').show();
            $('#invName').text(Invitacion.nombre);
            $('#invPersonas').text(Invitacion.personas);

            if(Invitacion.confirmaciones>0){
                console.log('esconder');
                $('#btnConfirmar').hide();
                $('#msgconfirmacion').hide()
                $('#lblconfirmacion').text('YA TENEMOS REGISTRADA TU CONFIRMACION, GRACIAS<3')
            }
            else{
                $('#btnConfirmar').show();
                console.log('mostrar');
            }



            qrcode.makeCode('https://alexismartinezrs.github.io/a_and_a/recepcion.html?code=' + Invitacion.code);
        }
    }
    
    }).fail(function (e) {
        console.log('error server');
    })

}
function UrlCode() {


    var defaultcode = { code: '500', personas: 0, nombre: 'INVALID' };

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    var codeurl = urlParams.get('code');

    if (codeurl == null) {
        return defaultcode;

    }
    else {
        var code = invitaciones.find(e => e.code == codeurl);
        if (code == undefined) {
            return defaultcode
        }
        else {
            if (code.nombre == 'INVALID') {
                return code;
            }
            else {
                return code;
            }
        }

    }
}
PullInvitados();