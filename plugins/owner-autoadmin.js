const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply(`🧡━━━━━━━━🧡
   😼 𝐋𝐔 𝐁𝐎𝐓 𝐏𝐑𝐄𝐌 😼
🧡━━━━━━━━🧡

╭─「 ⚠️ 𝐀𝐕𝐈𝐒𝐎 」─╮
│
│ 🐾 𝗬𝗮 𝗲𝗿𝗲𝘀 𝗮𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝗱𝗼𝗿
│ 🍜 𝗡𝗼 𝗽𝘂𝗲𝗱𝗼 𝗱𝗮𝗿𝘁𝗲 2 𝘃𝗲𝗰𝗲𝘀
│
╚━━━━━━━━━━╝

😼 "𝗛𝗮𝘀𝘁𝗮 𝗚𝗮𝗿𝗳𝗶𝗲𝗹𝗱 𝘁𝗶𝗲𝗻𝗲 𝗹𝗶𝗺𝗶𝘁𝗲𝘀" 🧡
`);

  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    await m.react('👑')
    m.reply(`🧡━━━━━━━━🧡
   👑 𝐀𝐒𝐂𝐄𝐍𝐒𝐎 𝐂𝐎𝐍𝐂𝐄𝐃𝐈𝐃𝐎 👑
🧡━━━━━━━━🧡

╭─「 🐾 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│
│ 😼 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 : @${m.sender.split('@')[0]}
│ 🍜 𝗡𝘂𝗲𝘃𝗼 𝗥𝗮𝗻𝗴𝗼 : 𝗔𝗱𝗺𝗶𝗻𝗶𝘀𝘁𝗿𝗮𝗱𝗼𝗿
│ 🐾 𝗣𝗼𝗿 : 𝗦𝗶𝘀𝘁𝗲𝗺𝗮 𝗚𝗮𝗿𝗳𝗶𝗲𝗹𝗱
│
╚━━━━━━━━━━╝

🐱 "𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗼 𝗮𝗹 𝗰𝗹𝘂𝗯 𝗱𝗲 𝗹𝗮 𝗹𝗮𝘀𝗮𝗴𝗻𝗮" 🧡
`, null, { mentions: [m.sender] });

  } catch (e) {
    console.error(e)
    m.reply(`🧡━━━━━━━━🧡
   ❌ 𝐄𝐑𝐎𝐑 𝐂𝐑𝐈𝐓𝐈𝐂𝐎 ❌
🧡━━━━━━━━🧡

╭─「 😼 𝐃𝐄𝐓𝐀𝐋𝐄 」─╮
│
│ 🐾 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗱𝗼 𝗱𝗮𝗿 𝗮𝗱𝗺𝗶𝗻
│ 🍜 𝗩𝗲𝗿𝗶𝗳𝗶𝗰𝗮 𝗽𝗲𝗿𝗺𝗶𝘀𝗼𝘀 𝗱𝗲𝗹 𝗯𝗼𝘁
│
╚━━━━━━━━━━╝

😼 "𝗛𝗮𝘀𝘁𝗮 𝗮 𝗺𝗶 𝗺𝗲 𝗱𝗮 𝗳𝗹𝗼𝗷𝗲𝗿𝗮 𝗮𝗿𝗲𝗴𝗹𝗮𝗿𝗹𝗼" 🧡
`);
  }
};

handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['autoadmin', 'yoadmin'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;
handler.owner = true;

export default handler;