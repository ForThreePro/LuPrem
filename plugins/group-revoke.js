let handler = async (m, { conn }) => {
  try {
    const grupoID = m.chat

    await conn.groupRevokeInvite(grupoID)

    const nuevoEnlace = await conn.groupInviteCode(grupoID)
    const enlaceCompleto = 'https://chat.whatsapp.com/' + nuevoEnlace

    await conn.reply(m.sender, 
`🧡━━━━━━━━🧡
   😼 𝐏𝐑𝐎𝐓𝐎𝐂𝐎𝐋𝐎 𝐆𝐀𝐑𝐅𝐈𝐄𝐋𝐃 😼
🧡━━━━━━━━🧡

╭─「 🛡️ 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 𝐃𝐄 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 🔻 𝗘𝗻𝗹𝗮𝗰𝗲 𝗔𝗻𝘁𝗲𝗿𝗶𝗼𝗿 : 𝗥𝗲𝘃𝗼𝗰𝗮𝗱𝗼
│ 🔗 𝗡𝘂𝗲𝘃𝗼 𝗘𝗻𝗹𝗮𝗰𝗲 : ${enlaceCompleto}
│ 🍜 𝗘𝘀𝘁𝗮𝗱𝗼 : 𝗧𝗲𝗿𝗶𝘁𝗼𝗿𝗶𝗼 𝗦𝗲𝗴𝘂𝗿𝗼
│
╚━━━━━━━━━━╝

🐱 "𝗘𝗹 𝗮𝗰𝗲𝘀𝗼 𝗮𝗻𝘁𝗲𝗿𝗶𝗼𝗿 𝗵𝗮 𝘀𝗶𝗱𝗼 𝗮𝗻𝘂𝗹𝗮𝗱𝗼" 🧡
`, 
      m, { detectLink: true })

    await conn.reply(m.chat, `🧡━━━━━━━━🧡
   🔒 𝐄𝐍𝐋𝐀𝐂𝐄 𝐑𝐄𝐒𝐓𝐀𝐁𝐋𝐄𝐂𝐈𝐃𝐎 🔒
🧡━━━━━━━━🧡

╭─「 ⚠️ 𝐀𝐃𝐕𝐄𝐑𝐓𝐄𝐍𝐂𝐈𝐀 」─╮
│
│ 🐾 𝗘𝗹 𝗲𝗻𝗹𝗮𝗰𝗲 𝗮𝗻𝘁𝗲𝗿𝗶𝗼𝗿 𝘆𝗮 𝗻𝗼 𝗳𝘂𝗻𝗰𝗶𝗼𝗻𝗮
│ 🍜 𝗦𝗼𝗹𝗼 𝗲𝗹 𝗻𝘂𝗲𝘃𝗼 𝗲𝗻𝗹𝗮𝗰𝗲 𝗲𝘀 𝘃𝗮𝗹𝗶𝗱𝗼
│
╚━━━━━━━━━━╝

😼 "𝗗𝗲𝗷𝗲𝗻 𝗱𝗲 𝗿𝗼𝗯𝗮𝗿 𝗹𝗮𝘀𝗮𝗴𝗻𝗮" 🧡
`, m)

  } catch (error) {
    console.error(error)
    await m.reply(`🧡━━━━━━━━🧡
   ❌ 𝐄𝐑𝐎𝐑 𝐂𝐑𝐈𝐓𝐈𝐂𝐎 ❌
🧡━━━━━━━━🧡

╭─「 😼 𝐃𝐄𝐓𝐀𝐋𝐄 」─╮
│
│ 🐾 ${error.message}
│
╚━━━━━━━━━━╝

╭─「 🍜 𝐒𝐎𝐋𝐔𝐂𝐈𝐎𝐍 」─╮
│
│ 😼 𝗩𝗲𝗿𝗶𝗳𝗶𝗰𝗮 𝗾𝘂𝗲 𝗲𝗹 𝗯𝗼𝘁 𝘀𝗲𝗮 𝗮𝗱𝗺𝗶𝗻
│
╚━━━━━━━━━━╝

😼 "𝗛𝗮𝘀𝘁𝗮 𝗮 𝗺𝗶 𝗺𝗲 𝗱𝗮 𝗳𝗹𝗼𝗷𝗲𝗿𝗮 𝗮𝗿𝗲𝗴𝗹𝗮𝗿𝗹𝗼" 🧡
`)
  }
}

handler.help = ['revoke']
handler.tags = ['grupo']
handler.command = ['revoke', 'restablecer', 'nuevolink']
handler.group = true
handler.admin = true
handler.botAdmin = true

export default handler