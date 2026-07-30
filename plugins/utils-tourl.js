import crypto from "crypto"
import { FormData, Blob } from "formdata-node"
import { fileTypeFromBuffer } from "file-type"

let handler = async (m, { conn }) => {
  let q = m.quoted? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) return conn.reply(m.chat, `🧡━━━━━━━━🧡
   😼 𝐋𝐔 𝐁𝐎𝐓 𝐏𝐑𝐄𝐌 😼
🧡━━━━━━━━🧡

╭─「 ⚠️ 𝐀𝐕𝐈𝐒𝐎 」─╮
│
│ 🐾 𝗥𝗲𝘀𝗽𝗼𝗻𝗱𝗲 𝗮 𝘂𝗻 𝗮𝗿𝗰𝗵𝗶𝘃𝗼
│ 🍜 𝗩𝗮𝗹𝗶𝗱𝗼𝘀 : 𝗜𝗺𝗮𝗴𝗲𝗻, 𝗩𝗶𝗱𝗲𝗼, 𝗔𝘂𝗱𝗶𝗼, 𝗗𝗼𝗰
│
╚━━━━━━━━━━╝

😼 "𝗡𝗶 𝗢𝗱𝗶𝗲 𝘀𝘂𝗯𝗶𝗿𝗶𝗮 𝗲𝘀𝗼" 🧡
`, m)

  try {
    await conn.sendMessage(m.chat, { react: { text: '🍜', key: m.key } })

    let media = await q.download()
    let link = await myCloud(media)

    if (!link.success) throw new Error()

    let txt = `🧡━━━━━━━━🧡
   ☁️ 𝐀𝐑𝐂𝐇𝐈𝐕𝐎 𝐒𝐔𝐁𝐈𝐃𝐎 ☁️
🧡━━━━━━━━🧡

╭─「 🐾 𝐃𝐄𝐓𝐀𝐋𝐄 」─╮
│
│ 🔗 𝗘𝗻𝗹𝗮𝗰𝗲 : ${link.url}
│ 🆔 𝗜𝗗 : ${link.id}
│ 📊 𝗧𝗮𝗺𝗮𝗻̃𝗼 : ${formatBytes(media.length)}
│ 🍜 𝗦𝗲𝗿𝘃𝗶𝗱𝗼𝗿 : 𝗖𝗮𝘀𝗮 𝗱𝗲 𝗚𝗮𝗿𝗳𝗶𝗲𝗹𝗱
│
╚━━━━━━━━━━╝

😼 "𝗔𝗿𝗰𝗵𝗶𝘃𝗼 𝗴𝘂𝗮𝗿𝗱𝗮𝗱𝗼 𝗲𝗻 𝗲𝗹 𝘀𝗼𝗳𝗮" 🧡
`

    await conn.sendFile(m.chat, media, 'garfield_' + link.url.split('.').pop(), txt, m)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    await conn.reply(m.chat, `🧡━━━━━━━━🧡
   😼 𝐋𝐔 𝐁𝐎𝐓 𝐏𝐑𝐄𝐌 😼
🧡━━━━━━━━🧡

╭─「 ❌ 𝐄𝐑𝐎𝐑 」─╮
│
│ 🐾 𝗡𝗼 𝘀𝗲 𝗽𝘂𝗱𝗼 𝘀𝘂𝗯𝗶𝗿
│ 🍜 𝗜𝗻𝘁𝗲𝗻𝘁𝗮 𝗱𝗲 𝗻𝘂𝗲𝘃𝗼
│
╚━━━━━━━━━━╝

😼 "𝗛𝗮𝘀𝘁𝗮 𝗮 𝗺𝗶 𝗺𝗲 𝗱𝗮 𝗳𝗹𝗼𝗷𝗲𝗿𝗮" 🧡
`, m)
  }
}

handler.help = ['upp', 'tourl']
handler.tags = ['tools']
handler.command = ['upp', 'tourl', 'nube']

export default handler

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(1024))
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`
}

async function myCloud(content) {
  const fileType = await fileTypeFromBuffer(content)
  const ext = fileType ? fileType.ext : 'bin'
  const mime = fileType ? fileType.mime : 'application/octet-stream'

  const formData = new FormData()
  const blob = new Blob([content], { type: mime })
  const fileName = `garfield_${crypto.randomBytes(5).toString("hex")}.${ext}`

  formData.append("file", blob, fileName)

  const response = await fetch("https://evogb.win/api/upload", {
    method: "POST",
    body: formData
  })

  if (!response.ok) throw new Error()

  return await response.json()
}