
const urlGoogleScript = `https://script.google.com/macros/s/AKfycbwaJ2dpsNsXodznzOiyMvliLL3XEEfMmmiLXo0-20dqjBfRfpXL1LrTjGt2ThoXP21bwA/exec?`

const invitados = {

    lista: [],
    getById: (id) => {
        fetch(urlGoogleScript + 'action=getData')
            .then((res) => {
                if (!res.ok)
                    throw new Error('Error leyendo datos');
                return res.json();
            }).then((res) => {
                console.log(res);
            })
    },
    confirm: (id) => {
        fetch(urlGoogleScript + 'action=confirmAssistance&id_invitado=' + id)
            .then((res) => {
                if (!res.ok)
                    throw new Error('Error leyendo datos');
                return res.json();
            }).then((res) => {
                console.log(res);
            })
    }
}