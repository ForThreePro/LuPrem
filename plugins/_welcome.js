import { WAMessageStubType } from '@whiskeysockets/baileys';

export async function before(m, { conn, participants, groupMetadata }) {
    if (!m.messageStubType ||!m.isGroup) return true;

    const chat = global.db.data.chats[m.chat];
    if (!chat.welcome) return true;

    const target = m.messageStubParameters?.[0];
    if (!target) return true;

    const userData = global.db.data.users[target] || {};
    const targetName = userData.name || await conn.getName(target) || `@${target.split('@')[0]}`;

    const actor = m.participant || m.key.participant || m.messageStubParameters?.[1] || null;

    let memberCount = participants.length;
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) memberCount++;
    if ([WAMessageStubType.GROUP_PARTICIPANT_REMOVE, WAMessageStubType.GROUP_PARTICIPANT_LEAVE].includes(m.messageStubType)) memberCount--;

    const actionText = {
        [WAMessageStubType.GROUP_PARTICIPANT_ADD]:
            actor? `𝗥𝗲𝗰𝗹𝘂𝘁𝗮𝗱𝗼 𝗽𝗼𝗿 @${actor.split('@')[0]}` : '𝗟𝗹𝗲𝗴𝗼 𝗽𝗼𝗿 𝗹𝗮 𝗹𝗮𝘀𝗮𝗴𝗻𝗮',

        [WAMessageStubType.GROUP_PARTICIPANT_REMOVE]:
            actor? `𝗘𝗰𝗵𝗮𝗱𝗼 𝗽𝗼𝗿 @${actor.split('@')[0]}` : '𝗦𝗮𝗹𝗶𝗼 𝗱𝗲𝗹 𝘀𝗼𝗳𝗮',

        [WAMessageStubType.GROUP_PARTICIPANT_LEAVE]:
            '𝗦𝗲 𝗳𝘂𝗲 𝗮 𝗱𝗼𝗿𝗺𝗶𝗿 𝘀𝗶𝗲𝘀𝘁𝗮'
    };

    const format = (text) => {
        return text
       .replace('@user', `@${target.split('@')[0]}`)
       .replace('@name', targetName)
       .replace('@group', groupMetadata.subject)
       .replace('@desc', groupMetadata.desc?.toString() || '𝗦𝗶𝗻 𝗱𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶𝗼𝗻')
       .replace('%users', memberCount)
       .replace('@action', actionText[m.messageStubType] || '')
       .replace('@date', new Date().toLocaleString('es-PE'));
    };

    // DETECTAR SI TIENE FOTO O NO
    let ppUrl;
    try {
        ppUrl = await conn.profilePictureUrl(target, 'image');
    } catch {
        // Si no tiene foto, usa banner de Garfield
        ppUrl = 'https://files.evogb.win/zocch8.jpg'
    }

    const welcome = format(`
🧡━━━━━━━━🧡
   😼 𝐍𝐔𝐄𝐕𝐎 𝐌𝐈𝐀𝐔 𝐄𝐍 𝐄𝐋 𝐒𝐎𝐅𝐀 😼
🧡━━━━━━━━🧡

🐾 𝗡𝗼𝗺𝗯𝗿𝗲 : @name
🍜 𝗚𝗿𝘂𝗽𝗼 : @group

📡 𝗘𝘀𝘁𝗮𝗱𝗼 : @action

╭─「 🐾 𝐈𝐍𝐅𝐎 𝐃𝐄𝐋 𝐒𝐎𝐅𝐀 」─╮
│
│ 📜 𝗗𝗲𝘀𝗰 : @desc
│ 👥 𝗠𝗶𝗲𝗺𝗯𝗿𝗼𝘀 : %users
│ ⚠️ 𝗔𝘃𝗶𝘀𝗼 : 𝗟𝗲𝗲 𝗹𝗮𝘀 𝗿𝗲𝗴𝗹𝗮𝘀 𝗼 𝘀𝗶𝗻 𝗹𝗮𝘀𝗮𝗴𝗻𝗮
│
╚━━━━━━━━━━╝

😼 "𝗕𝗶𝗲𝗻𝘃𝗲𝗻𝗶𝗱𝗼. 𝗡𝗼 𝘁𝗼𝗾𝘂𝗲𝘀 𝗺𝗶 𝗰𝗼𝗺𝗶𝗱𝗮" 🧡
`.trim());

    const bye = format(`
🧡━━━━━━━━🧡
   🔻 𝐔𝗡 𝗠𝗜𝗔𝗨 𝗠𝗘𝗡𝗢𝗦 𝗘𝗡 𝗘𝗟 𝗦𝗢𝗙𝗔 🔻
🧡━━━━━━━━🧡

🐾 𝗡𝗼𝗺𝗯𝗿𝗲 : @name
🍜 𝗚𝗿𝘂𝗽𝗼 : @group

📡 𝗘𝘀𝘁𝗮𝗱𝗼 : @action

╭─「 🍜 𝐑𝐄𝗣𝗢𝗥𝗧𝗘 」─╮
│
│ 👥 𝗠𝗶𝗲𝗺𝗯𝗿𝗼𝘀 𝗔𝗰𝘁𝘂𝗮𝗹𝗲𝘀 : %users
│ 🕐 𝗦𝗮𝗹𝗶𝗱𝗮 : @date
│
╚━━━━━━━━━━╝

🐱 "𝗦𝗲 𝗳𝘂𝗲... 𝗮𝗵𝗼𝗿𝗮 𝗵𝗮𝘆 𝗺𝗮𝘀 𝗹𝗮𝘀𝗮𝗴𝗻𝗮 𝗽𝗮𝗿𝗮 𝗺𝗶" 🧡
`.trim());

    const mentions = [target];
    if (actor) mentions.push(actor);

    const context = {
        contextInfo: {
            mentionedJid: mentions,
            isForwarded: true
        }
    };

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
        await conn.sendMessage(m.chat, {
            image: { url: ppUrl },
            caption: welcome,
       ...context
        });
    }

    if ([WAMessageStubType.GROUP_PARTICIPANT_LEAVE, WAMessageStubType.GROUP_PARTICIPANT_REMOVE].includes(m.messageStubType)) {
        await conn.sendMessage(m.chat, {
            image: { url: ppUrl },
            caption: bye,
       ...context
        });
    }
}