exports.handler = async (event, context) => {
    const namen = ["Sten", "Jessy", "Gijs", "Viggo", "Dean", "Serena"];
    const lootjes = [];
    const getrokken = {};

    // Verdeel de lootjes
    namen.forEach(naam => {
        let beschikbareLootjes = namen.filter(item => item !== naam);
        getrokken[naam] = [];

        for (let i = 0; i < 3; i++) {
            const index = Math.floor(Math.random() * beschikbareLootjes.length);
            const getrokkenNaam = beschikbareLootjes.splice(index, 1)[0];
            getrokken[naam].push(getrokkenNaam);
        }
    });

    // Vul de lootjes array
    Object.keys(getrokken).forEach(naam => {
        getrokken[naam].forEach(getrokkenNaam => {
            lootjes.push({ trekker: naam, getrokken: getrokkenNaam });
        });
    });

    return {
        statusCode: 200,
        body: JSON.stringify(lootjes)
    };
};
