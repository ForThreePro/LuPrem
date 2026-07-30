let handler = async (m, { conn, command, text }) => {
    if(!m.isGroup) return m.reply('🧡 Solo funciona en grupos 😼')

    let metadata = await conn.groupMetadata(m.chat)
    let users = metadata.participants.map(u => u.id)
    let porcentaje = Math.floor(Math.random() * 101)

    const BOX_TOP = `🧡━━「 🐾 𝐋𝐔 𝐒𝐘𝐒𝐓𝐄𝐌 」━━🧡`
    const BOX_BOT = `╚━━「 𝐒𝐎𝐅𝐀 𝐀𝐂𝐓𝐈𝐕𝐎 」━━╝`

    const frasesDuo = ["Duo de lasagna 🍜","Juntos somos un peligro 😼","El duo que se roba la comida 💥","Duo de siesta nivel dios 😴","Dinamita con queso 🧨","El mejor duo del sofa 👑"]
    const frasesBro = ['"Oe mano pásame lasagna"','"Ya pe no seas malo"','"Después te pago juro"','"Invítame tu comida"']
    const frasesPerro = ['Te dice "amor" y a 3 gatos más','Huele a croquetas ajenas','Te deja en visto por dormir','Come lasagna sin ti']

    // RANDOM SIN REPETIR
    function getRandomUsers(cantidad) {
        let shuffled = [...users].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, cantidad)
    }

    function jidToTag(jid) {
        return '@' + jid.split('@')[0]
    }

    function findUserByName(name) {
        name = name.toLowerCase().replace('@','')
        return users.find(u => {
            let num = u.split('@')[0].toLowerCase()
            return num.includes(name)
        })
    }

    let txt = ''
    let mentions = []

    // SOLO PARA COMANDOS DE 1 PERSONA
    let target = m.mentionedJid[0] || m.quoted?.sender
    if(!target && text &&!['2p2','3p3','duo'].includes(command.toLowerCase())) {
        let possibleName = text.split(' ')[0]
        target = findUserByName(possibleName)
    }

    if(!target &&!['2p2','3p3','duo'].includes(command.toLowerCase()))
        return m.reply(`🧡━━「 ⚠️ 𝐄𝐑𝐑𝐎𝐑 」━━🧡
║
║ 😼 𝗨𝗦𝗢 :.${command} @tag
║ 🍜 𝗘𝗝𝗘𝗠𝗣𝗟𝗢 :.${command} @Juan
║ 🐾 𝗔𝗟𝗧 : 𝗥𝗲𝘀𝗽𝗼𝗻𝗱𝗲 +.${command}
║
╚━━「 𝐋𝐔 𝐒𝐘𝐒𝐓𝐄𝐌 」━━╝`)

    let cmd = command.toLowerCase().replace(' ','') // quita espacios

    switch(cmd) {
        // ========== FLIRT ==========
        case 'miamor':
            mentions = [target]
            txt = `${BOX_TOP}
║ 😼 𝗠𝗢𝗗𝗨𝗟𝗢 : 𝗔𝗠𝗢𝗥 𝗗𝗘 𝗟𝗔𝗦𝗔𝗚𝗡𝗔
║
║ 🐾 𝗧𝗔𝗥𝗚𝗘𝗧 : ${jidToTag(target)}
║ 🍜 𝗡𝗜𝗩𝗘𝗟 : ${porcentaje}%
║ 💬 𝗗𝗜𝗔𝗚𝗡𝗢𝗦𝗧𝗜𝗖𝗢 : ${porcentaje > 70? '𝗔𝗹𝗺𝗮𝘀 𝗚𝗲𝗺𝗲𝗹𝗮𝘀' : porcentaje > 40? '𝗛𝗮𝘆 𝗤𝘂𝗶𝗺𝗶𝗰𝗮' : '𝗙𝗿𝗶𝗼 𝗖𝗼𝗺𝗼 𝗥𝗲𝗳𝗿𝗶'}
${BOX_BOT}`
            break

        case 'mibebito':
            mentions = [target]
            txt = `${BOX_TOP}
║ 😼 𝗠𝗢𝗗𝗨𝗟𝗢 : 𝗕𝗘𝗕𝗘𝗧𝗢 𝗗𝗘𝗧𝗘𝗖𝗧𝗔𝗗𝗢
║
║ 🐾 𝗧𝗔𝗥𝗚𝗘𝗧 : ${jidToTag(target)} 😏
║ 🍜 𝗡𝗜𝗩𝗘𝗟 : ${porcentaje}%
${BOX_BOT}`
            break

        case 'bratz':
            mentions = [target]
            txt = `${BOX_TOP}
║ 😼 𝗠𝗢𝗗𝗨𝗟𝗢 : 𝗚𝗔𝗧𝗔 𝗕𝗥𝗔𝗧𝗭
║
║ 🐾 𝗧𝗔𝗥𝗚𝗘𝗧 : ${jidToTag(target)}
║ 🍜 𝗡𝗜𝗩𝗘𝗟 : ${porcentaje}%
${BOX_BOT}`
            break

        case 'bellaka':
            mentions = [target]
            txt = `${BOX_TOP}
║ 😼 𝗠𝗢𝗗𝗨𝗟𝗢 : 𝗕𝗘𝗟𝗟𝗔𝗞𝗔 𝗗𝗘𝗟 𝗦𝗢𝗙𝗔
║
║ 🐾 𝗧𝗔𝗥𝗚𝗘𝗧 : ${jidToTag(target)}
║ 🍜 𝗣𝗘𝗥𝗘𝗢 : ${porcentaje}%
${BOX_BOT}`
            break

        // ========== TROLO ==========
        case 'brother':
            mentions = [target]
            txt = `${BOX_TOP}
║ 😼 𝗠𝗢𝗗𝗨𝗟𝗢 : 𝗙𝗥𝗔𝗦𝗘 𝗣𝗜𝗧𝗨𝗙𝗢
║
║ 🐾 𝗧𝗔𝗥𝗚𝗘𝗧 : ${jidToTag(target)}
║ 🍜 𝗙𝗥𝗔𝗦𝗘 : ${frasesBro[Math.floor(Math.random()*4)]}
${BOX_BOT}`
            break

        case 'perroinfiel':
            mentions = [target]
            txt = `${BOX_TOP}
║ 😼 𝗠𝗢𝗗𝗨𝗟𝗢 : 𝗣𝗘𝗥𝗢 𝗜𝗡𝗙𝗜𝗘𝗟
║
║ 🐾 𝗧𝗔𝗥𝗚𝗘𝗧 : ${jidToTag(target)}
║ 🍜 𝗘𝗩𝗜𝗗𝗘𝗡𝗖𝗜𝗔 : ${frasesPerro[Math.floor(Math.random()*4)]}
║ 💬 𝗡𝗜𝗩𝗘𝗟 : ${porcentaje}%
${BOX_BOT}`
            break

        case 'mentiroso': case 'mentiras':
            mentions = [target]
            txt = `${BOX_TOP}
║ 😼 𝗠𝗢𝗗𝗨𝗟𝗢 : 𝗠𝗘𝗡𝗧𝗜𝗥𝗢𝗦𝗢 𝗗𝗘𝗧𝗘𝗖𝗧𝗔𝗗𝗢
║
║ 🐾 𝗧𝗔𝗥𝗚𝗘𝗧 : ${jidToTag(target)}
║ 🍜 𝗙𝗥𝗔𝗦𝗘 : "𝗧𝗲 𝗹𝗼 𝗷𝘂𝗿𝗼 𝗽𝗼𝗿 𝗺𝗶 𝗹𝗮𝘀𝗮𝗴𝗻𝗮"
║ 💬 𝗡𝗜𝗩𝗘𝗟 : ${porcentaje}%
${BOX_BOT}`
            break

        // ========== GRUPALES RANDOM ==========
        case '2p2': // 4 PERSONAS = 2 PAREJAS
            if(users.length < 4) return m.reply('🧡 Mínimo 4 michis en el grupo 😼')
            let cuatro = getRandomUsers(4)
            mentions = cuatro
            txt = `${BOX_TOP}
║ 😼 𝗠𝗢𝗗𝗨𝗟𝗢 : 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 2𝗣2
║
║ 🍜 𝗣𝗔𝗥𝗘𝗝𝗔 1 : ${jidToTag(cuatro[0])} ❤️ ${jidToTag(cuatro[1])}
║ 🍜 𝗣𝗔𝗥𝗘𝗝𝗔 2 : ${jidToTag(cuatro[2])} ❤️ ${jidToTag(cuatro[3])}
║
║ 💬 𝗖𝗢𝗠𝗣𝗔𝗧𝗜𝗕𝗜𝗟𝗜𝗗𝗔𝗗 : ${porcentaje}%
${BOX_BOT}`
            break

        case '3p3': // 6 PERSONAS = 3 PAREJAS
            if(users.length < 6) return m.reply('🧡 Mínimo 6 michis en el grupo 😼')
            let seis = getRandomUsers(6)
            mentions = seis
            txt = `${BOX_TOP}
║ 😼 𝗠𝗢𝗗𝗨𝗟𝗢 : 𝗦𝗜𝗦𝗧𝗘𝗠𝗔 3𝗣3
║
║ 🍜 𝗣𝗔𝗥𝗘𝗝𝗔 1 : ${jidToTag(seis[0])} ❤️ ${jidToTag(seis[1])}
║ 🍜 𝗣𝗔𝗥𝗘𝗝𝗔 2 : ${jidToTag(seis[2])} ❤️ ${jidToTag(seis[3])}
║ 🍜 𝗣𝗔𝗥𝗘𝗝𝗔 3 : ${jidToTag(seis[4])} ❤️ ${jidToTag(seis[5])}
║
║ 💬 𝗖𝗢𝗠𝗣𝗔𝗧𝗜𝗕𝗜𝗟𝗜𝗗𝗔𝗗 : ${porcentaje}%
${BOX_BOT}`
            break

        case 'duo': // 2 PERSONAS = 1 PAREJA
            if(users.length < 2) return m.reply('🧡 Mínimo 2 michis en el grupo 😼')
            let dos = getRandomUsers(2)
            mentions = dos
            let frase = frasesDuo[Math.floor(Math.random() * frasesDuo.length)]
            txt = `${BOX_TOP}
║ 😼 𝗠𝗢𝗗𝗨𝗟𝗢 : 𝗗𝗨𝗢 𝗥𝗔𝗡𝗗𝗢𝗠
║
║ 🐾 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 1 : ${jidToTag(dos[0])}
║ 🐾 𝗨𝗦𝗨𝗔𝗥𝗜𝗢 2 : ${jidToTag(dos[1])}
║
║ 🍜 𝗥𝗘𝗦𝗨𝗟𝗧𝗔𝗗𝗢 : ${frase}
║ 💬 𝗖𝗢𝗠𝗣𝗔𝗧𝗜𝗕𝗜𝗟𝗜𝗗𝗔𝗗 : ${porcentaje}%
${BOX_BOT}`
            break

        default:
            return
    }

    if(txt) await conn.sendMessage(m.chat, {
        text: txt,
        mentions: mentions // SOLO ETIQUETA A LOS QUE SALIERON
    }, { quoted: m })
}

handler.help = ['miamor','mibebito','bratz','bellaka','brother','perroinfiel','mentiroso','2p2','3p3','duo']
handler.tags = ['joda']
handler.command = /^(miamor|mi amor|mibebito|bratz|bellaka|brother|perroinfiel|perro infiel|mentiroso|mentiras|2p2|3p3|duo)$/i
handler.group = true
export default handler