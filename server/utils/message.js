var moment = require('moment');


var generateMessage = (from,text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

var generateLocationMessage = (from,latitude,longitude) => {
    return {
        from,
        url: 'https://www.mapquest.com/latlng/'+latitude+','+longitude,
        createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage,generateLocationMessage};