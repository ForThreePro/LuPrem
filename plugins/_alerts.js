let WAMessageStubType = (await import('@whiskeysockets/baileys')).default
import fs from 'fs'
import path from 'path'
import { getBotConfig } from '../lib/botconfig.js'

const lidCache = new Map()
let handler = m => m

handler.before = async function (m, { conn }) {
    if (!m.messageStubType ||!m.isGroup) return

    let chat = global.db.data.chats[m.chat]
    let userss = m.messageStubParameters?.[0]
    if (!userss) return

    const realSenderRaw = await resolveLidToRealJid(m?.sender, conn, m?.chat)
    const realSender = realSenderRaw?.includes('@')? realSenderRaw : null

    const userTag = `@${userss.split('@')[0]}`
    const adminTag = realSender? `@${realSender.split('@')[0]}` : 'SYSTEM'

    const mentions = [userss]
    if (realSender) mentions.push(realSender)

    const context = {
        contextInfo: {
            mentionedJid: mentions,
            isForwarded: true,
            forwardingScore: 999
        }
    }

    // 1. FOTO DEL USER > 2. FOTO DEL GRUPO > 3. DEFAULT GARFIELD
    let banner;
    try {
        banner = await conn.profilePictureUrl(userss, 'image')
    } catch {
        try {
            banner = await conn.profilePictureUrl(m.chat, 'image')
        } catch {
            banner = 'https://files.evogb.win/zocch8.jpg'
        }
    }

    // DISEÑO GARFIELD PROMOTE
    const admingp = `
🧡━━「 👑 𝐀𝐒𝐂𝐄𝐍𝐒𝐎 𝐃𝐄𝐋 𝐒𝐎𝐅𝐀 」━━🧡
║
║ 😼 𝗧𝗔𝗥𝗚𝗘𝗧 : ${userTag}
║ 🍜 𝗦𝗧𝗔𝗧𝗨𝗦 : ✅ 𝗥𝗔𝗡𝗚𝗢 𝗔𝗦𝗜𝗚𝗡𝗔𝗗𝗢
║ 🐾 𝗕𝗬 : ${adminTag}
║
╠━━「 𝐏𝐄𝐑𝐌𝐈𝐒𝐎𝐒 𝐃𝐄 𝐋𝐀𝐒𝐀𝐆𝐍𝐀 」━━╣
║ [✓] Expulsar / Promover
║ [✓] Editar Info Grupo
║ [✓] Cambiar Config
║ [✓] Anuncios
╚═══════════╝

😼 "𝙴𝚕 𝚙𝚘𝚍𝚎𝚛 𝚎𝚜 𝚙𝚊𝚛𝚊 𝚌𝚞𝚒𝚍𝚊𝚛 𝚕𝚊 𝚌𝚘𝚖𝚒𝚍𝚊"
`.trim()

    // DISEÑO GARFIELD DEMOTE
    const noadmingp = `
🧡━━「 🔒 𝐃𝐄𝐒𝐂𝐄𝐍𝐒𝐎 𝐃𝐄𝐋 𝐒𝐎𝐅𝐀 」━━🧡
║
║ 😼 𝗧𝗔𝗥𝗚𝗘𝗧 : ${userTag}
║ 🍜 𝗦𝗧𝗔𝗧𝗨𝗦 : ❌ 𝗥𝗔𝗡𝗚𝗢 𝗥𝗘𝗩𝗢𝗖𝗔𝗗𝗢
║ 🐾 𝗕𝗬 : ${adminTag}
║
╠━━「 𝐀𝐂𝐄𝐒𝐎 𝐃𝐄𝐍𝐄𝐆𝐀𝐃𝐎 」━━╣
║ [✗] Sin permisos de admin
║ [✗] Comandos bloqueados
║ [✗] Solo miembro del sofa
╚═══════════╝

🐱 "𝚂𝚒𝚗 𝚛𝚊𝚗𝚐𝚘, 𝚜𝚒𝚗 𝚕𝚊𝚜𝚊𝚐𝚗𝚊"
`.trim()

    // LIMPIAR SESSION SI KICKEAN BOT
    if (chat.detect && m.messageStubType == 2) {
        const uniqid = (m.isGroup? m.chat : m.sender).split('@')[0]
        const sessionPath = `./sessions/`
        try {
            for (const file of await fs.readdir(sessionPath)) {
                if (file.includes(uniqid)) {
                    await fs.unlink(path.join(sessionPath, file))
                }
            }
        } catch {}
    }

    // PROMOTE
    if (chat.alerts && m.messageStubType == 29) {
        await conn.sendMessage(m.chat, {
            image: { url: banner },
            caption: admingp,
      ...context
        }, { quoted: null })
        return
    }

    // DEMOTE
    if (chat.alerts && m.messageStubType == 30) {
        await conn.sendMessage(m.chat, {
            image: { url: banner },
            caption: noadmingp,
      ...context
        }, { quoted: null })
        return
    }

    if (m.messageStubType == 2) return
}

export default handler

async function resolveLidToRealJid(lid, conn, groupChatId, maxRetries = 3, retryDelay = 60000) {
    const inputJid = lid?.toString?.() || ''
    if (!inputJid.endsWith("@lid") ||!groupChatId?.endsWith("@g.us")) {
        return inputJid.includes("@")? inputJid : `${inputJid}@s.whatsapp.net`
    }

    if (lidCache.has(inputJid)) {
        return lidCache.get(inputJid)
    }

    const lidToFind = inputJid.split("@")[0]
    let attempts = 0

    while (attempts < maxRetries) {
        try {
            const metadata = await conn?.groupMetadata(groupChatId)
            if (!metadata?.participants) throw new Error()

            for (const participant of metadata.participants) {
                try {
                    if (!participant?.jid) continue
                    const contactDetails = await conn?.onWhatsApp(participant.jid)
                    if (!contactDetails?.[0]?.lid) continue

                    const possibleLid = contactDetails[0].lid.split("@")[0]
                    if (possibleLid === lidToFind) {
                        lidCache.set(inputJid, participant.jid)
                        return participant.jid
                    }
                } catch {}
            }
            lidCache.set(inputJid, inputJid)
            return inputJid
        } catch {
            if (++attempts >= maxRetries) {
                lidCache.set(inputJid, inputJid)
                return inputJid
            }
            await new Promise(r => setTimeout(r, retryDelay))
        }
    }
    return inputJid
}