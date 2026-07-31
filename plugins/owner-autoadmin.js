const handler = async (m, {conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply(`🧡━━━━━━━━🧡
   😼 **LU BOT PREM** 😼
🧡━━━━━━━━🧡

╭─「 ⚠️ **AVISO** 」─╮
│
│ 🐾 **Ya eres administrador**
│ 🍜 **No puedo darte 2 veces**
│
╚━━━━━━━━━━╝

😼 "**Hasta Garfield tiene limites**" 🧡
`);

  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    await m.react('👑')
    m.reply(`🧡━━━━━━━━🧡
   👑 **ASCENSO CONCEDIDO** 👑
🧡━━━━━━━━🧡

╭─「 🐾 **REPORTE** 」─╮
│
│ 😼 **Usuario** : @${m.sender.split('@')[0]}
│ 🍜 **Nuevo Rango** : **Administrador**
│ 🐾 **Por** : **Sistema Garfield**
│
╚━━━━━━━━━━╝

🐱 "**Bienvenido al club de la Lasaña**" 🧡
`, null, { mentions: [m.sender] });

  } catch (e) {
    console.error(e)
    m.reply(`🧡━━━━━━━━🧡
   ❌ **ERROR CRITICO** ❌
🧡━━━━━━━━🧡

╭─「 😼 **DETALLE** 」─╮
│
│ 🐾 **No se pudo dar admin**
│ 🍜 **Verifica permisos del bot**
│
╚━━━━━━━━━━╝

😼 "**Hasta a mi me da flojera arreglarlo**" 🧡
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