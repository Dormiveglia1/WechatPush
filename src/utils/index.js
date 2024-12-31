const axios = require('axios')

// 1.获取日期时间
//处理星期
const formatWeek = (week) => {
    switch (week) {
        case 0:
            return '星期日';
        case 1:
            return '星期一';
        case 2:
            return '星期二';
        case 3:
            return '星期三';
        case 4:
            return '星期四';
        case 5:
            return '星期五';
        case 6:
            return '星期六';
        default:
            break;
    }
}
const getDate = () =>{
    // xxxx年xx月xx日 星期x
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const week = new Date().getDay();

    return `今天是${year}年${month}月${day}日 ${formatWeek(week)}`
    
}

// //2.获取天气
// const getWeather = () => {
//     return new Promise((resolve, reject) =>{
//         axios.get('http://v1.yiketianqi.com/free/month?unescape=1&appid=94333229&appsecret=NZZWN285&cityid=101090201')
//         .then(res =>{
//             const { data } = res;
//             // console.log(data);
//             resolve({
//                 low: data[0].tem_night,
//                 high: data[0].tem_day
//             })
//             console.log(`今天的最高温度是${data[0].tem_day}，最低温度是${data[0].tem_night}`);
//         })
//         .catch(err => {
//             reject(err);
//         })
//     })
// } 
// getWeather();

//3.获取土味情话
const getLoveWords = () => {
    return new Promise((resolve, reject) =>{
        axios.get('https://apis.tianapi.com/saylove/index?key=bbb2f6626e49602a90d473265eb30d72')
        .then(res =>{
            const { data: { result } } = res;
            resolve(result.content)
        })
        .catch(err => {
            reject(err);
        })
    })
}

// console.log(getDate());
module.exports = {
    getDate,
    getLoveWords
}
