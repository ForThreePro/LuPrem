let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ❌ 𝐄𝐑𝐎𝐑 𝐃𝐄 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 ❌
🧡━━━━━━━━🧡

╭─「 😼 𝐈𝐍𝐒𝐓𝐑𝐔𝐂𝐈𝐎𝐍 」─╮
│
│ 🐾 𝗖𝗶𝘁𝗮 𝗲𝗹 𝗺𝗲𝗻𝘀𝗮𝗷𝗲 𝗾𝘂𝗲 𝗱𝗲𝘀𝗲𝗮𝘀
│ 🍜 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿
│
╚━━━━━━━━━━╝

😼 "𝗨𝘀𝗮 :.del 𝗰𝗶𝘁𝗮𝗻𝗱𝗼 𝗲𝗹 𝗺𝗲𝗻𝘀𝗮𝗷𝗲" 🧡
`, m)

try {
    // Caso 1: Mensaje de otro usuario
    let key = m.quoted.vM.key
    await conn.sendMessage(m.chat, { delete: key })
    await conn.sendMessage(m.chat, { react: { text: '🗑️', key: m.key } })

} catch (e) {
    // Caso 2: Fallback si falla
    try {
        let delet = m.quoted.vM.key
        await conn.sendMessage(m.chat, { delete: delet })
        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
    } catch {
        return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ❌ 𝐅𝐀𝐋𝐎 𝐄𝐍 𝐋𝐀 𝐄𝐋𝐈𝐌𝐈𝐍𝐀𝐂𝐈𝐎𝐍 ❌
🧡━━━━━━━━🧡

╭─「 🐾 𝐄𝐒𝐓𝐀𝐃𝐎 」─╮
│
│ 😼 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗱𝗼 𝗲𝗹𝗶𝗺𝗶𝗻𝗮𝗿 𝗲𝗹 𝗺𝗲𝗻𝘀𝗮𝗷𝗲
│ 🍜 𝗔𝗹𝗴𝘂𝗻𝗼𝘀 𝗺𝗲𝗻𝘀𝗮𝗷𝗲𝘀 𝗻𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲𝗻 𝗯𝗼𝗿𝗿𝗮𝗿
│
╚━━━━━━━━━━╝
`, m)
    }
}}

handler.help = ['delete']
handler.tags = ['group']
handler.command = ['del','delete','d','borrar']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler