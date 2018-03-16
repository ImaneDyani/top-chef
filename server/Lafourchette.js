var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');


var contents = fs.readFileSync("outputF.json");
var lines = String(contents).split(/\n/);


 for(var i =1; i < lines.length -1;i++){
     var json = JSON.parse(lines[i]);

     var title = json.title;
     var postcode = json.postCode;

     var href = "https://www.lafourchette.com/search-refine/"+String(title);

	 const config = {
    'uri': href,
    
    } 
}
     request(config, function (error, response, body) {
                 var $ = cheerio.load(body);
                 var json = { title : "", deal:""};
                 $(".resultItem").each(function()
                  {
                    var data = $(this); 
                    var address = data.find(".resultItem-address");
                    console.log(address);
                    if(String(address.text()).includes(String(postcode)))
                       {
                        json.title = title;
                        var link = data.find(".resultItem-name > a").attr("href");
                        console.log(link);
                        request({uri: "https://www.lafourchette.com"+String(link)}, function(error, response, body)
                                  {
                                    var $ = cheerio.load(body);

                                    $(".saleType--specialOffer").each(function()
                                    {
                                        var data = $(this); 
                                        var deal = data.find(".saleType-title").text();
                                        if(deal != "")
                                        {
                                          json.deal = deal;
                                          //console.log(deal);
                                           fs.writeFile('outputD.json', JSON.stringify(json)+"\r\n", function(err){ });
                                        }
                                        else{
                                            console.log("" + title)
                                        }
                                        });
                                    });
                        }
                        else{
                            console.log("no Restaurant founded for this link sorry" : "+config.uri)
                        }
                     });
                 });
  }