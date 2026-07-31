import crypto from "crypto"
import { FormData, Blob } from "formdata-node"
import { fileTypeFromBuffer } from "file-type"

let handler = async (m, { conn }) => {
  let q = m.quoted? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) return conn.reply(m.chat, `🧡━━━━━━━━🧡
   😼 **LU BOT PREM** 😼
🧡━━━━━━━━🧡

╭─「 ⚠️ **AVISO** 」─╮
│
│ 🐾 **Responde a un archivo**
│ 🍜 **Validos** : **Imagen, Video, Audio, Doc**
│
╚━━━━━━━━━━╝

😼 "**Ni Odie subiria eso**" 🧡
`, m)

  try {
    await conn.sendMessage(m.chat, { react: { text: '🍜', key: m.key } })

    let media = await q.download()
    let link = await myCloud(media)

    if (!link.success) throw new Error()

    let txt = `🧡━━━━━━━━🧡
   ☁️ **ARCHIVO SUBIDO** ☁️
🧡━━━━━━━━🧡

╭─「 🐾 **DETALLE** 」─╮
│
│ 🔗 **Enlace** : ${link.url}
│ 🆔 **ID** : ${link.id}
│ 📊 **Tamaño** : ${formatBytes(media.length)}
│ 🍜 **Servidor** : **Casa de Garfield**
│
╚━━━━━━━━━━╝

😼 "**Archivo guardado en el sofa junto a mi Lasaña**" 🧡
`

    await conn.sendFile(m.chat, media, 'garfield_' + link.url.split('.').pop(), txt, m)
    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } })
  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { react: { text: '❌', key: m.key } })
    await conn.reply(m.chat, `🧡━━━━━━━━🧡
   😼 **LU BOT PREM** 😼
🧡━━━━━━━━🧡

╭─「 ❌ **ERROR** 」─╮
│
│ 🐾 **No se pudo subir**
│ 🍜 **Intenta de nuevo**
│
╚━━━━━━━━━━╝

😼 "**Hasta a mi me da flojera**" 🧡
`, m)
  }
}

handler.help = ['upp', 'tourl'];
handler.tags = ['tools'];
handler.command = ['upp', 'tourl', 'nube'];

export default handler;

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