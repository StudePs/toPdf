const axios = require("axios");

const altuHistory = async (instance, idContact, idAssistant) => {
    const data = {
        filters: {
            id: `${idContact}`,
            assistantId: `${idAssistant}`
        },
        attributes: {},
        flags: {
            history: true,
            events: false
        }
    };
    const config = {
        method: 'post',
        url: `https://api.altubots.com/contacts/${instance.name}`,
        headers: {
            'x-api-key': `${instance.key}`,
            'Content-type': 'application/json'
        },
        data: data
    }
    try {
        const response = await axios(config);
        return response.data.contacts[0].history
    } catch (error) {
        console.log(error.message)        
    }
}

module.exports = { altuHistory };

/*

{   
    instance: {
        key: "3222ad7edc1fb03c8e7cebe4d36c4089",
        name: "bradescosaude"
    },
    idContact: 1666,
    idAssistant: 2
}

*/