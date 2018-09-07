'use strcit';

const axios = require('axios')
const emailValidator = require("email-validator")

exports.slack = (message) => {
    let options = {
        method: 'post',
        baseURL: process.env.SLACK_URL,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        data: `payload={
            "text": "${message}",
        }`
    };
    return axios.request(options).then((result)=>{
        return result.data
    })
}

exports.handler = (event, context, callback) => {
    if (event.httpMethod !== 'POST' || !event.body) {
        callback(null, {
            statusCode: 404,
            body: ""
        })
        return
    }

    const data = JSON.parse(event.body);

    let error = []
    if (!data.name) error.push({ name: '氏名を入力して下さい' })
    if (!data.title) error.push({ title: 'タイトルを入力して下さい' })
    if (data.email && !emailValidator.validate(data.email)) error.push({ email: 'メールアドレスが正しくありません' })
    if (!data.body) error.push({ body: '問い合わせ内容を入力して下さい' })
    if (error.length) {
        callback(null, {
            statusCode: 400,
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ error: error })
        })
        return
    }

    const message = `
【 氏名 】
${data.name}

【 メールアドレス 】
${data.email}

【 タイトル 】
${data.title}

【 問い合わせ内容 】
${data.body}
`;

    exports.slack(message).then((result) => {
        callback(null, {
            statusCode: 200,
            body: ""
        })
    })
}
