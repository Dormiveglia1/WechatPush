const axios = require('axios');
const { params } = require('../config/config');
const { params1 } = require('../config/config_test');


const sendMessage = (params) => {
    const {access_token, touser, template_id, data = {}} = params;
    return axios.post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`,
        {
            touser,
            template_id,
            data,
        })
};


const sendMessage1 = (params1) => {
    const {access_token, touser1, template_id, data = {}} = params1;
    return axios.post(`https://api.weixin.qq.com/cgi-bin/message/template/send?access_token=${access_token}`,
        {
            touser1,
            template_id,
            data,
        })
};


module.exports = {
    sendMessage,
    sendMessage1
};