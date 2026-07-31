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
   ⚠️ **AVISO DEL SISTEMA** ⚠️
🧡━━━━━━━━🧡

╭─「 🐾 **ESTADO** 」─╮
│
│ 😼 **No hay usuarios validos**
│ 🍜 **para expulsar**
│
╚━━━━━━━━━━╝

🐱 "**Solo queda Garfield y su Lasaña**" 🧡
`, m);
  }

  // Mensaje de advertencia antes de ejecutar
  await conn.reply(m.chat, `🧡━━━━━━━━🧡
   🔴 **PROTOCOLO GARFIELD** 🔴
🧡━━━━━━━━🧡

╭─「 🐾 **LIMPIEZA** 」─╮
│
│ 😼 **Objetivos** : ${targets.length}
│ 🍜 **Estado** : **Eliminando...**
│ 🐾 **Autor** : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

😼 "**Iniciando limpieza del sofa**" 🧡
`, m, { mentions: [m.sender] });

  await conn.groupParticipantsUpdate(m.chat, targets, 'remove');

  await conn.reply(m.chat, `🧡━━━━━━━━🧡
   ✅ **PROTOCOLO COMPLETADO** ✅
🧡━━━━━━━━🧡

╭─「 🍜 **REPORTE** 」─╮
│
│ 😼 **Expulsados** : ${targets.length}
│ 🐾 **Estado** : **Grupo limpio**
│ 🍜 **Por** : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

🐱 "**El territorio ha sido purgado. Hora de la Lasaña**" 🧡
`, m, { mentions: [m.sender] });
};

handler.help = ['kickall'];
handler.tags = ['group'];
handler.command = ['kickall', 'limpiar', 'sacarall'];
handler.admin = true;
handler.botAdmin = true;
handler.group = true

export default handler;