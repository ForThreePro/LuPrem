import moment from 'moment-timezone'
import os from 'os'

const CATEGORY_META = {
config: '⚙️ **CONFIG**',
main: '🔧 **MAIN**',
tools: '🛠️ **HERRAMIENTAS**',
owner: '👑 **OWNER**',
sorteos: '🎯 **SORTEOS**',
fun: '😼 **FUN**',
joda: '😎 **JODA**',
ff: '🔫 **FF**',
buscadores: '🔍 **BUSCAR**',
descargas: '📥 **DESCARGAS**',
grupo: '⚔️ **GRUPOS**',
group: '🛡️ **GRUPO**',
gacha: '👥 **GACHA**',
ia: '🤖 **IA**',
info: 'ℹ️ **INFO**',
sticker: '🎨 **STICKER**',
}

let handler = async (m, { conn }) => {
try {
await conn.sendMessage(m.chat, { react: { text: '🍜', key: m.key } })

const fecha = moment.tz('America/Lima').format('dddd')
const fecha2 = moment.tz('America/Lima').format('DD [de] MMMM [de] YYYY')
const hora = moment.tz('America/Lima').format('hh:mm:ss a')
const uptime = process.uptime()
const horas = Math.floor(uptime / 3600)
const minutos = Math.floor((uptime % 3600) / 60)
const segundos = Math.floor(uptime % 60)
const ram = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
const totalram = (os.totalmem() / 1024 / 1024 / 1024).toFixed(2)
const pluginsCount = Object.values(global.plugins || {}).filter(p =>!p?.disabled).length
const totalUsers = Object.keys(global.db.data.users || {}).length

const byTag = {}
for (const plugin of Object.values(global.plugins || {})) {
  if (plugin.disabled) continue
  const tags = Array.isArray(plugin.tags)? plugin.tags : (plugin.tags? [plugin.tags] : [])
  const helps = Array.isArray(plugin.help)? plugin.help : (plugin.help? [plugin.help] : [])
  for (const tag of tags) {
    if (!CATEGORY_META[tag]) continue
    if (!byTag[tag]) byTag[tag] = new Set()
    for (const h of helps) if (typeof h === 'string' && h.trim()) byTag[tag].add(h.trim())
  }
}

const userName = m.pushName || 'Usuario'
const IMG_MENU = 'https://files.evogb.win/zocch8.jpg' // Banner Garfield

let menuTexto = `🧡━━━━━━━━🧡
   😼 **LU BOT PREM** 😼 ୨

⤷ ┇ **Version:** v3.0 Garfield ：✦ 。
╰─ ◈ **ONLINE** • ${horas}h ${minutos}m ${segundos}s

╭─「 🐾 **USUARIO** 」─╮
│ 😼 @${userName}
│ 🍜 "**Conectado. No toques mi Lasaña**"
╚━━━━━━━━━━╝

──🧡 **ESTADISTICAS** ╏ 📊
👥 **Usuarios:** ${totalUsers} | 📜 **Comandos:** ${pluginsCount}
💾 **RAM:** ${ram}mb | 🌐 **Servidor:** ${totalram}gb

──🍜 **SISTEMA** 🍜──
📅 **Dia:** ${fecha}
📆 **Fecha:** ${fecha2}
🕐 **Hora:** ${hora} | 📡 **Ping:** ${Math.round(performance.now())}ms

`

for (const tag of Object.keys(CATEGORY_META)) {
  const set = byTag[tag]
  if (!set || set.size === 0) continue
  const cmds = [...set].sort()

  let icono = '🔧'
  if(tag === 'config') icono = '⚙️'
  if(tag === 'owner') icono = '👑'
  if(tag === 'fun') icono = '😼'
  if(tag === 'ff') icono = '🔫'
  if(tag === 'buscadores') icono = '🔍'
  if(tag === 'descargas') icono = '📥'
  if(tag === 'grupo') icono = '⚔️'
  if(tag === 'group') icono = '🛡️'
  if(tag === 'gacha') icono = '👥'
  if(tag === 'ia') icono = '🤖'
  if(tag === 'info') icono = 'ℹ️'
  if(tag === 'sticker') icono = '🎨'

  menuTexto += `\n╭─「 ${CATEGORY_META[tag]} 」─╮\n`
  menuTexto += cmds.map(c => `│ ${icono}.${c}`).join('\n') + '\n'
  menuTexto += `╰─────────────────╯\n`
}

menuTexto += `
🧡━━━━━━━━🧡
🔥 **BOT:** **LU BOT PREM**
🐱 **CREADOR:** **Tu Nombre** 👑
⚡ **VERSION:** 3.0 **Garfield Edition**
🌐 **WEB:** **github.com**

> "**Si tocas mi Lasaña te borro del grupo**" 😼
🧡━━━━━━━━🧡`

await conn.sendMessage(m.chat, {
  image: { url: IMG_MENU },
  caption: menuTexto.trim(),
  mentions: [m.sender]
}, { quoted: m })

} catch (e) {
await conn.sendMessage(m.chat, { text: `🧡━━━━━━━━🧡
   ❌ **SYSTEM ERROR** ❌
🧡━━━━━━━━🧡

╭─「 🐾 **DETALLE** 」─╮
│
│ 😼 ${e.message}
│
╚━━━━━━━━━━╝

🐱 "**Hasta a mi me da flojera arreglarlo**" 🧡
`}, { quoted: m })
}
}

handler.help = ['menu']
handler.tags = ['info']
handler.command = ['menu', 'help', 'menugarfield', 'menulu']

export default handler