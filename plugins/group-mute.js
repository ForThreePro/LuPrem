let handler = async (m, { conn, text, isAdmin, isOwner, command }) => {
    if (!m.isGroup) return m.reply(`🧡━━━━━━━━🧡
   ❌ **ERROR DE SISTEMA** ❌
🧡━━━━━━━━🧡

╭─「 🐾 **ACCESO** 」─╮
│
│ 😼 **Este comando solo en grupos**
│
╚━━━━━━━━━━╝
`)

    if (!isAdmin &&!isOwner) return m.reply(`🧡━━━━━━━━🧡
   ⛔ **ACCESO DENEGADO** ⛔
🧡━━━━━━━━🧡

╭─「 🍜 **PERMISOS** 」─╮
│
│ 🐾 **Solo administradores**
│
╚━━━━━━━━━━╝
`)

    let mentioned = await m.mentionedJid
    let who = mentioned.length > 0
     ? mentioned[0]
        : m.quoted
     ? m.quoted.sender
        : text
     ? text.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
        : false

    if (!who) {
        return m.reply(`🧡━━━━━━━━🧡
   ❌ **ERROR DE SISTEMA** ❌
🧡━━━━━━━━🧡

╭─「 😼 **INSTRUCCION** 」─╮
│
│ 🐾 **Etiqueta o cita al usuario**
│ 🍜 **Ejemplo** :.mute @usuario
│
╚━━━━━━━━━━╝
`)
    }

    const groupInfo = await conn.groupMetadata(m.chat)
    const ownerGroup = groupInfo.owner || m.chat.split('-')[0] + '@s.whatsapp.net'
    const ownerBot = global.owner[0][0] + '@s.whatsapp.net'
    const protectedOwners = global.owner.map(o => o[0] + '@s.whatsapp.net')
    const targetName = global.db.data.users[who]?.name || await conn.getName(who)

    if (who === conn.user.jid || who === ownerGroup || who === ownerBot || protectedOwners.includes(who)) {
        return m.reply(`🧡━━━━━━━━🧡
   ⛔ **ACCESO DENEGADO** ⛔
🧡━━━━━━━━🧡

╭─「 🛡️ **SEGURIDAD** 」─╮
│
│ 😼 **No se puede silenciar al Owner**
│ 🐾 **Ni a Garfield lo calas**
│
╚━━━━━━━━━━╝
`)
    }

    let chat = global.db.data.chats[m.chat]
    if (!chat.mutedUsers) chat.mutedUsers = []

    if (/^(mute|silenciar)$/i.test(command)) {
        if (chat.mutedUsers.includes(who)) {
            return m.reply(`🧡━━━━━━━━🧡
   ⚠️ **AVISO DEL SISTEMA** ⚠️
🧡━━━━━━━━🧡

╭─「 🍜 **ESTADO** 」─╮
│
│ 😼 ${targetName} **ya esta silenciado**
│
╚━━━━━━━━━━╝
`)
        }

        chat.mutedUsers.push(who)

        await conn.reply(
            m.chat,
            `🧡━━━━━━━━🧡
   🔇 **USUARIO SILENCIADO** 🔇
🧡━━━━━━━━🧡

╭─「 🐾 **REPORTE** 」─╮
│
│ 😼 **Usuario** : ${targetName}
│ 🍜 **Estado** : **Silenciado**
│ 🐾 **Por** : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

😼 "**Ni una miau mas aqui. Respeta mi Lasaña**" 🧡`,
            m,
            { mentions: [who, m.sender] }
        )
    } else {
        if (!chat.mutedUsers.includes(who)) {
            return m.reply(`🧡━━━━━━━━🧡
   ⚠️ **AVISO DEL SISTEMA** ⚠️
🧡━━━━━━━━🧡

╭─「 🍜 **ESTADO** 」─╮
│
│ 😼 ${targetName} **no esta silenciado**
│
╚━━━━━━━━━━╝
`)
        }

        chat.mutedUsers = chat.mutedUsers.filter(u => u!== who)

        await conn.reply(
            m.chat,
            `🧡━━━━━━━━🧡
   🔊 **USUARIO DESILENCIADO** 🔊
🧡━━━━━━━━🧡

╭─「 🐾 **REPORTE** 」─╮
│
│ 😼 **Usuario** : ${targetName}
│ 🍜 **Estado** : **Liberado**
│ 🐾 **Por** : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

🐱 "**Puedes hablar de nuevo. Pero toca mi Lasaña y vuelves al mute**" 🧡`,
            m,
            { mentions: [who, m.sender] }
        )
    }
}

handler.before = async function (m, { conn, chat, isBotAdmin }) {
    if (!m.isGroup || m.fromMe) return false
    if (!isBotAdmin) return false
    if (!chat.mutedUsers ||!Array.isArray(chat.mutedUsers)) return false

    if (chat.mutedUsers.includes(m.sender)) {
        try {
            await conn.sendMessage(m.chat, { delete: m.key })
            await conn.sendMessage(m.chat, { react: { text: '🔇', key: m.key } })
        } catch (e) {
            console.error(e)
        }
        return true
    }

    return false
}

handler.help = ['mute @user', 'unmute @user']
handler.tags = ['grupo']
handler.command = /^(mute|silenciar|unmute|desilenciar)$/i
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler