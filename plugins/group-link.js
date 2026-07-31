var handler = async (m, { conn, args }) => {

let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)

conn.reply(m.chat, `🧡━━━━━━━━🧡
   🔗 **ENLACE DEL GRUPO** 🔗
🧡━━━━━━━━🧡

╭─「 🐾 **INFO GARFIELD** 」─╮
│
│ 🔗 **Enlace** : ${link}
│ 🍜 **Estado** : **Activo**
│ 😼 **Territorio** : **Seguro**
│
╚━━━━━━━━━━╝

🐱 "**Comparte con cuidado o te quito la Lasaña**" 🧡
`, m, { detectLink: true })

}
handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link', 'enlace', 'grupolink']
handler.group = true
handler.botAdmin = true

export default handler