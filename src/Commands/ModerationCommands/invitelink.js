const inviteLinkCommand = async (client, message) => {
    const group = await message.getChat();

    if (!group.isGroup) {
        return message.reply("You can only generate invite links for a group chat!");
    }

    const inviteCode = await group.getInviteCode()
    const inviteUrl = 'https://chat.whatsapp.com/' + inviteCode


    message.reply(`Invite Link: ${inviteUrl}`)
}

module.exports = inviteLinkCommand;