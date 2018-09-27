require('./config');
const async = require('async');
const request = require('request');

var numberOfLevels = 3;
var numberOfChildren = 10;

var child;
global.bodyData;

function createPage(title_postfix, isChild, parentID, level) {
  configObj.init(title_postfix, parentID);

  return new Promise(function(resolve, reject) {
    request(options, function (error, response, body) {
      console.log('Response: ' + response.statusCode + ' ' + response.statusMessage);
      if (response.statusCode != 200) { reject(error) }
      else {
        if(child == null) {
          child = [[]];
          for(var i = 0; i < numberOfLevels; i++) {
            child[i+1] = [];
          }
        }
        var obj = JSON.parse(body)
        var id = obj.id;
        if(isChild) {
          for (var i = 0; i < numberOfChildren; i++) {
            child[level].push({pid: id});
          }
        } else {
          child[0] = [];
          for (var i = 0; i < numberOfChildren; i++) {
            child[0].push({pid: id});
          }
        }
        resolve(id);
      }
    })
  });
}

var promise = createPage("root", false, null, 0)
promise.then(function(result) {
  async.timesSeries(numberOfLevels, function(level, callback) {
    var count = 0;
    async.forEachOfLimit(child[level], 25, function(val, index, callback) {
      createPage("_" + level + "_" + count+index, true, val.pid , level+1).then(function(result) {
        count++;
        callback(null);
      }).catch(function() {
        console.log("page creation error!");
      });
    }, function(count) {
      callback(null);
    })
  });
})
