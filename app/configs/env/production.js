module.exports = {
    database: 'mongodb://admin:crowdbam123@188.166.247.131:63432/crowdbam',
    // database: 'mongodb://admin:crowdbam123@23.88.239.10:61511/crowdbam',
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
        profileFields: ['id', 'displayName','email','gender']
    },
   google: {
      clientID: '844189525883-m0ph4rv2dn2k4fp0e6euk0rp2hqtqh4g.apps.googleusercontent.com',
      clientSecret: 'Ywnw7PUSIcasbPUoUQ4wvm1J',
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
        host: process.env.PROTOCOL + '://' + process.env.CHANNEL + '.' + process.env.DOMAIN,
        port: process.env.PORT,
        channel: process.env.CHANNEL
    },
    app: {
        id: '170584416691811',
        title: 'CrowdBam',
        description: 'Welcome to CrowdBam!',
        url: process.env.PROTOCOL+'://'+process.env.CHANNEL+'.'+process.env.DOMAIN,
        image: process.env.PROTOCOL+'://'+process.env.CHANNEL+'.'+process.env.DOMAIN+'/sources/ads.jpg'
    }
};