function setUrl() {
  var locationURL, challengeURLInfo, challengeId, uploadURLcrowd, token, url, baseUrl;
  try {
    locationURL = window.location.href;
    challengeURLInfo = locationURL.split('/challenges/')[1];
    challengeId = challengeURLInfo.split('/')[0];

    url = window.location.href;
    // if(url.indexOf('localhost')) baseUrl = 'http://localhost:8235';
    // else baseUrl =
    // uploadURLcrowd = 'http://localhost:8456/api/challenges/' + challengeId + '/' + type;
    uploadURLcrowd = 'http://localhost:8456/api/challenges/' + challengeId + '/file';
    token = localStorage.getItem("token");
    uploadURLcrowd += '?access_token=' + token;
  } catch (e) {}
  return uploadURLcrowd;
}