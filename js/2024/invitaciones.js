



const urlGoogleScript = `https://script.google.com/macros/s/AKfycbwZN7DkmoCy3PAlkwtQ5D1vySciLt3sMY1V_ePEvJz8z-YqyQwVZdfrdygUzSrUu6W-yw/exec?`

const invitados = {

    loadGuestInfo: () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var codeurl = urlParams.get('id');
        if (codeurl == null)
            return false
        invitados.getById(codeurl);
    },
    lista: [],
    getAll: async () => {
        try {
            const response = await fetch(urlGoogleScript + 'action=getData');

            if (!response.ok) {
                throw new Error('Error al obtener datos: ' + response.statusText);
            }

            const data = await response.json();

            if (!data.sucess) {
                throw new Error('Error en la respuesta: ' + data.error);
            }
            return data.data;
        } catch (error) {
            console.error('Error en getAll:', error.message);
            throw error;
        }

    },
    getById: (id) => {
        $('.invitacion').hide();
        fetch(urlGoogleScript + 'action=getData')
            .then((res) => {
                if (!res.ok)
                    throw new Error('Error leyendo datos');
                return res.json();
            }).then((res) => {

                if (!res.sucess)
                    throw new Error('Error leyendo datos');
                return res.data;
            }).then((res) => {
                const invitado = res.find(e => e.ID == id);
                if (!invitado) {
                    console.log('no existe');
                }
                else {
                    $('.invitacion').show();
                    $('#invName').text(invitado.FAMILIA);
                    $('#invPersonas').text(invitado.INVITADOS);

                    if (invitado.CONFIRMADO) {

                        $('#btnConfirmar').hide();
                        $('#msgconfirmacion').hide()
                        $('#lblconfirmacion').text('YA TENEMOS REGISTRADA TU CONFIRMACION, GRACIAS<3')
                    }
                    else {

                        $('#btnConfirmar').show();
                    }
                    var qrcode = new QRCode("qrcode");
                    qrcode.makeCode(invitado.ID);
                }
            })
    },
    confirm: () => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        var codeurl = urlParams.get('id');
        if (codeurl == null)
            return false

        $('#alert-wrapper').html(alert_markup('info', '<strong>Enviando tu confirmacion'));
        fetch(urlGoogleScript + 'action=confirmAssistance&id_invitado=' + codeurl)
            .then((res) => {
                if (!res.ok) {
                    $('#alert-wrapper').html(alert_markup('danger', '<strong>Error enviando confirmacion, por favor recarga la pagina'));
                    throw new Error('Error leyendo datos');

                }
                return res.json();
            }).then((res) => {
                console.log(res);
                $('#alert-wrapper').html(alert_markup('success', '<strong>Confirmacion Enviada'));
                $('#rsvp-modal').modal('show')
                invitados.loadGuestInfo();
            })
    }
}