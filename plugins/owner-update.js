import { execSync } from 'child_process'

var handler = async (m, { conn, text }) => {

try {

const stdout = execSync('git pull' + (m.fromMe && text ? ' ' + text : ''));
let messager = stdout.toString()

if (messager.includes('Already up to date')) messager = `🧡━━━━━━━━🧡
   ✅ 𝐘𝐀 𝐄𝐒𝐓𝐎𝐘 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐃𝐀 ✅
🧡━━━━━━━━🧡

╭─「 🐾 𝐄𝐒𝐓𝐀𝐃𝐎 」─╮
│
│ 😼 𝗘𝘀𝘁𝗼𝘆 𝗲𝗻 𝗹𝗮 𝘂𝗹𝘁𝗶𝗺𝗮 𝘃𝗲𝗿𝘀𝗶𝗼𝗻
│ 🍜 𝗱𝗲 𝗚𝗮𝗿𝗳𝗶𝗲𝗹𝗱 𝗣𝗿𝗲𝗺
│
╚━━━━━━━━━━╝

🐱 "𝗡𝗼 𝘁𝗲𝗻𝗴𝗼 𝗵𝗮𝗺𝗯𝗿𝗲 𝗱𝗲 𝗮𝗰𝘁𝘂𝗮𝗹𝗶𝘇𝗮𝗰𝗶𝗼𝗻𝗲𝘀" 🧡
`

if (messager.includes('Updating')) messager = `🧡━━━━━━━━🧡
   ⏳ 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐍𝐃𝐎 ⏳
🧡━━━━━━━━🧡

╭─「 🍜 𝐏𝐑𝐎𝐂𝐄𝐒𝐀𝐍𝐃𝐎 」─╮
│
│ 🐾 𝗘𝘀𝗽𝗲𝗿𝗮 𝘂𝗻 𝗺𝗼𝗺𝗲𝗻𝘁𝗼
│ 😼 𝗺𝗶𝗲𝗻𝘁𝗿𝗮𝘀 𝗺𝗲 𝗮𝗰𝘁𝘂𝗮𝗹𝗶𝘇𝗼
│
╚━━━━━━━━━━╝

${stdout.toString()}

😼 "𝗗𝗲𝗷𝗮 𝗾𝘂𝗲 𝘁𝗲𝗿𝗺𝗶𝗻𝗲 𝗺𝗶 𝘀𝗶𝗲𝘀𝘁𝗮" 🧡
`
conn.reply(m.chat, messager, m)

} catch { 
try {

const status = execSync('git status --porcelain')

if (status.length > 0) {
const conflictedFiles = status.toString().split('\n').filter(line => line.trim() !== '').map(line => {
if (line.includes('.npm/') || line.includes('.cache/') || line.includes('tmp/') || line.includes("lib/datos.json") || line.includes('database.json') || line.includes('sessions/') || line.includes('npm-debug.log')) {
return null
}
return '*→ ' + line.slice(3) + '*'}).filter(Boolean)
if (conflictedFiles.length > 0) {
const errorMessage = `🧡━━━━━━━━🧡
   ❌ 𝐍𝐎 𝐒𝐄 𝐏𝐔𝐄𝐃𝐄 𝐀𝐂𝐓𝐔𝐀𝐋𝐈𝐙𝐀𝐑 ❌
🧡━━━━━━━━🧡

╭─「 ⚠️ 𝐂𝐎𝐍𝐅𝐋𝐈𝐂𝐓𝐎 」─╮
│
│ 🐾 𝗛𝗮𝘆 𝗮𝗿𝗰𝗵𝗶𝘃𝗼𝘀 𝗲𝗻 𝗰𝗼𝗻𝗳𝗹𝗶𝗰𝘁𝗼
│ 🍜 𝗿𝗲𝘀𝘂𝗲𝗹𝘃𝗲𝗹𝗼𝘀 𝗽𝗿𝗶𝗺𝗲𝗿𝗼
│
╚━━━━━━━━━━╝

😼 "𝗢𝗱𝗶𝗼 𝗰𝘂𝗮𝗻𝗱𝗼 𝗽𝗮𝘀𝗮 𝗲𝘀𝘁𝗼" 🧡
`
await conn.reply(m.chat, errorMessage, m)
}
}
} catch (error) {
console.error(error)
let errorMessage2 = `🧡━━━━━━━━🧡
   ❌ 𝐄𝐑𝐎𝐑 𝐈𝐍𝐄𝐒𝐏𝐄𝐑𝐀𝐃𝐎 ❌
🧡━━━━━━━━🧡

╭─「 🐾 𝐃𝐄𝐓𝐀𝐋𝐄 」─╮
│ ${error.message}
│
╚━━━━━━━━━━╝

😼 "𝗛𝗮𝘀𝘁𝗮 𝗮 𝗺𝗶 𝗺𝗲 𝗱𝗮 𝗳𝗹𝗼𝗷𝗲𝗿𝗮 𝗮𝗿𝗲𝗴𝗹𝗮𝗿𝗹𝗼" 🧡
`
await conn.reply(m.chat, errorMessage2, m)
}
}

}

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = ['update', 'actualizar', 'up']
handler.owner = true

export default handler