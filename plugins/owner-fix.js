import fs from 'fs';
import path from 'path';

var handler = async (m, { conn }) => {

  const ignoredFolders = ['node_modules', '.git']
  const ignoredFiles = ['package-lock.json'];

  async function getAllJSFiles(dir) {
    let jsFiles = [];
    const items = fs.readdirSync(dir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(dir, item.name);

      if (ignoredFolders.includes(item.name) || ignoredFiles.includes(item.name)) continue;

      if (item.isDirectory()) {
        jsFiles = jsFiles.concat(await getAllJSFiles(fullPath));
      } else if (item.isFile() && fullPath.endsWith('.js')) {
        jsFiles.push(fullPath);
      }
    }
    return jsFiles
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: '😼', key: m.key } });
    conn.sendPresenceUpdate('composing', m.chat);

    const baseDir = path.resolve('./')
    const jsFiles = await getAllJSFiles(baseDir)

    let response = `🧡━━━━━━━━🧡
   🔍 𝐄𝐒𝐂𝐀𝐍𝐄𝐎 𝐆𝐀𝐑𝐅𝐈𝐄𝐋𝐃 🔍
🧡━━━━━━━━🧡

╭─「 🐾 𝐈𝐍𝐈𝐂𝐈𝐀𝐍𝐃𝐎 」─╮
│
│ 📁 𝗔𝗿𝗰𝗵𝗶𝘃𝗼𝘀 : ${jsFiles.length}
│ 🍜 𝗘𝘀𝘁𝗮𝗱𝗼 : 𝗔𝗻𝗮𝗹𝗶𝘇𝗮𝗻𝗱𝗼...
│
╚━━━━━━━━━━╝

`

    let hasErrors = false
    let errorCount = 0

    for (const file of jsFiles) {
      try {
        await import(`file://${file}?update=${Date.now()}`);
      } catch (error) {
        hasErrors = true;
        errorCount++
        response += `╭─「 ❌ 𝗘𝗥𝗢𝗥 #${errorCount} 」─╮\n`
        response += `│ 🐾 𝗔𝗿𝗰𝗵𝗶𝘃𝗼 : ${file.replace(baseDir + '/', '')}\n`
        response += `│ 😼 𝗗𝗲𝘁𝗮𝗹𝗲 : ${error.message.split('\n')[0]}\n`
        response += `╰─────────────────╯\n\n`
      }
    }

    if (!hasErrors) {
      response += `🧡━━━━━━━━🧡
   ✅ 𝐄𝐒𝐂𝐀𝐍𝐄𝐎 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐎 ✅
🧡━━━━━━━━🧡

╭─「 🍜 𝐑𝐄𝐒𝐔𝐋𝐓𝐀𝐃𝐎 」─╮
│
│ 🐾 𝗘𝗿𝗼𝗿𝗲𝘀 : 0
│ 😼 𝗘𝘀𝘁𝗮𝗱𝗼 : 𝗧𝗼𝗱𝗼 𝗲𝗻 𝗼𝗿𝗱𝗲𝗻
│
╚━━━━━━━━━━╝

🐱 "𝗡𝗶 𝘂𝗻 𝗽𝗲𝗹𝗼 𝗱𝗲 𝗢𝗱𝗶𝗲 𝗳𝘂𝗲𝗿𝗮 𝗱𝗲 𝗹𝘂𝗴𝗮𝗿" 🧡
`
    } else {
      response = `🧡━━━━━━━━🧡
   🔴 𝐄𝐒𝐂𝐀𝐍𝐄𝐎 𝐅𝐈𝐍𝐀𝐋𝐈𝐙𝐀𝐃𝐎 🔴
🧡━━━━━━━━🧡

╭─「 📊 𝐑𝐄𝐒𝐔𝐌𝐄𝐍 」─╮
│
│ 📁 𝗔𝗿𝗰𝗵𝗶𝘃𝗼𝘀 : ${jsFiles.length}
│ ❌ 𝗘𝗿𝗼𝗿𝗲𝘀 : ${errorCount}
│
╚━━━━━━━━━━╝

` + response
    }

    await conn.reply(m.chat, response, m);

    await conn.sendMessage(m.chat, {
      react: { text: hasErrors ? '❌' : '✅', key: m.key }
    });

  } catch (err) {
    conn.reply(m.chat, `🧡━━━━━━━━🧡
   😼 𝐋𝐔 𝐁𝐎𝐓 𝐏𝐑𝐄𝐌 😼
🧡━━━━━━━━🧡

╭─「 ❌ 𝐄𝐑𝐎𝐑 𝐂𝐑𝐈𝐓𝐈𝐂𝐎 」─╮
│
│ 🐾 ${err.message}
│
╚━━━━━━━━━━╝

😼 "𝗛𝗮𝘀𝘁𝗮 𝗮 𝗺𝗶 𝗺𝗲 𝗱𝗮 𝗳𝗹𝗼𝗷𝗲𝗿𝗮 𝗮𝗿𝗲𝗴𝗹𝗮𝗿𝗹𝗼" 🧡
`, m);
  }
}

handler.command = ['revsall', 'scan', 'chequeo'];
handler.help = ['revsall'];
handler.tags = ['owner'];
handler.owner = true;

export default handler;