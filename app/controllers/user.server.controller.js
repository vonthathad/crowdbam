/**
 * Created by andh on 8/4/16.
 */
var User = require('mongoose').model('User'),
    Jwt = require('jsonwebtoken'),
    Mail = require('../configs/mail'),
    config = require('../configs/config'),
    privateKey = config.key.privateKey,
    https = require('https'),
    crypto = require('crypto');
var getErrorMessage = function (err) {
    console.log(err);
    var messages = [];
    if (err.code) {
        switch (err.code) {
            case 11000:
            case 11001:
                messages = ['Email or username is exist'];
                break;
        }
    } else {
        for (var errName in err.errors) {
            if (err.errors[errName].message) messages.push(err.errors[errName].message);
        }
    }
    return messages;
};
exports.authLogout = function (req, res) {
    req.logout();
    res.redirect('/');
};
exports.authSignin = function (req, res) {
    return res.status(200).send({ user: req.user });
};
exports.isManager = function(req, res, next) {
    if (req.user.role !== 'admin' && req.user.role !== 'manager') {
        return res.status(403).send({
            messages: ["You aren't Manager"]
        });
    }
    next();
};
exports.authSignup = function (req, res) {
    if (!req.user) {
        var user = new User();
        user.email = req.body.email;
        user.username = req.body.username;
        user.displayName = req.body.username;
        user.password = req.body.password;
        user.provider = 'local';
        user.isVerified = false;
        user.avatar = "/assets/img/avatar.png";
        var tokenDt = {
            email: req.body.email
        };
        var userToken = Jwt.sign(tokenDt, privateKey);
        user.token = userToken;
        user.save(function (err, result) {
            if (err) {
                var messages = getErrorMessage(err);

                return res.status(400).send({
                    messages: messages
                });
            }
            var tokenData = {
                email: user.email
            };
            Mail.sentMailVerificationLink(user, Jwt.sign(tokenData, privateKey));
            //message = "Hãy kiểm tra email của bạn để xác nhận tài khoản";
            //req.flash('error', message);
            return res.status(200).send({
                token: result.token,
                message: "Hãy kiểm tra email của bạn để xác nhận tài khoản"
            });
            //return res.redirect('/signup');
        });
    } else {
        return res.redirect('/');
    }
};

exports.verifyEmail = function (req, res, next) {
    var token = req.params.token;
    var app = {
        id: config.app.id,
        name: config.app.name,
        description: config.app.description,
        url: config.app.url,
        image: config.app.image
    };
    Jwt.verify(token, privateKey, function (err, decoded) {
        if (decoded === undefined) {
            message = "Token has expired :(";
            return res.render('index', { message: message, app: config.app, channel: config.server.channel });
        }
        User.findOne({ email: decoded.email }, function (err, user) {
            if (err) {
                message = "Token has expired :(";
                return res.render('index', { message: message, app: config.app, channel: config.server.channel });
            }
            if (user === null) {
                message = "Account doesn't exist";
                return res.render('index', { message: message, app: config.app, channel: config.server.channel });
            }
            user.isVerified = true;
            user.save(function (err, user) {
                if (err) {
                    message = "Error Occur. Please try again";
                    return res.render('index', { message: message, app: config.app, channel: config.server.channel });
                } else {
                    message = "Congragulation! Account has verified";
                    return res.render('index', { message: message, app: config.app, channel: config.server.channel });
                }
            })
        })

    });

};
exports.resetPage = function (req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            var app = {
                id: config.app.id,
                name: config.app.name,
                description: config.app.description,
                url: config.app.url,
                image: config.app.image
            };
            message = "Token has expired :(";
            return res.render('index', { message: message, user: null, app: config.app, channel: config.server.channel });
        }
        return res.redirect('/action/password/' + req.params.token);
    });
}
exports.renderPassword = function (req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            var app = {
                id: config.app.id,
                name: config.app.name,
                description: config.app.description,
                url: config.app.url,
                image: config.app.image
            };
            message = "Token has expired :(";
            return res.render('index', { message: message, user: null, app: config.app, channel: config.server.channel });
        }
        message = 'Enter new password';
        return res.render('index', { message: message, user: null, app: config.app, channel: config.server.channel });
    });
}
exports.resetDone = function (req, res) {
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function (err, user) {
        if (!user) {
            //req.flash('error', 'Token để reset password không tồn tại, hoặc đã hết hạn.');
            //return res.redirect('back');
            message = "Token has expired :(";
            return res.status(400).send({
                message: message
            });
        } else {
            console.log(req.body.password);
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.save(function (err) {
                if (err) {
                    message = "Error occur. Please try again";
                    return res.status(400).send({
                        message: message
                    });
                } else {
                    Mail.sendMailDoneResetPassword(user);
                    message = "Change password success!";
                    return res.status(200).send({
                        data: user,
                        message: message
                    });
                }
            });
        }
    });
};
exports.resendVerificationEmail = function(req, res) {
    User.findUserByEmail(req.body.email, function(err, user){
        if (!err) {
            if (user === null) {
                message = "Account doesn't exist";
                return res.status(400).send({
                    message: message
                });
            }
            if (user.isVerified === true) {
                message = "Account has verified";
                return res.status(400).send({
                    message: message
                });
            }
            var tokenData = {
                email: user.email
            };
            Mail.sentMailVerificationLink(user,Jwt.sign(tokenData, privateKey));
            message = 'Resend confirmation email success. Check your email to verify!';
            return res.status(200).send({
                message: message
            });

        } else {
            message = "Error occur. Please try again.";
            return res.status(400).send({
                message: message
            });
        }
    });
}
exports.resetPassword = function (req, res) {
    User.findOne({ email: req.body.email }, function (err, user) {
        if (!err) {
            if (user === null) {
                message = "Tài khoản không tồn tại";
                return res.status(400).send({
                    message: message
                });
            }
            crypto.randomBytes(20, function (err, buf) {
                if (err) {
                    message = "Error occur. Please try again";
                    return res.status(400).send({
                        message: message
                    });
                } else {
                    var token = buf.toString('hex');
                    user.resetPasswordToken = token;
                    user.resetPasswordExpires = Date.now() + 3600000;
                    user.save(function (err) {
                        if (err) {
                            message = "Error occur. Please try again";
                            return res.status(400).send({
                                message: message
                            });
                        } else {
                            Mail.sendMailResetPassword(user, token);
                            message = 'Success. Password change request has been sent to your email';
                            return res.status(200).send({
                                message: message
                            });
                        }
                    });

                }
            });
        } else {
            message = "Error occur. Please try again";
            return res.status(400).send({
                message: message
            });
        }
    });

};

