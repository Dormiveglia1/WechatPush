// nodejs
// axios  (npm install axios --save)
// moment  (npm install moment --save)

const axios = require('axios');
const path = require('path');  //获取路径
const fs = require('fs');  //读写文件
const moment = require('moment');  //计算时间


// 1.读token.json看看有没有过期
// 2.没过期就直接返回token的值
// 3.过期了就请求公众号的接口，重新获取最新token
// 4.把获取的内容存到token,json里

const getToken = (params) => {
    return new Promise((resolve, reject) => {
        const tokenFile = path.join(__dirname,'token.json');
        //读文件
        fs.readFile(tokenFile, 'utf-8', function (err, data) {
            if (err) {
                reject(err);
            } else {
                if (data) {
                    const token = JSON.parse(data);
                    if (token.expires_in > moment().unix()){
                        resolve(token.access_token);
                        return;
                    }
                }
            }

            const appid =  params.appid;
            const secret = params.secret;

            axios.get(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`)
            .then(res => {
                if (res.data && res.data.errcode){
                    reject(data);
                    return;
                }
                resolve(res.data.access_token);
                // 存储
                const t = res.data;
                t.expires_in = t.expires_in + moment().unix() - 1200;
                fs.writeFile(tokenFile, JSON.stringify(t), function(err){
                    if (err) {
                        reject(err);
                    }
                })
            })  
        })
    })
};

module.exports = {
    getToken,
};