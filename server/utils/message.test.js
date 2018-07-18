var expect = require('expect');

var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'Jen';
        var text = 'some message';
        var message = generateMessage(from,text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Deb';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.mapquest.com/latlng/'+latitude+','+longitude;
        var message = generateLocationMessage(from,latitude,longitude);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url});
    });
});