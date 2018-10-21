import originJsonp from "jsonp"

let jsonp = (url, data, option) => {
    return new Promise((resolve, reject) => {
        originJsonp(buildUrl(url, data), option, (err, data) => {
            if (!err) {
                resolve(data);
            } else {
                reject(err);
            }
        });
    });
};

/**
 * 将data设置到url后面url?da=xx&fe=yy
 * 
 * @param {String} url 
 * @param {Object} data 
 */
function buildUrl(url, data) {
    console.log('jsonp', url, data)
    let params = [];
    for (var k in data) {
        params.push(`${k}=${data[k]}`);
    }
    let param = params.join("&");
    if (url.indexOf("?") === -1) {
        url += "?" + param;
    } else {
        url += "&" + param;
    }
    return url;
}

export default jsonp
