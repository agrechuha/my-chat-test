const moment = require('moment');

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a'),
    }
}

function formatDbMessage(message) {
    return {
        username: message.user.username,
        text: message.message,
        time: moment(message.createdAt).format('h:mm a'),
    }
}

module.exports = { formatMessage, formatDbMessage };