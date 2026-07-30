import { getBotConfig } from '../lib/botconfig.js'

const handler = async (m, { conn, command }) => {
  try {
    const jid = (id) => id?.includes('@')? id : `${id}@s.whatsapp.net`
    let who =
      m.mentionedJid?.[0] ||
      m.msg?.contextInfo?.mentionedJid?.[0] ||
      m.quoted?.sender ||
      null

    if (!who) {
      return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ❌ 𝐄𝐑𝐎𝐑 𝐃𝐄 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 ❌
🧡━━━━━━━━🧡

╭─「 😼 𝐈𝐍𝐒𝐓𝐑𝐔𝐂𝐈𝐎𝐍 」─╮
│
│ 🐾 𝗠𝗲𝗻𝗰𝗶𝗼𝗻𝗮 𝗼 𝗰𝗶𝘁𝗮 𝗮𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼
│ 🍜 𝗘𝗷𝗲𝗺𝗽𝗹𝗼 :.promote @usuario
│
╚━━━━━━━━━━╝
`, m)
    }

    who = jid(who)

    const groupMetadata = await conn.groupMetadata(m.chat)
    const participant = groupMetadata.participants.find(
      p => jid(p.id || p.jid) === who
    )

    const isPromote = command === 'promote'
    const protectedOwners = global.owner.map(
      o => o[0] + '@s.whatsapp.net'
    )
    const targetName = await conn.getName(who)

    if (isPromote) {
      if (participant?.admin) {
        return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⚠️ 𝐀𝐕𝐈𝐒𝐎 𝐃𝐄𝐋 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 ⚠️
🧡━━━━━━━━🧡

╭─「 🐾 𝐄𝐒𝐓𝐀𝐃𝐎 」─╮
│
│ 😼 @${who.split('@')[0]} 𝘆𝗮 𝗲𝘀 𝗮𝗱𝗺𝗶𝗻
│ 🍜 𝗡𝗼 𝗽𝘂𝗲𝗱𝗼 𝗱𝗮𝗿𝗹𝗲 2 𝗰𝗼𝗿𝗼𝗻𝗮𝘀
│
╚━━━━━━━━━━╝
`, m, { mentions: [who] })
      }

      await conn.groupParticipantsUpdate(m.chat, [who], 'promote')

      return conn.reply(m.chat, `🧡━━━━━━━━🧡
   👑 𝐀𝐒𝐂𝐄𝐍𝐒𝐎 𝐄𝐉𝐄𝐂𝐔𝐓𝐀𝐃𝐎 👑
🧡━━━━━━━━🧡

╭─「 🐾 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│
│ 😼 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 : @${who.split('@')[0]}
│ 🍜 𝗡𝘂𝗲𝘃𝗼 𝗥𝗮𝗻𝗴𝗼 : 𝗔𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝗱𝗼𝗿
│ 🐾 𝗣𝗼𝗿 : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

🐱 "𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗼 𝗮𝗹 𝗰𝗹𝘂𝗯 𝗱𝗲 𝗹𝗮 𝗹𝗮𝘀𝗮𝗴𝗻𝗮" 🧡
`, m, { mentions: [who, m.sender] })
    }

    // DEMOTE
    if (protectedOwners.includes(who)) {
      return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⛔ 𝐀𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎 ⛔
🧡━━━━━━━━🧡

╭─「 🛡️ 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 😼 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗱𝗲𝗴𝗿𝗮𝗱𝗮𝗿 𝗮𝗹 𝗼𝘄𝗻𝗲𝗿
│ 🍜 𝗡𝗶 𝗮 𝗚𝗮𝗿𝗳𝗶𝗲𝗹𝗱 𝗹𝗼 𝗯𝗮𝗷𝗮𝘀
│
╚━━━━━━━━━━╝
`, m)
    }

    if (!participant?.admin) {
      return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⚠️ 𝐀𝐕𝐈𝐒𝐎 𝐃𝐄𝐋 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 ⚠️
🧡━━━━━━━━🧡

╭─「 🐾 𝐄𝐒𝐓𝐀𝐃𝐎 」─╮
│
│ 😼 @${who.split('@')[0]} 𝗻𝗼 𝗲𝘀 𝗮𝗱𝗺𝗶𝗻
│
╚━━━━━━━━━━╝
`, m, { mentions: [who] })
    }

    if (who === groupMetadata.owner) {
      return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⛔ 𝐀𝐂𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎 ⛔
🧡━━━━━━━━🧡

╭─「 🍜 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 😼 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗱𝗲𝗴𝗿𝗮𝗱𝗮𝗿 𝗮𝗹 𝗰𝗿𝗲𝗮𝗱𝗼𝗿
│ 🐾 𝗥𝗲𝘀𝗽𝗲𝘁𝗮 𝗮𝗹 𝗱𝘂𝗲𝗻𝗼 𝗱𝗲𝗹 𝘀𝗼𝗳𝗮
│
╚━━━━━━━━━━╝
`, m)
    }

    if (who === conn.user.jid) {
      return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⛔ 𝐀𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎 ⛔
🧡━━━━━━━━🧡

╭─「 😼 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 🐾 𝗡𝗼 𝗽𝘂𝗲𝗱𝗼 𝗱𝗲𝗴𝗿𝗮𝗱𝗮𝗿𝗺𝗲 𝗮 𝗺𝗶 𝗺𝗶𝘀𝗺𝗼
│
╚━━━━━━━━━━╝
`, m)
    }

    await conn.groupParticipantsUpdate(m.chat, [who], 'demote')

    return conn.reply(m.chat, `🧡━━━━━━━━🧡
   🔻 𝐃𝐄𝐆𝐑𝐀𝐃𝐀𝐂𝐈𝐎𝐍 𝐄𝐉𝐄𝐂𝐔𝐓𝐀𝐃𝐀 🔻
🧡━━━━━━━━🧡

╭─「 🍜 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│
│ 😼 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 : @${who.split('@')[0]}
│ 🐾 𝗡𝘂𝗲𝘃𝗼 𝗥𝗮𝗻𝗴𝗼 : 𝗠𝗶𝗲𝗺𝗯𝗿𝗼
│ 🍜 𝗣𝗼𝗿 : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

😼 "𝗬𝗮 𝗻𝗼 𝗲𝗿𝗲𝘀 𝗱𝗲𝗹 𝗰𝗹𝘂𝗯 𝗱𝗲 𝗹𝗮 𝗹𝗮𝘀𝗮𝗴𝗻𝗮" 🧡
`, m, { mentions: [who, m.sender] })

  } catch (e) {
    conn.reply(m.chat, `🧡━━━━━━━━🧡
   ❌ 𝐄𝐑𝐎𝐑 𝐂𝐑𝐈𝐓𝐈𝐂𝐎 ❌
🧡━━━━━━━━🧡

╭─「 🐾 𝐃𝐄𝐓𝐀𝐋𝐄 」─╮
│
│ 😼 ${e.message}
│
╚━━━━━━━━━━╝

😼 "𝗛𝗮𝘀𝘁𝗮 𝗮 𝗺𝗶 𝗺𝗲 𝗱𝗮 𝗳𝗹𝗼𝗷𝗲𝗿𝗮" 🧡
`, m)
  }
}

handler.help = ['promote', 'demote']
handler.tags = ['group']
handler.command = ['promote', 'daradmin', 'demote', 'quitaradmin']
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler