import { getBotConfig } from '../lib/botconfig.js'

const handler = async (m, { conn, command }) => {
  try {
    const jid = (id) => id?.includes('@')? id : `${id}@s.whatsapp.net`
    let who =
      m.mentionedJid?.[0] ||
      m.msg?.contextInfo?.mentionedJid?.[0] ||
      m.quoted?.sender ||
      null

    if (!who) {
      return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ❌ **ERROR DE SISTEMA** ❌
🧡━━━━━━━━🧡

╭─「 😼 **INSTRUCCION** 」─╮
│
│ 🐾 **Menciona o cita al usuario**
│ 🍜 **Ejemplo** :.promote @usuario
│
╚━━━━━━━━━━╝
`, m)
    }

    who = jid(who)

    const groupMetadata = await conn.groupMetadata(m.chat)
    const participant = groupMetadata.participants.find(
      p => jid(p.id || p.jid) === who
    )

    const isPromote = command === 'promote'
    const protectedOwners = global.owner.map(
      o => o[0] + '@s.whatsapp.net'
    )
    const targetName = await conn.getName(who)

    if (isPromote) {
      if (participant?.admin) {
        return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⚠️ **AVISO DEL SISTEMA** ⚠️
🧡━━━━━━━━🧡

╭─「 🐾 **ESTADO** 」─╮
│
│ 😼 @${who.split('@')[0]} **ya es admin**
│ 🍜 **No puedo darle 2 coronas**
│
╚━━━━━━━━━━╝
`, m, { mentions: [who] })
      }

      await conn.groupParticipantsUpdate(m.chat, [who], 'promote')

      return conn.reply(m.chat, `🧡━━━━━━━━🧡
   👑 **ASCENSO EJECUTADO** 👑
🧡━━━━━━━━🧡

╭─「 🐾 **REPORTE** 」─╮
│
│ 😼 **Usuario** : @${who.split('@')[0]}
│ 🍜 **Nuevo Rango** : **Administrador**
│ 🐾 **Por** : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

🐱 "**Bienvenido al club de la Lasaña**" 🧡
`, m, { mentions: [who, m.sender] })
    }

    // DEMOTE
    if (protectedOwners.includes(who)) {
      return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⛔ **ACCESO DENEGADO** ⛔
🧡━━━━━━━━🧡

╭─「 🛡️ **SEGURIDAD** 」─╮
│
│ 😼 **No se puede degradar al Owner**
│ 🍜 **Ni a Garfield lo bajas**
│
╚━━━━━━━━━━╝
`, m)
    }

    if (!participant?.admin) {
      return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⚠️ **AVISO DEL SISTEMA** ⚠️
🧡━━━━━━━━🧡

╭─「 🐾 **ESTADO** 」─╮
│
│ 😼 @${who.split('@')[0]} **no es admin**
│
╚━━━━━━━━━━╝
`, m, { mentions: [who] })
    }

    if (who === groupMetadata.owner) {
      return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⛔ **ACCESO DENEGADO** ⛔
🧡━━━━━━━━🧡

╭─「 🍜 **SEGURIDAD** 」─╮
│
│ 😼 **No se puede degradar al creador**
│ 🐾 **Respeta al dueño del sofa**
│
╚━━━━━━━━━━╝
`, m)
    }

    if (who === conn.user.jid) {
      return conn.reply(m.chat, `🧡━━━━━━━━🧡
   ⛔ **ACCESO DENEGADO** ⛔
🧡━━━━━━━━🧡

╭─「 😼 **SEGURIDAD** 」─╮
│
│ 🐾 **No puedo degradarme a mi mismo**
│
╚━━━━━━━━━━╝
`, m)
    }

    await conn.groupParticipantsUpdate(m.chat, [who], 'demote')

    return conn.reply(m.chat, `🧡━━━━━━━━🧡
   🔻 **DEGRADACION EJECUTADA** 🔻
🧡━━━━━━━━🧡

╭─「 🍜 **REPORTE** 」─╮
│
│ 😼 **Usuario** : @${who.split('@')[0]}
│ 🐾 **Nuevo Rango** : **Miembro**
│ 🍜 **Por** : @${m.sender.split('@')[0]}
│
╚━━━━━━━━━━╝

😼 "**Ya no eres del club de la Lasaña**" 🧡
`, m, { mentions: [who, m.sender] })

  } catch (e) {
    conn.reply(m.chat, `🧡━━━━━━━━🧡
   ❌ **ERROR CRITICO** ❌
🧡━━━━━━━━🧡

╭─「 🐾 **DETALLE** 」─╮
│
│ 😼 ${e.message}
│
╚━━━━━━━━━━╝

😼 "**Hasta a mi me da flojera**" 🧡
`, m)
  }
}

handler.help = ['promote', 'demote']
handler.tags = ['group']
handler.command = ['promote', 'daradmin', 'demote', 'quitaradmin']
handler.admin = true
handler.botAdmin = true
handler.group = true

export default handler