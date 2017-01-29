/**
 * Created by 15R on 2/5/2016.
 */
var nodemailer = require("nodemailer"),
    Config = require('./config');
var privateKey = Config.key.privateKey;
console.log(Config.server.host);
// create reusable transport method (opens pool of SMTP connections)

var smtpTransport = nodemailer.createTransport('smtps://'+Config.email.username+'%40gmail.com:'+Config.email.password+'@smtp.gmail.com');

exports.sentMailVerificationLink = function(user,token) {
    var from = Config.email.accountName+" <" + Config.email.username + "@gmail.com>";
    var mailbody = '<p>Thank you for registering at '+Config.email.accountName+' </p><p>Please confirm your account at this link:<br/><a href="'+Config.server.host+'/'+Config.email.verifyEmailUrl+'/'+token+'">Verify Link</a></p>';
    mail(from, user.email , "Verify account at www.crowdbam.com", mailbody);
};
exports.sendMailResetPassword = function(user,token){
    var from = Config.email.accountName+" <" + Config.email.username + "@gmail.com>";
    var mailbody = '<p>You are receiving this email because you (or someone else) required to be reset your password.</p><p>Please click this link to excute:<br/><a href="'+Config.server.host+'/'+Config.email.resetPasswordUrl+'/'+token+'">Link Reset Password</a></p><p>If you did not request this, please ignore the email and password will remain the same.</p>';
    mail(from, user.email , "Change password at www.crowdbam.com", mailbody);
}
exports.sendMailDoneResetPassword = function(user){
    var from = Config.email.accountName+" <" + Config.email.username + "@gmail.com>";
    var mailbody = '<p>This is the email to confirm that the account '+ user.username +' has changed password.</p>';
    mail(from, user.email , "Change password done at www.crowdbam.com", mailbody);
}

function mail(from, email, subject, mailbody){
    var mailOptions = {
        from: from, // sender address
        to: email, // list of receivers
        subject: subject, // Subject line
        //text: result.price, // plaintext body
        html: mailbody  // html body
    };

    smtpTransport.sendMail(mailOptions, function(error, response) {
        if (error) {
            console.error(error);
        }
        console.log(response);
        smtpTransport.close(); // shut down the connection pool, no more messages
    });
}