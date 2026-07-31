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
   ⚙️ **CONFIGURACION** ⚙️
🧡━━━━━━━━🧡

╭─「 🐾 **ESTADO** 」─╮
│
│ ${chatData.antiLink? on : off} **AntiLink**
│ ${chatData.economy? on : off} **Economia**
│ ${chatData.gacha? on : off} **Gacha**
│ ${chatData.adminonly? on : off} **Modo Admin**
│ ${chatData.reaction? on : off} **Reacciones**
│ ${chatData.nsfw? on : off} **NSFW**
│ ${chatData.alerts? on : off} **Alertas**
│ ${chatData.notprefix? on : off} **Sin Prefijo**
│ ${botSettings?.jadibotmd? on : off} **SubBots**
│
╚━━━━━━━━━━╝

╭─「 🍜 **USO** 」─╮
│.${command} welcome on/off
│.${command} antilink on/off
╚━━━━━━━━━━╝

😼 "**No toques mi Lasaña**" 🧡
`.trim();

  if (!setting) {
    return conn.sendMessage(m.chat, {
      image: { url: pp },
      caption: `🧡━━━━━━━━🧡
   😼 **${groupName}** 😼
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
   ✅ **ACTUALIZADO** ✅
🧡━━━━━━━━🧡

╭─「 🐾 **REPORTE** 」─╮
│
│ 📌 **Funcion** : ${name}
│ 📊 **Estado** : ${status? '✅ ACTIVADO' : '❌ DESACTIVADO'}
│
╚━━━━━━━━━━╝

🐱 "**Ya quedo como en el sofa. No toquen nada**" 🧡
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

    case 'reaccion': case 'reaction':
      chatData.reaction = status; reply('Reacciones'); break;

    case 'alerts': case 'alertas':
      chatData.alerts = status; reply('Alertas'); break;

    case 'notprefix': case 'noprefix': case 'sinprefijo':
      chatData.notprefix = status; reply('Sin Prefijo'); break;

    case 'serbot': case 'jadibot': case 'subbots':
      if (!isOwner) return m.reply(`🧡━━━━━━━━🧡
   ⛔ **ACCESO DENEGADO** ⛔
🧡━━━━━━━━🧡

╭─「 😼 **ERROR** 」─╮
│
│ 🐾 **Solo el Owner**
│ 🍜 **puede usar esto**
│
╚━━━━━━━━━━╝
`);
      if (botSettings) { botSettings.jadibotmd = status; reply('SubBots'); }
      break;

    default:
      return conn.sendMessage(m.chat, {
        image: { url: pp },
        caption: `🧡━━━━━━━━🧡
   ⚠️ **ERROR** ⚠️
🧡━━━━━━━━🧡

╭─「 ❌ **OPCION** 」─╮
│
│ 🐾 **Opcion no valida**
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