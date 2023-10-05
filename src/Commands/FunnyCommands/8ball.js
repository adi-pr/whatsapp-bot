const _8BallCommand = (client, message, args) => {

    if (args.slice(1).length === 0) {
        return client.sendMessage(message.from, "You didn't ask a question")
    }

    // Define an array of 8ball responses
    const responses = [
        "It is certain.",
        "It is decidedly so.",
        "Without a doubt.",
        "Yes, definitely.",
        "You may rely on it.",
        "As I see it, yes.",
        "Most likely.",
        "Outlook good.",
        "Yes.",
        "Signs point to yes.",
        "Reply hazy, try again.",
        "Ask again later.",
        "Better not tell you now.",
        "Cannot predict now.",
        "Concentrate and ask again.",
        "Don't count on it.",
        "My reply is no.",
        "My sources say no.",
        "Outlook not so good.",
        "Very doubtful."
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    client.sendMessage(message.from, randomResponse);
}

module.exports = _8BallCommand;
