let handler = async (m, { conn, args, command, isOwner }) => {
  const setting = args[0]?.toLowerCase();
  const chatData = global.db.data.chats[m.chat];
  const botSettings = global.db.data.settings[conn.user.jid];

  const on = '✅';
  const off = '❌';

  // AGARRAR FOTO Y NOMBRE DEL GRUPO
  let pp;
  let groupName = await conn.getName(m.chat);
  try {
    pp = await conn.profilePictureUrl(m.chat, 'image');
  } catch {
    pp = 'https://files.evogb.win/zocch8.jpg'; // default Garfield
  }

  const configList = `
🧡━━━━━━━━🧡
   ⚙️ 𝐂𝐎𝐍𝐅𝐈𝐆𝐔𝐑𝐀𝐂𝐈𝐎𝐍 ⚙️
🧡━━━━━━━━🧡

╭─「 🐾 𝐄𝐒𝐓𝐀𝐃𝐎 」─╮
│
│ ${chatData.welcome? on : off} 𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗮
│ ${chatData.antiLink? on : off} 𝗔𝗻𝘁𝗶𝗟𝗶𝗻𝗸
│ ${chatData.economy? on : off} 𝗘𝗰𝗼𝗻𝗼𝗺𝗶𝗮
│ ${chatData.gacha? on : off} 𝗚𝗮𝗰𝗵𝗮
│ ${chatData.adminonly? on : off} 𝗠𝗼𝗱𝗼 𝗔𝗱𝗺𝗶𝗻
│ ${chatData.reaction? on : off} 𝗥𝗲𝗮𝗰𝗶𝗼𝗻𝗲𝘀
│ ${chatData.nsfw? on : off} 𝗡𝗦𝗙𝗪
│ ${chatData.alerts? on : off} 𝗔𝗹𝗲𝗿𝘁𝗮𝘀
│ ${chatData.notprefix? on : off} 𝗦𝗶𝗻 𝗣𝗿𝗲𝗳𝗶𝗷𝗼
│ ${botSettings?.jadibotmd? on : off} 𝗦𝘂𝗯𝗕𝗼𝘁𝘀
│
╚━━━━━━━━━━╝

╭─「 🍜 𝐔𝐒𝐎 」─╮
│.${command} welcome on/off
│.${command} antilink on/off
╚━━━━━━━━━━╝

😼 "𝗡𝗼 𝘁𝗼𝗾𝘂𝗲𝘀 𝗺𝗶 𝗹𝗮𝘀𝗮𝗴𝗻𝗮" 🧡
`.trim();

  if (!setting) {
    return conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: `🧡━━━━━━━━🧡
   😼 *${groupName}* 😼
🧡━━━━━━━━🧡
${configList}`,
      mentions: [m.sender]
    }, { quoted: m });
  }

  const status = args[1]?.toLowerCase() === 'on' || args[1]?.toLowerCase() === 'true' || args[1] === '1';
  const reply = (name) => conn.sendMessage(m.chat, {
    image: { url: pp },
    caption: `
🧡━━━━━━━━🧡
   ✅ 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐃𝐎 ✅
🧡━━━━━━━━🧡

╭─「 🐾 𝐑𝐄𝐏𝐎𝐑𝐓𝐄 」─╮
│
│ 📌 𝗙𝘂𝗻𝗰𝗶𝗼𝗻 : ${name}
│ 📊 𝗘𝘀𝘁𝗮𝗱𝗼 : ${status? '✅ ACTIVADO' : '❌ DESACTIVADO'}
│
╚━━━━━━━━━━╝

🐱 "𝗬𝗮 𝗾𝘂𝗲𝗱𝗼 𝗰𝗼𝗺𝗼 𝗲𝗻 𝗲𝗹 𝘀𝗼𝗳𝗮" 🧡
`.trim(),
    mentions: [m.sender]
  }, { quoted: m });

  switch (setting) {
    case 'antilink': case 'antilinks': case 'antienlaces':
      chatData.antiLink = status; reply('Anti Enlaces'); break;

    case 'rpg': case 'economia':
      chatData.rpg = status; chatData.economy = status; reply('Economia'); break;

    case 'gacha':
      chatData.gacha = status; reply('Gacha'); break;

    case 'modoadmin': case 'adminonly': case 'onlyadmin':
      chatData.adminonly = status; reply('Modo Admin'); break;

    case 'nsfw':
      chatData.nsfw = status; reply('NSFW'); break;

    case 'bienvenida': case 'welcome':
      chatData.welcome = status; reply('Bienvenida'); break;

    case 'reaccion': case 'reaction':
      chatData.reaction = status; reply('Reacciones'); break;

    case 'alerts': case 'alertas':
      chatData.alerts = status; reply('Alertas'); break;

    case 'notprefix': case 'noprefix': case 'sinprefijo':
      chatData.notprefix = status; reply('Sin Prefijo'); break;

    case 'serbot': case 'jadibot': case 'subbots':
      if (!isOwner) return m.reply(`🧡━━━━━━━━🧡
   ⛔ 𝐀𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎 ⛔
🧡━━━━━━━━🧡

╭─「 😼 𝐄𝐑𝐎𝐑 」─╮
│
│ 🐾 𝗦𝗼𝗹𝗼 𝗲𝗹 𝗢𝘄𝗻𝗲𝗿
│ 🍜 𝗽𝘂𝗲𝗱𝗲 𝘂𝘀𝗮𝗿 𝗲𝘀𝘁𝗼
│
╚━━━━━━━━━━╝
`);
      if (botSettings) { botSettings.jadibotmd = status; reply('SubBots'); }
      break;

    default:
      return conn.sendMessage(m.chat, {
        image: { url: pp },
        caption: `🧡━━━━━━━━🧡
   ⚠️ 𝐄𝐑𝐎𝐑 ⚠️
🧡━━━━━━━━🧡

╭─「 ❌ 𝐎𝐏𝐂𝐈𝐎𝐍 」─╮
│
│ 🐾 𝗢𝗽𝗰𝗶𝗼𝗻 𝗻𝗼 𝘃𝗮𝗹𝗶𝗱𝗮
│
╚━━━━━━━━━━╝

${configList}`,
        mentions: [m.sender]
      }, { quoted: m });
  }
};

handler.help = ['on', 'off'];
handler.tags = ['grupo'];
handler.command = ['on', 'off', 'enable', 'disable'];
handler.admin = true;
handler.botAdmin = false;
export default handler