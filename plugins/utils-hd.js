import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, File } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

let handler = async (m, { conn }) => {
  let q = m.quoted? m.quoted : m;
  let mime = (q.msg || q).mimetype || "";

  if (!mime) {
    return conn.reply(m.chat, `🧡━━━━━━━━🧡
   😼 𝐋𝐔 𝐁𝐎𝐓 𝐏𝐑𝐄𝐌 😼
🧡━━━━━━━━🧡

╭─「 ⚠️ 𝐀𝐕𝐈𝐒𝐎 」─╮
│
│ 🐾 𝗥𝗲𝘀𝗽𝗼𝗻𝗱𝗲 𝗮 𝘂𝗻𝗮 𝗶𝗺𝗮𝗴𝗲𝗻
│ 🍜 𝗽𝗮𝗿𝗮 𝗺𝗲𝗷𝗼𝗿𝗮𝗿𝗹𝗮 𝗮 𝗛𝗗
│
╚━━━━━━━━━━╝

😼 "𝗛𝗮𝘀𝘁𝗮 𝗹𝗮𝘀𝗮𝗴𝗻𝗮 𝗲𝗻 𝗛𝗗" 🧡
`, m);
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: "🍜", key: m.key } });

    const media = await q.download();
    const link = await uploadUguu(media);

    const upscaleUrl = `${global.api.url2}/ia/upscale?image=${encodeURIComponent(link)}`;

    const txt = `🧡━━━━━━━━🧡
   ✨ 𝐇𝐃 𝐔𝐏𝐒𝐂𝐀𝐋𝐄𝐑 ✨
🧡━━━━━━━━🧡

╭─「 🐾 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎 」─╮
│
│ 🍜 𝗧𝗮𝗺𝗮𝗻̃𝗼 : ${formatBytes(media.length)}
│ 😼 𝗖𝗮𝗹𝗶𝗱𝗮𝗱 : 𝗚𝗮𝗿𝗳𝗶𝗲𝗹𝗱 𝗣𝗿𝗲𝗺𝗶𝘂𝗺
│
╚━━━━━━━━━━╝

🐱 "𝗔𝗵𝗼𝗿𝗮 𝘀𝗲 𝘃𝗲 𝗺𝗮𝘀 𝗿𝗶𝗰𝗮 𝗹𝗮 𝗹𝗮𝘀𝗮𝗻̃𝗮" 🧡
`;

    await conn.sendFile(m.chat, upscaleUrl, "garfield_hd.jpg", txt, m);

    await conn.sendMessage(m.chat, { react: { text: "✅", key: m.key } });
  } catch (e) {
    console.error(e);
    await conn.sendMessage(m.chat, { react: { text: "❌", key: m.key } });
    m.reply(`🧡━━━━━━━━🧡
   😼 𝐋𝐔 𝐁𝐎𝐓 𝐏𝐑𝐄𝐌 😼
🧡━━━━━━━━🧡

╭─「 ❌ 𝐄𝐑𝐎𝐑 」─╮
│
│ 🐾 𝗘𝗿𝗼𝗿 𝗮𝗹 𝗽𝗿𝗼𝗰𝗲𝘀𝗮𝗿
│ 🍜 𝗗𝗲𝘁𝗮𝗹𝗲 : ${e.message}
│
╚━━━━━━━━━━╝

😼 "𝗛𝗮𝘀𝘁𝗮 𝗮 𝗺𝗶 𝗺𝗲 𝗱𝗮 𝘀𝘂𝗲𝗻̃𝗼" 🧡
`);
  }
};

handler.help = ["hd"];
handler.tags = ["tools"];
handler.command = ["hd", "remini", "mejorar"];

export default handler;

function formatBytes(bytes) {
  if (!bytes) return "0 B";
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

async function uploadUguu(buffer) {
  const type = await fileTypeFromBuffer(buffer);

  if (!type) throw new Error("No se pudo detectar el tipo de archivo.");

  const form = new FormData();
  form.set(
    "files[]",
    new File(
      [buffer],
      `garfield_${crypto.randomBytes(6).toString("hex")}.${type.ext}`,
      { type: type.mime }
    )
  );

  const res = await fetch("https://uguu.se/upload.php", {
    method: "POST",
    body: form,
    headers: form.headers
  });

  const json = await res.json();

  if (!res.ok) throw new Error(json.message || "Error al subir el archivo.");
  if (!json.success ||!json.files?.length) throw new Error("La subida falló.");

  return json.files[0].url;
}