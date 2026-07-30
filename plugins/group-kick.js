var handler = async (m, { conn, participants, usedPrefix, command }) => {
  let texto = await m.mentionedJid;
  let user = texto.length > 0? texto[0] : (m.quoted? await m.quoted.sender : false);

  if (!user) {
    return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ❌ 𝐄𝐑𝐎𝐑 𝐃𝐄 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 ❌
🧡━━━━━━━━🧡

╭─「 😼 𝐈𝐍𝐒𝐓𝐑𝐔𝐂𝐈𝐎𝐍 」─╮
│
│ 🐾 𝗠𝗲𝗻𝗰𝗶𝗼𝗻𝗮 𝗼 𝗰𝗶𝘁𝗮 𝗮𝗹 𝘂𝘀𝘂𝗮𝗿𝗶𝗼
│ 🍜 𝗘𝗷𝗲𝗺𝗽𝗹𝗼 :.kick @usuario
│
╚━━━━━━━━━━╝
`, m);
  }

  const groupInfo = await conn.groupMetadata(m.chat);
  const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
  const ownerBot = globalThis.owner[0][0] + '@s.whatsapp.net';
  const protectedOwners = global.owner.map(o => o[0] + '@s.whatsapp.net');
  const targetName = globalThis.db.data.users[user]?.name || await conn.getName(user)

  if (user === m.sender) {
    return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⛔ 𝐀𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎 ⛔
🧡━━━━━━━━🧡

╭─「 🐾 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 😼 𝗡𝗼 𝗽𝘂𝗲𝗱𝗲𝘀 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿𝘁𝗲 𝗮 𝘁𝗶 𝗺𝗶𝘀𝗺𝗼
│
╚━━━━━━━━━━╝
`, m);
  }

  if (user === conn.user.jid) {
    return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⛔ 𝐀𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎 ⛔
🧡━━━━━━━━🧡

╭─「 🍜 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 😼 𝗡𝗼 𝗽𝘂𝗲𝗱𝗼 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿𝗺𝗲 𝗮 𝗺𝗶 𝗺𝗶𝘀𝗺𝗼
│
╚━━━━━━━━━━╝
`, m);
  }

  if (user === ownerGroup) {
    return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⛔ 𝐀𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎 ⛔
🧡━━━━━━━━🧡

╭─「 🛡️ 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 🐾 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿 𝗮𝗹 𝗰𝗿𝗲𝗮𝗱𝗼𝗿
│ 😼 𝗥𝗲𝘀𝗽𝗲𝘁𝗮 𝗮𝗹 𝗱𝘂𝗲𝗻𝗼 𝗱𝗲𝗹 𝘀𝗼𝗳𝗮
│
╚━━━━━━━━━━╝
`, m);
  }

  if (user === ownerBot || protectedOwners.includes(user)) {
    return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⛔ 𝐀𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎 ⛔
🧡━━━━━━━━🧡

╭─「 😼 𝐒𝐄𝐆𝐔𝐑𝐈𝐃𝐀𝐃 」─╮
│
│ 🐾 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗲𝗱𝗲 𝗲𝘅𝗽𝘂𝗹𝘀𝗮𝗿 𝗮𝗹 𝗼𝘄𝗻𝗲𝗿
│ 🍜 𝗡𝗶 𝗮 𝗚𝗮𝗿𝗳𝗶𝗲𝗹𝗱 𝗹𝗼 𝘀𝗮𝗰𝗮𝘀
│
╚━━━━━━━━━━╝
`, m);
  }

  const participant = groupInfo.participants.find(p => p.jid === user);

  if (!participant) {
    return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⚠️ 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 𝐍𝐎 𝐄𝐍𝐂𝐎𝐍𝐓𝐑𝐀𝐃𝐎 ⚠️
🧡━━━━━━━━🧡

╭─「 🐾 𝐄𝐒𝐓𝐀𝐃𝐎 」─╮
│
│ 😼 ${targetName} 𝘆𝗮 𝗻𝗼 𝗲𝘀𝘁𝗮 𝗲𝗻 𝗲𝗹 𝗴𝗿𝘂𝗽𝗼
│
╚━━━━━━━━━━╝
`, m);
  }

  await conn.groupParticipantsUpdate(m.chat, [user], 'remove');

  await conn.reply(m.chat, `🧡━━━━━━━━🧡
   🔻 𝐄𝐗𝐏𝐔𝐋𝐒𝐈𝐎𝐍 𝐄𝐉𝐄𝐂𝐔𝐓𝐀𝐃𝐀 🔻
🧡━━━━━━━━🧡

╭─「 🍜 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│
│ 😼 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 : ${targetName}
│ 🐾 𝗔𝗰𝗶𝗼𝗻 : 𝗘𝗫𝗣𝗨𝗟𝗦𝗔𝗗𝗢
│ 🍜 𝗣𝗼𝗿 : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

🐱 "𝗟𝗮 𝗽𝘂𝗲𝗿𝘁𝗮 𝘀𝗲 𝗰𝗲𝗿𝗼 𝘆 𝘀𝗲 𝗮𝗰𝗮𝗯𝗼 𝗹𝗮 𝗹𝗮𝘀𝗮𝗴𝗻𝗮 𝗽𝗮𝗿𝗮 𝗲𝗹" 🧡
`, m, { mentions: [m.sender] });
};

handler.help = ['kick'];
handler.tags = ['group'];
handler.command = ['kick', 'expulsar', 'sacar'];
handler.admin = true;
handler.botAdmin = true;
handler.group = true

export default handler;