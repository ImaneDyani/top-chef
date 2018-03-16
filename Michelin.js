var express = require('express');
var fs      = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res)
{
  // Let's scrape Anchorman 2
  
  var scrape = true;
  urlMichelin = 'https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin';
  i=1;
  while(i<30)
  {
	url=urlMichelin+i.toString();
    console.log(url);
	request(url, function(error, response, html)
	{
	  
    if(!error){
      var $ = cheerio.load(html);
		
      var title, release, rating;
	  var jsons = []
      

      $('[attr-gtm-type="poi"]').each(function(){
	    var data = $(this);
		title = $(this).attr('attr-gtm-title');
		var json = { title : "", release : "", rating : ""};
        json.title = title;
        json.release = release;
		jsons.push(json)
		})    

		fs.writeFile('output.json', JSON.stringify(jsons, null, 4), function(err){
		  console.log('File successfully written! - Check your project directory for the output.json file');
		})
			}
    else{
    	scrape = false;
		}

	})
      i++;

  }
    res.send('Check your console!')
  })
  
app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;
// Write http://localhost:8081/scrape in your browser and then check your console