import axios from 'axios'
import fetch from "node-fetch"
import yts from 'yt-search'

let handler = async (m, { conn, text, command, usedPrefix }) => {
    if (!text) return conn.reply(m.chat, `🧡━━「 🐾 𝐋𝐔 𝐁𝐎𝐓 𝐏𝐑𝐄𝐌 」━━🧡
║
║ 😼 𝗠𝗢𝗗𝗨𝗟𝗢 : 𝗗𝗘𝗦𝗖𝗔𝗥𝗚𝗔𝗦
║ 🍜 𝗘𝗦𝗧𝗔𝗗𝗢 : 𝗢𝗡𝗟𝗜𝗡𝗘
║
╠━━「 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 」━━╣
║ [1].play nombre → Audio
║ [2].play2 nombre → Video
║ [3].ytmp3 link → Audio Directo
║ [4].ytmp4 link → Video 720p
║
╠━━「 𝐒𝐎𝐂𝐈𝐀𝐋 」━━╣
║ [5].spotify nombre → Audio
║ [6].tiktok link → Video
║ [7].tiktoksearch txt → Buscar
║ [8].ig link → Instagram
║ [9].fb link → Facebook
║ [10].mediafire link → Archivo
║
╚━━「 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐆𝐀𝐑𝐅𝐈𝐄𝐋𝐃 」━━╝`, m)

    await m.react('⏳')
    const keyEvo = Buffer.from('ZWt1c2Fz', 'base64').toString('utf-8').split('').reverse().join('')
    const keySasuke = Buffer.from('c2FzdWtl', 'base64').toString('utf-8')

    try {
        // ===== PLAY / PLAY2 YOUTUBE BUSQUEDA =====
        if (/^(play|play2)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let isVideo = command === 'play2'
            let apiUrl = isVideo
           ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `🧡━━「 😼 𝐘𝐎𝐔𝐓𝐔𝐁𝐄 ${isVideo? '𝗩𝗜𝗗𝗘𝗢' : '𝗔𝗨𝗗𝗜𝗢'} 」━━🧡
║
║ 🍜 𝗧𝗜𝗧𝗨𝗟𝗢 : ${vid.title}
║ 🐾 𝗗𝗨𝗥𝗔𝗖𝗜𝗢𝗡 : ${vid.timestamp}
║ 😼 𝗔𝗨𝗧𝗢𝗥 : ${vid.author.name}
║ 🍜 𝗩𝗜𝗦𝗧𝗔𝗦 : ${vid.views.toLocaleString()}
║ 🐾 𝗙𝗢𝗥𝗠𝗔𝗧𝗢 : ${isVideo? 'MP4 720p' : 'MP3 320kbps'}
║
╚━━「 𝐄𝐗𝐓𝐑𝐀𝐘𝐄𝐍𝐃𝐎 𝐋𝐀𝐒𝐀𝐆𝐍𝐀 」━━╝`

            await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== YTMP3 / YTMP4 DIRECTO =====
        if (/^(ytmp3|ytmp4)$/i.test(command)) {
            let res = await yts(text)
            let vid = res.videos[0]
            if (!vid) throw 'YT_NOT_FOUND'

            await m.react('⏳')

            let isVideo = command === 'ytmp4'
            let apiUrl = isVideo
            ? `https://api.evogb.org/dl/ytmp4?url=${encodeURIComponent(vid.url)}&quality=720&key=${keySasuke}`
                : `https://api.evogb.org/dl/ytmp3?url=${encodeURIComponent(vid.url)}&key=${keySasuke}`

            let json = await (await fetch(apiUrl)).json()
            if (!json.status) throw 'YT_DL_ERROR'

            let cap = `🧡━━「 😼 𝐘𝐓 ${isVideo? '𝗩𝗜𝗗𝗘𝗢' : '𝗔𝗨𝗗𝗜𝗢'} 𝗗𝗜𝗥𝗘𝗖𝗧𝗢 」━━🧡
║
║ 🍜 𝗧𝗜𝗧𝗨𝗟𝗢 : ${vid.title}
║ 🐾 𝗙𝗢𝗥𝗠𝗔𝗧𝗢 : ${isVideo? 'MP4 720p' : 'MP3'}
║ 😼 𝗗𝗨𝗥𝗔𝗖𝗜𝗢𝗡 : ${vid.timestamp}
║ 🍜 𝗩𝗜𝗦𝗧𝗔𝗦 : ${vid.views.toLocaleString()}
║
╚━━「 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀 𝐈𝐍𝐈𝐂𝐈𝐀𝐃𝐀 」━━╝`

            await conn.sendMessage(m.chat, { image: { url: vid.thumbnail }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, {
                [isVideo? 'video' : 'audio']: { url: json.data.dl },
                mimetype: isVideo? 'video/mp4' : 'audio/mpeg',
                fileName: `${vid.title}.${isVideo? 'mp4' : 'mp3'}`
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== SPOTIFY =====
        if (/^(spotify)$/i.test(command)) {
            let searchRes = await fetch(`https://api.evogb.org/search/spotify?query=${encodeURIComponent(text)}&key=${keySasuke}`)
            let searchData = await searchRes.json()
            if (!searchData.status ||!searchData.result[0]) throw 'SP_NOT_FOUND'

            await m.react('🔍')
            await m.react('⏳')

            let song = searchData.result[0]
            let dlRes = await fetch(`https://api.evogb.org/dl/spotify?url=${encodeURIComponent(song.link)}&key=${keySasuke}`)
            let dlData = await dlRes.json()
            if (!dlData.status) throw 'SP_DL_ERROR'

            let cap = `🧡━━「 🎵 𝐒𝐏𝐎𝐓𝐈𝐅𝐘 」━━🧡
║
║ 😼 𝗧𝗜𝗧𝗨𝗟𝗢 : ${dlData.data.name}
║ 🍜 𝗔𝗥𝗧𝗜𝗦𝗧𝗔 : ${dlData.data.artist}
║ 🐾 𝗔𝗟𝗕𝗨𝗠 : ${dlData.data.album}
║ 😼 𝗗𝗨𝗥𝗔𝗖𝗜𝗢𝗡 : ${dlData.data.duration}
║ 🍜 𝗔𝗡𝗢 : ${dlData.data.year}
║
╚━━「 𝐌𝐔𝐒𝐈𝐂𝐀 𝐏𝐑𝐎𝐂𝐄𝐒𝐀𝐃𝐀 」━━╝`

            await conn.sendMessage(m.chat, { image: { url: dlData.data.image }, caption: cap }, { quoted: m })
            await conn.sendMessage(m.chat, { audio: { url: dlData.data.url }, mimetype: 'audio/mpeg', fileName: `${dlData.data.name}.mp3` }, { quoted: m })
            return await m.react('✅')
        }

        // ===== TIKTOK =====
        if (/^(tiktok|tiktoksearch)$/i.test(command)) {
            if (command === 'tiktoksearch') {
                let res = await (await fetch(`https://api.evogb.org/search/tiktok?query=${text}&key=${keySasuke}`)).json()
                let video = res.data[0]
                if (!video) throw 'TT_NOT_FOUND'

                let caption = `🧡━━「 😼 𝐓𝐈𝐊𝐓𝐎𝐊 𝐒𝐄𝐀𝐑𝐂𝐇 」━━🧡
║
║ 🍜 𝗧𝗜𝗧𝗨𝗟𝗢 : ${video.title}
║ 🐾 𝗔𝗨𝗧𝗢𝗥 : ${video.author.nickname}
║ 😼 𝗩𝗜𝗦𝗧𝗔𝗦 : ${video.play_count.toLocaleString()}
║ 🍜 𝗟𝗜𝗞𝗘𝗦 : ${video.digg_count.toLocaleString()}
║
╚━━「 𝐕𝐈𝐃𝐄𝐎 𝐄𝐍𝐂𝐎𝐍𝐓𝐑𝐀𝐃𝐎 」━━╝`
                await conn.sendFile(m.chat, video.dl, 'tiktok.mp4', caption, m)
            } else {
                let res = await (await fetch(`https://api.evogb.org/dl/tiktok?url=${text}&key=${keySasuke}`)).json()
                let data = res.data
                if (!data) throw 'TT_DL_ERROR'

                let caption = `🧡━━「 😼 𝐓𝐈𝐊𝐓𝐎𝐊 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃 」━━🧡
║
║ 🍜 𝗧𝗜𝗧𝗨𝗟𝗢 : ${data.title}
║ 🐾 𝗔𝗨𝗧𝗢𝗥 : ${data.author.nickname}
║
╚━━「 𝐃𝐄𝐒𝐂𝐀𝐑𝐆𝐀 𝐂𝐎𝐌𝐏𝐋𝐄𝐓𝐀 」━━╝`
                await conn.sendFile(m.chat, Array.isArray(data.dl)? data.dl[0] : data.dl, 'tiktok.mp4', caption, m)
            }
            return await m.react('✅')
        }

        // ===== INSTAGRAM =====
        if (/^(ig|instagram)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/instagram?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'IG_ERROR'
            let media = data.data[0]
            let type = media.type === 'video'? '𝗩𝗜𝗗𝗘𝗢' : '𝗜𝗠𝗔𝗚𝗘𝗡'

            let cap = `🧡━━「 📸 𝐈𝐍𝐒𝐓𝐀𝐆𝐑𝐀𝐌 」━━🧡
║
║ 😼 𝗧𝗜𝗣𝗢 : ${type}
║ 🍜 𝗘𝗦𝗧𝗔𝗗𝗢 : 𝗘𝗡𝗩𝗜𝗔𝗡𝗗𝗢
║
╚━━「 𝐂𝐎𝐍𝐓𝐄𝐍𝐈𝐃𝐎 𝐂𝐀𝐏𝐓𝐔𝐑𝐀𝐃𝐎 」━━╝`

            await conn.sendMessage(m.chat, {
                [media.type === 'video'? 'video' : 'image']: { url: media.url },
                mimetype: media.type === 'video'? 'video/mp4' : 'image/jpeg',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== FACEBOOK =====
        if (/^(fb|facebook)$/i.test(command)) {
            const { data } = await axios.get(`https://api.evogb.org/dl/facebook?url=${encodeURIComponent(text)}&key=${keyEvo}`)
            if (!data.status) throw 'FB_ERROR'
            let video = data.resultados[0]

            let cap = `🧡━━「 📘 𝐅𝐀𝐂𝐄𝐁𝐎𝐊 」━━🧡
║
║ 😼 𝗖𝗔𝗟𝗜𝗗𝗔𝗗 : ${video.calidad || '𝗛𝗗'}
║ 🍜 𝗘𝗦𝗧𝗔𝗗𝗢 : 𝗘𝗡𝗩𝗜𝗔𝗡𝗗𝗢
║
╚━━「 𝐕𝐈𝐃𝐄𝐎 𝐄𝐗𝐓𝐑𝐀𝐈𝐃𝐎 」━━╝`

            await conn.sendMessage(m.chat, {
                video: { url: video.url },
                mimetype: 'video/mp4',
                caption: cap
            }, { quoted: m })
            return await m.react('✅')
        }

        // ===== MEDIAFIRE =====
        if (/^(mediafire|mf|mediafiredl)$/i.test(command)) {
            let response = await fetch(`https://api.evogb.org/dl/mediafire?url=${encodeURIComponent(text)}&key=${keySasuke}`)
            let result = await response.json()
            if (!result.status ||!result.data) throw 'MF_ERROR'

            let { name, size, date, dl } = result.data
            let caption = `🧡━━「 📦 𝐌𝐄𝐃𝐈𝐀𝐅𝐈𝐑𝐄 」━━🧡
║
║ 😼 𝗡𝗢𝗠𝗕𝗥𝗘 : ${name}
║ 🍜 𝗧𝗔𝗠𝗔𝗡𝗢 : ${size}
║ 🐾 𝗙𝗘𝗖𝗛𝗔 : ${date}
║
╚━━「 𝐀𝐑𝐂𝐇𝐈𝐕𝐎 𝐄𝐗𝐓𝐑𝐀𝐈𝐃𝐎 」━━╝`

            await conn.sendFile(m.chat, dl, name, caption, m)
            return await m.react('✅')
        }

    } catch (e) {
        console.error(e)
        await m.react('❌')
        let msgs = {
            YT_NOT_FOUND: '𝗡𝗢 𝗦𝗘 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗢 𝗘𝗟 𝗩𝗜𝗗𝗘𝗢',
            YT_DL_ERROR: '𝗘𝗥𝗢𝗥 𝗘𝗡 𝗬𝗢𝗨𝗧𝗨𝗕𝗘',
            SP_NOT_FOUND: `𝗡𝗢 𝗛𝗔𝗬 𝗥𝗘𝗦𝗨𝗟𝗧𝗔𝗗𝗢𝗦: ${text}`,
            SP_DL_ERROR: '𝗘𝗥𝗢𝗥 𝗘𝗡 𝗦𝗣𝗢𝗧𝗜𝗙𝗬',
            TT_NOT_FOUND: '𝗡𝗢 𝗛𝗔𝗬 𝗥𝗘𝗦𝗨𝗟𝗧𝗔𝗗𝗢𝗦 𝗧𝗧',
            TT_DL_ERROR: '𝗘𝗥𝗢𝗥 𝗘𝗡 𝗧𝗜𝗞𝗧𝗢𝗞',
            IG_ERROR: '𝗘𝗥𝗢𝗥 𝗘𝗡 𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠',
            FB_ERROR: '𝗘𝗥𝗢𝗥 𝗘𝗡 𝗙𝗔𝗖𝗘𝗕𝗢𝗞',
            MF_ERROR: '𝗔𝗥𝗖𝗛𝗜𝗩𝗢 𝗡𝗢 𝗘𝗡𝗖𝗢𝗡𝗧𝗥𝗔𝗗𝗢'
        }
        m.reply(`🧡━━「 ❌ 𝐄𝐑𝐎𝐑 𝐃𝐄 𝐒𝐈𝐒𝐓𝐄𝐌𝐀 」━━🧡
║
║ 😼 𝗗𝗘𝗧𝗔𝗟𝗘 : ${msgs[e] || '𝗘𝗥𝗥𝗢𝗥 𝗜𝗡𝗘𝗦𝗣𝗘𝗥𝗔𝗗𝗢'}
║ 🍜 𝗔𝗖𝗜𝗢𝗡 : 𝗩𝗘𝗥𝗜𝗙𝗜𝗖𝗔𝗥 𝗘𝗡𝗟𝗔𝗖𝗘
║
╚━━「 𝐋𝐔 𝐁𝐎𝐓 𝐏𝐑𝐄𝐌 」━━╝`)
    }
}

handler.help = ['play', 'play2', 'ytmp3', 'ytmp4', 'spotify', 'tiktok', 'tiktoksearch', 'ig', 'fb', 'mediafire']
handler.tags = ['downloader']
handler.command = /^(play|play2|ytmp3|ytmp4|spotify|tiktok|tiktoksearch|ig|instagram|fb|facebook|mediafire|mf|mediafiredl)$/i

export default handler