var handler = async (m, { conn, participants }) => {
  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = globalThis.owner[0][0] + '@s.whatsapp.net';

  let targets = participants
   .map(p => p.id)
   .filter(id => id!== conn.user.jid)
   .filter(id => id!== ownerGroup)
   .filter(id => id!== ownerBot)
   .filter(id => {
      const isAdmin = participants.find(p => p.id === id)?.admin
      return!isAdmin // No expulsa admins
    });

  if (!targets.length) {
    return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⚠️ 𝐀𝐕𝐈𝐒𝐎 𝐃𝐄𝐋 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 ⚠️
🧡━━━━━━━━🧡

╭─「 🐾 𝐄𝐒𝐓𝐀𝐃𝐎 」─╮
│
│ 😼 𝗡𝗼 𝗵𝗮𝘆 𝘂𝘀𝘂𝗮𝗿𝗶𝗼𝘀 𝘃𝗮𝗹𝗶𝗱𝗼𝘀
│ 🍜 𝗽𝗮𝗿𝗮 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿
│
╚━━━━━━━━━━╝

🐱 "𝗦𝗼𝗹𝗼 𝗾𝘂𝗲𝗱𝗮 𝗚𝗮𝗿𝗳𝗶𝗲𝗹𝗱 𝘆 𝘀𝘂 𝗹𝗮𝘀𝗮𝗴𝗻𝗮" 🧡
`, m);
  }

  // Mensaje de advertencia antes de ejecutar
  await conn.reply(m.chat, `🧡━━━━━━━━🧡
   🔴 𝐏𝐑𝐎𝐓𝐎𝐂𝐎𝐋𝐎 𝐆𝐀𝐑𝐅𝐈𝐄𝐋𝐃 🔴
🧡━━━━━━━━🧡

╭─「 🐾 𝐋𝐈𝐌𝐏𝐈𝐄𝐙𝐀 」─╮
│
│ 😼 𝗢𝗯𝗷𝗲𝘁𝗶𝘃𝗼𝘀 : ${targets.length}
│ 🍜 𝗘𝘀𝘁𝗮𝗱𝗼 : 𝗘𝗹𝗶𝗺𝗶𝗻𝗮𝗻𝗱𝗼...
│ 🐾 𝗔𝘂𝘁𝗼𝗿 : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

😼 "𝗜𝗻𝗶𝗰𝗶𝗮𝗻𝗱𝗼 𝗹𝗶𝗺𝗽𝗶𝗲𝘇𝗮 𝗱𝗲𝗹 𝘀𝗼𝗳𝗮" 🧡
`, m, { mentions: [m.sender] });

  await conn.groupParticipantsUpdate(m.chat, targets, 'remove');

  await conn.reply(m.chat, `🧡━━━━━━━━🧡
   ✅ 𝐏𝐑𝐎𝐓𝐎𝐂𝐎𝐋𝐎 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀𝐃𝐎 ✅
🧡━━━━━━━━🧡

╭─「 🍜 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│
│ 😼 𝗘𝘅𝗽𝘂𝗹𝘀𝗮𝗱𝗼𝘀 : ${targets.length}
│ 🐾 𝗘𝘀𝘁𝗮𝗱𝗼 : 𝗚𝗿𝘂𝗽𝗼 𝗹𝗶𝗺𝗽𝗶𝗼
│ 🍜 𝗣𝗼𝗿 : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

🐱 "𝗘𝗹 𝘁𝗲𝗿𝗶𝘁𝗼𝗿𝗶𝗼 𝗵𝗮 𝘀𝗶𝗱𝗼 𝗽𝘂𝗿𝗴𝗮𝗱𝗼" 🧡
`, m, { mentions: [m.sender] });
};

handler.help = ['kickall'];
handler.tags = ['group'];
handler.command = ['kickall', 'limpiar', 'sacarall'];
handler.admin = true;
handler.botAdmin = true;
handler.group = true

export default handler;