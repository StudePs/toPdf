const moment = require("moment");


const organizer = (history) => {
    const formatMsg = (sender, msg, time) => {
        return {
            sender,
            msg,
            time: moment(time).format('MMMM Do YYYY, h:mm:ss a')
        }
    }
    const timeLine = [];
    history.forEach(eventTime => {
        if (eventTime.sender === 'user') {
            if (typeof(eventTime.message) == 'string' || Object.keys(eventTime.message)[0] == 'text') {
                if (typeof(eventTime.message) == 'string') {
                     timeLine.push(formatMsg('user', eventTime.message, eventTime.time))
                } else {
                    timeLine.push(formatMsg('user', eventTime.message.text, eventTime.time))
                }
            }
            else if (Object.keys(eventTime.message)[0] == 'file') {
                let aux = `<a href= '${eventTime.message.file.url}' target='_blanck'>${eventTime.message.file.url}</a>`;
                timeLine.push(formatMsg('user', aux, eventTime.time))
            }
        } else {
            if (typeof(eventTime.message) == 'string' || Object.keys(eventTime.message)[0] == 'text') {
                if (typeof(eventTime.message) == 'string') {
                     timeLine.push(formatMsg('bot', eventTime.message, eventTime.time))
                } else {
                    timeLine.push(formatMsg('bot', eventTime.message.text, eventTime.time))
                }
            } else {
                eventTime.message.forEach(msg => {
                    if (msg.default.type === 'text') {
                        timeLine.push(formatMsg('bot', msg.default.text, eventTime.time))
                    }
                    else if (msg.default.type === 'select') {
                        let aux = `${msg.default.payload.pick}<br> <ol>`;
                        msg.default.payload.options.forEach(option => {
                            aux =  aux + `<li>${option.title}</li>`
                        })
                        aux = aux + ` </ol>`
                        timeLine.push(formatMsg('bot', aux, eventTime.time))
                    }
                    else if (msg.default.type === 'quick_replies') {
                        let aux = `${msg.default.payload.pick}<br> <ol>`;
                        msg.default.payload.replies.forEach(option => {
                            aux =  aux + `<li>${option.title}</li>`
                        })
                        aux = aux + ` </ol>`
                        timeLine.push(formatMsg('bot', aux, eventTime.time))
                    }
                })
            }
        }
    });
    return timeLine;
};

module.exports = { organizer }