const loremIpsum = require('lorem-ipsum');

configObj = {
  init: function(title_postfix, parentID) {

    output = loremIpsum({
        count: 5                      // Number of words, sentences, or paragraphs to generate.
      , units: 'paragraphs'            // Generate words, sentences, or paragraphs.
      , sentenceLowerBound: 5         // Minimum words per sentence.
      , sentenceUpperBound: 15        // Maximum words per sentence.
      , paragraphLowerBound: 5        // Minimum sentences per paragraph.
      , paragraphUpperBound: 15        // Maximum sentences per paragraph.
      , format: 'plain'               // Plain text or html
      , random: Math.random           // A PRNG function. Uses Math.random by default
      , suffix: "\n"                   // The character to insert between paragraphs. Defaults to default EOL for your OS.
    });

    if(parentID == null) {
      var bodyData = {
        "title": title_postfix,
        "prefix": "global",
        "name": "<string>",
        "type": "page",
        "space": {
          "key": "YOUR_SPACE_KEY"
        },
        "status": "current",
        "body": {
        }
      }
    } else {
      var bodyData = {
        "title": "Child_" + title_postfix,
        "prefix": "global",
        "name": "<string>",
        "type": "page",
        "space": {
          "key": "YOUR_SPACE_KEY"
        },
        "status": "current",
        "ancestors": [{
          "id": parentID
        }],
        "body": {
          "storage": {
            "value": output,
            "representation": "storage"
          }
        }
      }
    }
    global.options = {
      method: 'POST',
      url: 'https://DOMAIN-NAME.atlassian.net/wiki/rest/api/content',
      auth: {
        username: 'E-MAIL',
        password: 'TOKEN' },
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyData)
    }
  }
}
