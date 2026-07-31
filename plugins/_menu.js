import moment from 'moment-timezone'
import os from 'os'

const CATEGORY_META = {
config: '⚙️ 𝐂𝐎𝐍𝐅𝐈𝐆',
main: '🔧 𝐌𝐀𝐈𝐍',
tools: '🛠️ 𝐇𝐄𝐑𝐀𝐌𝐈𝐄𝐍𝐓𝐀𝐒',
owner: '👑 𝐎𝐖𝐍𝐄𝐑',
sorteos: '🎯 𝐒𝐎𝐑𝐓𝐄𝐎𝐒',
fun: '😼 𝐅𝐔𝐍',
joda: '😎 𝐉𝐎𝐃𝐀',
ff: '🔫 𝐅𝐅',
buscadores: '🔍 𝐁𝐔𝐒𝐂𝐀𝐑',
descargas: '📥 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀𝐒',
grupo: '⚔️ 𝐆𝐑𝐔𝐏𝐎𝐒',
group: '🛡️ 𝐆𝐑𝐔𝐏𝐎',
gacha: '👥 𝐆𝐀𝐂𝐇𝐀',
ia: '🤖 𝐈𝐀',
info: 'ℹ️ 𝐈𝐍𝐅𝐎',
sticker: '🎨 𝐒𝐓𝐈𝐂𝐊𝐄𝐑',
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
   😼 𝐋𝐔 𝐁𝐎𝐓 𝐏𝐑𝐄𝐌 😼 ୨

⤷ ┇ *𝗩𝗲𝗿𝘀𝗶𝗼𝗻:* v3.0 Garfield ：✦ 。
╰─ ◈ *𝗢𝗡𝗟𝗜𝗡𝗘* • ${horas}𝗵 ${minutos}𝗺 ${segundos}𝘀

╭─「 🐾 𝐔𝐒𝐔𝐀𝐑𝐈𝐎 」─╮
│ 😼 @${userName}
│ 🍜 "𝗖𝗼𝗻𝗲𝗰𝘁𝗮𝗱𝗼. 𝗡𝗼 𝘁𝗼𝗾𝘂𝗲𝘀 𝗺𝗶 𝗹𝗮𝘀𝗮𝗴𝗻𝗮"
╚━━━━━━━━━━╝

──🧡 *𝗘𝗦𝗧𝗔𝗗𝗜𝗦𝗧𝗜𝗖𝗔𝗦* ╏ 📊
👥 *𝗨𝘀𝘂𝗮𝗿𝗶𝗼𝘀:* ${totalUsers} | 📜 *𝗖𝗼𝗺𝗮𝗻𝗱𝗼𝘀:* ${pluginsCount}
💾 *𝗥𝗔𝗠:* ${ram}𝗺𝗯 | 🌐 *𝗦𝗲𝗿𝘃𝗶𝗱𝗼𝗿:* ${totalram}𝗴𝗯

──🍜 *𝗦𝗜𝗦𝗧𝗘𝗠𝗔* 🍜──
📅 *𝗗𝗶𝗮:* ${fecha}
📆 *𝗙𝗲𝗰𝗵𝗮:* ${fecha2}
🕐 *𝗛𝗼𝗿𝗮:* ${hora} | 📡 *𝗣𝗶𝗻𝗴:* ${Math.round(performance.now())}𝗺𝘀

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
  if(tag === 'grupos') icono = '🛡️'
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
🔥 *𝗕𝗢𝗧:* 𝐋𝐔 𝐁𝐎𝐓 𝐏𝐑𝐄𝐌
🐱 *𝗖𝗥𝗘𝗔𝗗𝗢𝗥:* 𝗧𝘂 𝗡𝗼𝗺𝗯𝗿𝗲 👑
⚡ *𝗩𝗘𝗥𝗦𝗜𝗢𝗡:* 3.0 𝗚𝗮𝗿𝗳𝗶𝗲𝗹𝗱 𝗘𝗱𝗶𝘁𝗶𝗼𝗻
🌐 *𝗪𝗘𝗕:* 𝗴𝗶𝘁𝗵𝘂𝗯.𝗰𝗼𝗺

> "𝗦𝗶 𝘁𝗼𝗰𝗮𝘀 𝗺𝗶 𝗹𝗮𝘀𝗮𝗴𝗻𝗮 𝘁𝗲 𝗯𝗼𝗿𝗼 𝗱𝗲𝗹 𝗴𝗿𝘂𝗽𝗼" 😼
🧡━━━━━━━━🧡`

await conn.sendMessage(m.chat, {
  image: { url: IMG_MENU },
  caption: menuTexto.trim(),
  mentions: [m.sender]
}, { quoted: m })

} catch (e) {
await conn.sendMessage(m.chat, { text: `🧡━━━━━━━━🧡
   ❌ 𝐒𝐘𝐒𝐓𝐄𝐌 𝐄𝐑𝐎𝐑 ❌
🧡━━━━━━━━🧡

╭─「 🐾 𝐃𝐄𝐓𝐀𝐋𝐄 」─╮
│
│ 😼 ${e.message}
│
╚━━━━━━━━━━╝

🐱 "𝗛𝗮𝘀𝘁𝗮 𝗮 𝗺𝗶 𝗺𝗲 𝗱𝗮 𝗳𝗹𝗼𝗷𝗲𝗿𝗮 𝗮𝗿𝗲𝗴𝗹𝗮𝗿𝗹𝗼" 🧡
`}, { quoted: m })
}
}

handler.help = ['menu']
handler.tags = ['info']
handler.command = ['menu', 'help', 'menugarfield', 'menulu']

export default handler