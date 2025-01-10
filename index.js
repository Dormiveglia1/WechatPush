const { params } = require ('./src/config/config');
const { params1 } = require ('./src/config/config_test');
const { getToken } = require('./src/getToken');
const { sendMessage, sendMessage1 } = require('./src/sendMessage');
const { getDate, getLoveWords} = require('./src/utils');

function calculateDaysFromNow(targetDate) {
    // 目标日期转为 Date 对象
    const target = new Date(targetDate);
    // 当前日期时间戳
    const now = new Date();

    // 计算时间差，单位为毫秒
    const timeDiff = target - now;

    // 将时间差转换为天数，向下取整
    const daysDiff = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 1;

    return daysDiff;
}


const birthday = "2025-02-05";
const love_date = "2024-08-22";
const days_to_birthday = calculateDaysFromNow(birthday);
const days_to_love_date = Math.abs(calculateDaysFromNow(love_date));


const start = async () => {
    let access_token = await getToken(params);
    let loveWords = await getLoveWords();

    const data = {
        date:{
            value: getDate(),
            color: '#57E6E2',
        },
        love_day:{
            value: days_to_love_date,
            color: '#FF69B4'
        },
        birthday1:{
            value: days_to_birthday === 0 ? `生日就是今天！宝宝生日快乐！！！` : `距离宝宝生日还有 ${days_to_birthday} 天`,
            color: '#FFA500'
            },
        txt:{
            value:loveWords,
            color: '#3C4244'
        }
    }

    console.log(data);


    // sendMessage1({
    //     access_token,
    //     ...params1,
    //     data
    // })
    // .then(res => {
    //     console.log('响应结果:', res.data);
    //     console.log("Access Token:", access_token);
    //     console.log("OpenID:", params1.touser1);

    //     if (res.data && res.data.errcode) {
    //         console.error('发送失败:', res.data.errmsg || '未知错误');
    //         return;
    //     }
    //     console.log('发送成功 - 请在微信查看对应消息');
    // })
    // .catch(err => {
    //     console.error('发送失败，可能的原因:', err.message || err);
    // });
    

    sendMessage({
        access_token,
        ...params,
        data
    })
    .then(res =>{
        if (res.data && res.data.errcode){
            console.log('发送失败');
            return;
        }
        console.log("Access Token:", access_token);
        console.log("OpenID:", params.touser);
        console.log('发送成功 - 请在微信查看对应消息')
    })
    .catch(err =>{
        console.log('发送失败',err);
    })
}

start();