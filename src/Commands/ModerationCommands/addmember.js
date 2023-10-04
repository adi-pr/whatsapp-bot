const addMemberCommand = async (client, message, args) => {
    const group = await message.getChat();

    if (!group.isGroup) {
        return message.reply("You can only add members to a group chat!");
    }

    
    const contactIDs = args.slice(1).map(item => item + "@c.us");
    const participants = group.participants;
    
    if (contactIDs.length === 0) {
        return message.reply("You must provide atleast one number to add to the chat!");
    }
    
    const membersToAdd = [];

    for (const contactId of contactIDs) {
        const isAlreadyInGroup = participants.some(participant => participant.id._serialized === contactId);

        if (isAlreadyInGroup) {
            client.sendMessage(message.from, `${contactId.slice(0, -5)} is already in the group chat.`);
        } else {
            membersToAdd.push(contactId);
        }
    }

    if (membersToAdd.length === 0) {
        return client.sendMessage(message.from, "No Members to Add!");
    }

    await group.addParticipants(membersToAdd);

    client.sendMessage(message.from, "Added Members ✅");
};

module.exports = addMemberCommand;
