// This code sample uses the 'request' library:
// https://www.npmjs.com/package/request
var request = require('request');

var options = {
   method: 'DELETE',
   url: 'https://DOMAIN-NAME.atlassian.net/wiki/rest/api/space/test',
   auth: { username: 'EMAIL-ADDRESS', password: 'TOKEN' }
};

request(options, function (error, response, body) {
   if (error) throw new Error(error);
   console.log(
      'Response: ' + response.statusCode + ' ' + response.statusMessage
   );
   console.log(body);
});
