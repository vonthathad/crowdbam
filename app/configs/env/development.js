module.exports = {
    database: 'mongodb://admin:crowdbam123@188.166.247.131:63432/crowdbam',
    key: {
        privateKey: 'PRIVATEKEYGOESHERE',
        tokenExpiry: 1 * 30 * 1000 * 60 //1 hour
    },
    token: {
        guest: 'CRzytqL1lv1o8FaogFa2S4MyYU4F6Z9D'
    },
    facebook: {
        clientID: '1830778963800870',
        clientSecret: '501ad093ca8601ea56bd697c5e63270b',
        callbackURL: '/oauth/facebook/callback',
        profileFields: ['id', 'displayName', 'email', 'gender']
    },
    google: {
        clientID: '844189525883-op8r9biu0u8rotve147erv08dsmv3fr6.apps.googleusercontent.com',
        clientSecret: 'cNztTZyza-QkaijXejKP2lRj',
        callbackURL: '/oauth/google/callback',
        profileFields: ['id', 'displayName', 'email', 'gender']
    },
    email: {
        username: "crowdbam.system",
        password: "crowdbam@sgp",
        accountName: "Crowd Bam",
        verifyEmailUrl: "action/verify",
        resetPasswordUrl: "action/reset"
    },
    server: {
        host: process.env.PROTOCOL + '://' + process.env.DOMAIN + ':' + process.env.PORT,
        port: process.env.PORT,
        channel: process.env.CHANNEL
    },
    app: {
        id: '170584416691811',
        name: 'Title',
        description: 'Description',
        url: process.env.PROTOCOL + '://' + process.env.CHANNEL + '.' + process.env.DOMAIN,
        image: process.env.PROTOCOL + '://' + process.env.CHANNEL + '.' + process.env.DOMAIN + '/sources/ads.jpg'
    }
};