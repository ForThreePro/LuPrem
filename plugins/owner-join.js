import { getBotConfig } from '../lib/botconfig.js'

let linkRegex = /https:\/\/chat\.whatsapp\.com\/([0-9A-Za-z]{20,24})/i;

let handler = async (m, { conn, text, isOwner }) => {
  const botname = getBotConfig(conn, 'botname')

    if (!text) return m.reply(`🧡━━━━━━━━🧡
   😼 **LU BOT PREM** 😼
🧡━━━━━━━━🧡

╭─「 ❌ **INSTRUCCION** 」─╮
│
│ 🐾 **Debes enviar una invitacion**
│ 🍜 **para que** *${botname}* **se una**
│ 😼 **a la casa de Garfield**
│
╚━━━━━━━━━━╝
`);

    let [_, code] = text.match(linkRegex) || [];

    if (!code) return m.reply(`🧡━━━━━━━━🧡
   😼 **LU BOT PREM** 😼
🧡━━━━━━━━🧡

╭─「 ❌ **VALIDACION** 」─╮
│
│ 🐾 **Enlace de invitacion**
│ 🍜 **no valido**
│
╚━━━━━━━━━━╝

😼 "**Eso ni Odie lo entiende**" 🧡
`);

    if (isOwner) {
        await conn.groupAcceptInvite(code)
            .then(res => m.reply(`🧡━━━━━━━━🧡
   ✅ **ACCESO CONCEDIDO** ✅
🧡━━━━━━━━🧡

╭─「 🐾 **REPORTE** 」─╮
│
│ 😼 **Me he unido exitosamente**
│ 🍜 **al grupo**
│
╚━━━━━━━━━━╝

🐱 "**Huele a Lasaña aqui**" 🧡
`))
            .catch(err => m.reply(`🧡━━━━━━━━🧡
   😼 **LU BOT PREM** 😼
🧡━━━━━━━━🧡

╭─「 ❌ **ERROR** 」─╮
│
│ 🐾 **Error al unirme**
│ 🍜 **al grupo**
│
╚━━━━━━━━━━╝

😼 "**Mejor me quedo durmiendo**" 🧡
`));
    } else {
        let message = `🧡━━━━━━━━🧡
   📨 **SOLICITUD DE INGRESO** 📨
🧡━━━━━━━━🧡

╭─「 🐾 **DETALLE** 」─╮
│
│ 🔗 **Enlace** : ${text}
│ 😼 **Por** : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝
`;
        await conn.sendMessage(`${global.owner[0][0]}` + '@s.whatsapp.net', { text: message, mentions: [m.sender] }, { quoted: m });
        m.reply(`🧡━━━━━━━━🧡
   📤 **SOLICITUD ENVIADA** 📤
🧡━━━━━━━━🧡

╭─「 🍜 **ESTADO** 」─╮
│
│ 🐾 **El link del grupo**
│ 😼 **ha sido enviado al Owner**
│
╚━━━━━━━━━━╝

🐱 "**Ahora a esperar siesta**" 🧡
`, null, { mentions: [m.sender] });
    }
};

handler.help = ['invite'];
handler.tags = ['owner'];
handler.command = ['invite', 'join', 'unirse'];

export default handler;