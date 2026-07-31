let handler = async (m, { conn, usedPrefix, command }) => {

if (!m.quoted) return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ❌ **ERROR DE SISTEMA** ❌
🧡━━━━━━━━🧡

╭─「 😼 **INSTRUCCION** 」─╮
│
│ 🐾 **Cita el mensaje que deseas**
│ 🍜 **eliminar**
│
╚━━━━━━━━━━╝

😼 "**Usa .del citando el mensaje**" 🧡
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
   ❌ **FALLO EN LA ELIMINACION** ❌
🧡━━━━━━━━🧡

╭─「 🐾 **ESTADO** 」─╮
│
│ 😼 **No se pudo eliminar el mensaje**
│ 🍜 **Algunos mensajes no se pueden borrar**
│ 🐱 **Ni tocando mi Lasaña se arregla**
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