let handler = async (m, { conn, text, isAdmin, isOwner, command }) => {
    if (!m.isGroup) return m.reply(`🧡━━━━━━━━🧡
   ❌ 𝐄𝐑𝐎𝐑 𝐃𝐄 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 ❌
🧡━━━━━━━━🧡

╭─「 🐾 𝐀𝐂𝐄𝐒𝐎 」─╮
│
│ 😼 𝗘𝘀𝘁𝗲 𝗰𝗼𝗺𝗮𝗻𝗱𝗼 𝘀𝗼𝗹𝗼 𝗲𝗻 𝗴𝗿𝘂𝗽𝗼𝘀
│
╚━━━━━━━━━━╝
`)

    if (!isAdmin &&!isOwner) return m.reply(`🧡━━━━━━━━🧡
   ⛔ 𝐀𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎 ⛔
🧡━━━━━━━━🧡

╭─「 🍜 𝐏𝐄𝐑𝐌𝐈𝐒𝐎𝐒 」─╮
│
│ 🐾 𝗦𝗼𝗹𝗼 𝗮𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝗱𝗼𝗿𝗲𝘀
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
   ❌ 𝐄𝐑𝐎𝐑 𝐃𝐄 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 ❌
🧡━━━━━━━━🧡

╭─「 😼 𝐈𝐍𝐒𝐓𝐑𝐔𝐂𝐈𝐎𝐍 」─╮
│
│ 🐾 𝗘𝘁𝗶𝗾𝘂𝗲𝘁𝗮 𝗼 𝗰𝗶𝘁𝗮 𝗮𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼
│ 🍜 𝗘𝗷𝗲𝗺𝗽𝗹𝗼 :.mute @usuario
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
   ⛔ 𝐀𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎 ⛔
🧡━━━━━━━━🧡

╭─「 🛡️ 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 😼 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝘀𝗶𝗹𝗲𝗻𝗰𝗶𝗮𝗿 𝗮𝗹 𝗼𝘄𝗻𝗲𝗿
│ 🐾 𝗡𝗶 𝗮 𝗚𝗮𝗿𝗳𝗶𝗲𝗹𝗱 𝗹𝗼 𝗰𝗮𝗹𝗮𝘀
│
╚━━━━━━━━━━╝
`)
    }

    let chat = global.db.data.chats[m.chat]
    if (!chat.mutedUsers) chat.mutedUsers = []

    if (/^(mute|silenciar)$/i.test(command)) {
        if (chat.mutedUsers.includes(who)) {
            return m.reply(`🧡━━━━━━━━🧡
   ⚠️ 𝐀𝐕𝐈𝐒𝐎 𝐃𝐄𝐋 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 ⚠️
🧡━━━━━━━━🧡

╭─「 🍜 𝐄𝐒𝐓𝐀𝐃𝐎 」─╮
│
│ 😼 ${targetName} 𝘆𝗮 𝗲𝘀𝘁𝗮 𝘀𝗶𝗹𝗲𝗻𝗰𝗶𝗮𝗱𝗼
│
╚━━━━━━━━━━╝
`)
        }

        chat.mutedUsers.push(who)

        await conn.reply(
            m.chat,
            `🧡━━━━━━━━🧡
   🔇 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐒𝐈𝐋𝐄𝐍𝐂𝐈𝐀𝐃𝐎 🔇
🧡━━━━━━━━🧡

╭─「 🐾 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│
│ 😼 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 : ${targetName}
│ 🍜 𝗘𝘀𝘁𝗮𝗱𝗼 : 𝗦𝗶𝗹𝗲𝗻𝗰𝗶𝗮𝗱𝗼
│ 🐾 𝗣𝗼𝗿 : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

😼 "𝗡𝗶 𝘂𝗻𝗮 𝗺𝗶𝗮𝘂 𝗺𝗮𝘀 𝗮𝗾𝘂𝗶" 🧡`,
            m,
            { mentions: [who, m.sender] }
        )
    } else {
        if (!chat.mutedUsers.includes(who)) {
            return m.reply(`🧡━━━━━━━━🧡
   ⚠️ 𝐀𝐕𝐈𝐒𝐎 𝐃𝐄𝐋 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 ⚠️
🧡━━━━━━━━🧡

╭─「 🍜 𝐄𝐒𝐓𝐀𝐃𝐎 」─╮
│
│ 😼 ${targetName} 𝗻𝗼 𝗲𝘀𝘁𝗮 𝘀𝗶𝗹𝗲𝗻𝗰𝗶𝗮𝗱𝗼
│
╚━━━━━━━━━━╝
`)
        }

        chat.mutedUsers = chat.mutedUsers.filter(u => u!== who)

        await conn.reply(
            m.chat,
            `🧡━━━━━━━━🧡
   🔊 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐃𝐄𝐒𝐈𝐋𝐄𝐍𝐂𝐈𝐀𝐃𝐎 🔊
🧡━━━━━━━━🧡

╭─「 🐾 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│
│ 😼 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 : ${targetName}
│ 🍜 𝗘𝘀𝘁𝗮𝗱𝗼 : 𝗟𝗶𝗯𝗲𝗿𝗮𝗱𝗼
│ 🐾 𝗣𝗼𝗿 : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

🐱 "𝗣𝘂𝗲𝗱𝗲𝘀 𝗵𝗮𝗯𝗹𝗮𝗿 𝗱𝗲 𝗻𝘂𝗲𝘃𝗼" 🧡`,
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