const axios = require('axios');
require('dotenv').config()

const apiKey = process.env.DICTIONARY_KEY

const dictionaryCommand = async (client, message, args) => {

    const phrase = args.slice(1).join(' ');

    if (phrase) {
        try {

            const data = await fetchDefinition(phrase)

            if (data[0].meta.offensive) {
                message.reply("You cannot search for offensive words!")
                return
            }

            if (data && Array.isArray(data)) {
                const shortDefinitions = data[0].shortdef.map((item, index) => `${index + 1}: ${item}\n \n`)

                const shortDefString = shortDefinitions.join('');

                client.sendMessage(message.from, shortDefString)
            }

        } catch (err) {
            console.log(err);
        }
    } else {
        // Handle case when no phrase is provided
        console.log('No phrase provided by the user.');
    }
};

const fetchDefinition = async (phrase) => {
    try {
        const endpoint = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${phrase}?key=${apiKey}`
        const response = await axios.get(endpoint);

        if (response.status === 200) {
            const data = response.data;
            return data
        } else {
            console.error('Failed to fetch data:', response.statusText);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
};

module.exports = dictionaryCommand;