var getSortType = function (sortType) {
    if (sortType === "username") {
        return { username: -1 };
    }
    if (sortType === "exp") {
        return { exp: -1 };
    }
    return { created: -1 };
};

//////////////////////////////////////////////////
////GET USER DATA, Header Authorization By Token
//////////////////////////////////////////////////
exports.authToken = function (req, res) {
    if (req.user) {
        return res.json({ user: req.user });
        req.user.save();
    } else {
        res.status(400).send();
    }
};
exports.loadUser = function (req, res, next) {
    res.json({ data: req.selectedUser });
};


exports.userByUsername = function (req, res, next, id) {
    User.findOne({ username: id }, '-password -salt -token -isVerified -providerData')
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new Error('Failed to load user ' + id));
            }
            req.selectedUser = user;
            next();
        });
};

exports.requiresLogin = function (req, res, next) {
    if (req.user === 'guest' || !req.isAuthenticated()) {
        return res.status(401).send({
            message: "User doesn't login"
        });
    } else if (req.user === 'ban') {
        return res.status(403).send({
            message: "Your account is banned"
        });
    }
    next();
};
exports.requiresManager = function(req,res,next){
    if (req.user.role == 'manager' || req.user.role == 'admin'){
        next();
    } else {
        return res.status(403).send({
            message: "You doesn't have a permission"
        });
    }
}
exports.renderAngular = function(req, res, next) {
    if ((req.url.indexOf('sources') < 0 && req.url.indexOf('api') < 0 && req.url.indexOf('assets') < 0)) {
        res.render('index', { message: null, app: config.app, channel: config.server.channel });
    } else {
        next();
    }

}

/* API */
exports.checkUser = function(req,res,next){
    if (req.user._id == req.selectedUser._id){
        next();
    } else {
        return res.status(403).send({
            message: "You doesn't have a permission"
        });
    }
}
exports.update = function (req, res, next) {
    var dataChange = {};
    if (req.body.avatar) dataChange.avatar = req.body.avatar;
    if (req.body.username) dataChange.username = req.body.username;
    if (req.body.displayName) dataChange.displayName = req.body.displayName;
    if (req.body.bio) dataChange.bio = req.body.bio;
    if (req.body.website) dataChange.website = req.body.website;
    req.user.update(dataChange, function () {
        res.status(200).send();
    })
};
exports.userByID = function (req, res, next, id) {
    User.findById(id, 'displayName username avatar bio website created')
        .exec(function (err, user) {
            if (err) {
                return next(err);
            }
            if (!user) {
                return next(new Error('Failed to load user ' + id));
            }
            req.selectedUser = user;
            next();
        });
};
exports.getInfo = function(req,res){
    res.json({data: req.selectedUser});
}