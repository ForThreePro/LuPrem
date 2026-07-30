const handler = async (m, { isOwner, isAdmin, conn, participants, args }) => {
  try {
    if (!(isAdmin || isOwner)) {
      global.dfail('admin', m, conn);
      return;
    }

    const customMessage = args.join(' ') || '🍜 Hora de la lasaña';
    const groupMetadata = await conn.groupMetadata(m.chat).catch(() => ({ subject: 'Grupo', participants: [] }));
    const groupName = groupMetadata.subject;

    // Lista de banderas por prefijo
    const countryFlags = [
      { prefijo: '502', bandera: '🇬🇹' }, { prefijo: '503', bandera: '🇸🇻' },
      { prefijo: '504', bandera: '🇭🇳' }, { prefijo: '505', bandera: '🇳🇮' },
      { prefijo: '506', bandera: '🇨🇷' }, { prefijo: '507', bandera: '🇵🇦' },
      { prefijo: '591', bandera: '🇧🇴' }, { prefijo: '592', bandera: '🇬🇾' },
      { prefijo: '593', bandera: '🇪🇨' }, { prefijo: '595', bandera: '🇵🇾' },
      { prefijo: '598', bandera: '🇺🇾' }, { prefijo: '58', bandera: '🇻🇪' },
      { prefijo: '52', bandera: '🇲🇽' }, { prefijo: '54', bandera: '🇦🇷' },
      { prefijo: '57', bandera: '🇨🇴' }, { prefijo: '51', bandera: '🇵🇪' },
      { prefijo: '56', bandera: '🇨🇱' }, { prefijo: '55', bandera: '🇧🇷' },
      { prefijo: '34', bandera: '🇪🇸' }, { prefijo: '44', bandera: '🇬🇧' },
      { prefijo: '33', bandera: '🇫🇷' }, { prefijo: '49', bandera: '🇩🇪' },
      { prefijo: '39', bandera: '🇮🇹' }, { prefijo: '81', bandera: '🇯🇵' },
      { prefijo: '82', bandera: '🇰🇷' }, { prefijo: '86', bandera: '🇨🇳' },
      { prefijo: '91', bandera: '🇮🇳' }, { prefijo: '61', bandera: '🇦🇺' },
      { prefijo: '64', bandera: '🇳🇿' }, { prefijo: '1', bandera: '🇺🇸' },
      { prefijo: '7', bandera: '🇷🇺' }, { prefijo: '63', bandera: '🇵🇭' },
      { prefijo: '95', bandera: '🇲🇲' }
    ];

    const getCountryFlag = (mem) => {
      const rawJid = mem.jid || mem.id || '';
      const phoneNumber = rawJid.split('@')[0];
      const match3 = countryFlags.find(c => c.prefijo.length === 3 && phoneNumber.startsWith(c.prefijo));
      if (match3) return match3.bandera;
      const match2 = countryFlags.find(c => c.prefijo.length === 2 && phoneNumber.startsWith(c.prefijo));
      if (match2) return match2.bandera;
      const match1 = countryFlags.find(c => c.prefijo.length === 1 && phoneNumber.startsWith(c.prefijo));
      if (match1) return match1.bandera;
      return '🐾';
    };

    // Agrupar participantes por bandera
    const grouped = {};
    for (const mem of participants) {
      const flag = getCountryFlag(mem);
      if (!grouped[flag]) grouped[flag] = [];
      grouped[flag].push(mem);
    }

    const orderedFlags = countryFlags.map(c => c.bandera).concat(['🐾']);

    // Texto con estética Garfield
    let messageText = `🧡━━━━━━━━🧡
   😼 𝐋𝐔 𝐁𝐎𝐓 𝐏𝐑𝐄𝐌 😼
🧡━━━━━━━━🧡

╭─「 🍜 𝐍𝐎𝐓𝐈𝐅𝐈𝐂𝐀𝐂𝐈𝐎𝐍 」─╮
│
│ 🐾 𝗚𝗿𝘂𝗽𝗼 : ${groupName}
│ 😼 𝗠𝗲𝗻𝘀𝗮𝗷𝗲 : ${customMessage}
│
╚━━━━━━━━━━╝

🐱 "𝗧𝗼𝗱𝗼𝘀 𝗮𝗹 𝘀𝗼𝗳𝗮 𝗮𝗵𝗼𝗿𝗮" 🧡

──🍜 *𝗜𝗡𝗧𝗘𝗚𝗥𝗔𝗡𝗧𝗘𝗦* ──
👥 𝗧𝗼𝘁𝗮𝗹 : ${participants.length} 𝘂𝘀𝘂𝗮𝗿𝗶𝗼𝘀

──🐾 *𝗟𝗜𝗦𝗧𝗔 𝗣𝗢𝗥 𝗣𝗔𝗜𝗦* 🐾──
`

    for (const flag of orderedFlags) {
      if (grouped[flag]) {
        for (const mem of grouped[flag]) {
          const realJid = mem.jid || mem.id || '';
          const displayNumber = realJid.split('@')[0];
          messageText += `│ ${flag} @${displayNumber}\n`;
        }
      }
    }

    messageText += `
🧡━━━━━━━━━━━━━━━🧡
😼 *𝗕𝗢𝗧* : 𝗟𝗨 𝐁𝐎𝐓 𝐏𝐑𝐄𝐌
🐾 *𝗩𝗘𝗥𝗦𝗜𝗢𝗡* : 1.0 𝗚𝗮𝗿𝗳𝗶𝗲𝗹𝗱 𝗣𝗿𝗲𝗺
🍜 *𝗙𝗥𝗔𝗦𝗘* : "𝗢𝗱𝗶𝗼 𝗹𝗼𝘀 𝗹𝘂𝗻𝗲𝘀"
🧡━━━━━━━━━━━━━━━🧡
`;

    // Foto del grupo
    let img
    try {
      img = await conn.profilePictureUrl(m.chat, 'image') // Foto del grupo
    } catch {
      img = 'https://files.evogb.win/zocch8.jpg' // Fallback Garfield
    }

    await conn.sendMessage(m.chat, {
      image: { url: img },
      caption: messageText,
      mentions: participants.map(a => a.jid || a.id)
    }, { quoted: m });

  } catch (error) {
    console.error("[ERROR EN LU BOT]:", error);
    conn.reply(m.chat, `🧡━━━━━━━━🧡
   ❌ 𝐄𝐑𝐎𝐑 𝐂𝐑𝐈𝐓𝐈𝐂𝐎 ❌
🧡━━━━━━━━🧡

╭─「 😼 𝐃𝐄𝐓𝐀𝐋𝐄 」─╮
│
│ 🐾 𝗢𝗰𝘂𝗿𝗶𝗼 𝘂𝗻 𝗲𝗿𝗼𝗿
│ 🍜 𝗮𝗹 𝗲𝗷𝗲𝗰𝘂𝘁𝗮𝗿 𝗲𝗹 𝗰𝗼𝗺𝗮𝗻𝗱𝗼
│
╚━━━━━━━━━━╝

😼 "𝗛𝗮𝘀𝘁𝗮 𝗮 𝗺𝗶 𝗺𝗲 𝗱𝗮 𝗳𝗹𝗼𝗷𝗲𝗿𝗮" 🧡
`, m);
  }
};

handler.help = ['todos <texto>'];
handler.tags = ['group'];
handler.command = /^(todos|invocar|tagall)$/i;
handler.admin = true;
handler.group = true;

export default handler