var handler = async (m, { conn, args }) => {

let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)

conn.reply(m.chat, `🧡━━━━━━━━🧡
   🔗 𝐄𝐍𝐋𝐀𝐂𝐄 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎 🔗
🧡━━━━━━━━🧡

╭─「 🐾 𝐈𝐍𝐅𝐎 𝐆𝐀𝐑𝐅𝐈𝐄𝐋𝐃 」─╮
│
│ 🔗 𝗘𝗻𝗹𝗮𝗰𝗲 : ${link}
│ 🍜 𝗘𝘀𝘁𝗮𝗱𝗼 : 𝗔𝗰𝘁𝗶𝘃𝗼
│ 😼 𝗧𝗲𝗿𝗶𝘁𝗼𝗿𝗶𝗼 : 𝗦𝗲𝗴𝘂𝗿𝗼
│
╚━━━━━━━━━━╝

🐱 "𝗖𝗼𝗺𝗽𝗮𝗿𝘁𝗲 𝗰𝗼𝗻 𝗰𝘂𝗶𝗱𝗮𝗱𝗼 𝗼 𝘁𝗲 𝗾𝘂𝗶𝘁𝗼 𝗹𝗮 𝗹𝗮𝘀𝗮𝗴𝗻𝗮" 🧡
`, m, { detectLink: true })

}
handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link', 'enlace', 'grupolink']
handler.group = true
handler.botAdmin = true

export default handler