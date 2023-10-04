const axios = require('axios');
require('dotenv').config()

const apiKey = process.env.DICTIONARY_KEY

const dictionaryCommand = async (client, message, args) => {
    const content = message.body;

    if (content.startsWith('!dictionary')) {
        const phrase = args.slice(1).join(' ');

        if (phrase) {
            try {
                
                const data = await fetchDefinition(phrase)
                console.log("🚀 ~ file: dictionary.js:16 ~ dictionaryCommand ~ data:", data)
                if (data && Array.isArray(data)) {
                    const shortDefinitions = data[0].shortdef.map((item, index) => `${index + 1}: ${item}\n \n`)
                    console.log("🚀 ~ file: dictionary.js:19 ~ dictionaryCommand ~ shortDefinitions:", shortDefinitions)

                    const shortDefString = shortDefinitions.join('');
                    console.log("🚀 ~ file: dictionary.js:22 ~ dictionaryCommand ~ shortDefString:", shortDefString)

                    client.sendMessage(message.from, shortDefString)
                }

            } catch (err) {
                console.log(err);
            }
        } else {
            // Handle case when no phrase is provided
            console.log('No phrase provided by the user.');
        }
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
