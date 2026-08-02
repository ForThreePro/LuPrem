let handler = async (m, { conn }) => {
    let vcard = `BEGIN:VCARD
VERSION:3.0
N:;Lu;;;
FN:Lu
ORG:𝐋𝐔 𝐏𝐑𝐄𝐌 𝐁𝐎𝐓
TEL;type=CELL;type=VOICE;waid=51920726588:+51 920 726 588
END:VCARD`

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: 'Lu - LU PREM BOT',
            contacts: [{ vcard }]
        }
    }, { quoted: m })

    await conn.reply(m.chat, `🌙 *𝐁𝐎𝐓 𝐋𝐔 𝐏𝐑𝐄𝐌*

╭─「 👑 𝐂𝐑𝐄𝐀𝐃𝐎𝐑𝐀 」─╮
│
│ *𝐍𝐎𝐌𝐁𝐑𝐄:* 𝐋𝐮
│ *𝐍𝐔𝐌𝐄𝐑𝐎:* +51 920 726 588
│ *𝐁𝐎𝐓:* 𝐋𝐔 𝐏𝐑𝐄𝐌 𝐁𝐎𝐓
│
╰─────────────────╯

> 𝐃𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐥𝐞 24/7 𝐩𝐚𝐫𝐚 𝐚𝐲𝐮𝐝𝐚𝐫𝐭𝐞 🌙✨`, m)
}

handler.help = ['owner']
handler.tags = ['info']
handler.command = ['owner']
export default handler