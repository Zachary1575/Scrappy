/*
SOURCE CODE SCRIPT - This is the source code script before converting it into a module through Browserify. 
Module was created since this script uses libraries and dependencies from node.js.

Made by Me
*/


//Core Scraping Functions

//Scrape if we have a specific tag and attribute
function Scrape(list, html_id, tag, attribute, $) {

    //Cheerio Scraping
    $('' + tag).each((index, elem)=>{
        //add to the list
        list.push($(elem).attr('' + attribute));
    });

    //If list is empty
    console.log(html_id);
    if (list.length == 0) document.getElementById("" + html_id).innerHTML += "Nothing here :(";

    //Set with HTML to see whats happening, added list support
    for (i = 0; i < list.length; i++)
    {
        document.getElementById("" + html_id).innerHTML += "[" + (i + 1) + "]: " + list[i];
        document.getElementById("" + html_id).innerHTML += "\n";
    }

    return list;
};

//Scrape a general tag
function Scrape_tag(list, html_id, tag, $) {

    //Cheerio Scraping 
    $('' + tag).each((index, elem)=>{
        list.push($(elem).text());
    });

    //If list is empty
    console.log(html_id);
    if (list.length == 0) document.getElementById("" + html_id).innerHTML += "Nothing here :(";

    //Set with HTML to see whats happening, added list support
    for (i = 0; i < list.length; i++)
    {
        document.getElementById("" + html_id).innerHTML += "[" + (i + 1) + "]: " + list[i];
        document.getElementById("" + html_id).innerHTML += "\n";
    }

    return list;
}


//Required Library needs a module loader as node cannot run client-side only! (You will get require undefined errors, use a module packager like Browserify). 
const cheerio = require('cheerio');
const axios = require('axios');

//Wait for DOM Contents to be Loaded before, button will be null if it isnt waited
document.addEventListener("DOMContentLoaded", ()=> {



//Scrap Common Elements, core functionality
document.getElementById("scrap__button_common").addEventListener("click", function(){
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        document.getElementById("url").innerHTML = url;


//Below is used as a test script incase changes needed to be made to the htmls without returning errors from axios. Default URL.
//var URL = "https://google.com"
var URL = document.getElementById("url").innerHTML;

//Background page gets HTML Content from user's current tab
axios.get('' + URL).then((response) => {

    if(response.status === 200) {
    let html = response.data;

    var $ = cheerio.load(html); 

    /*LINKS*/

    //href from 'a' tags
    let list_a_href =[];
    //Execute Scrape
    Scrape(list_a_href, "a_hrefs", 'a', 'href', $);

    //href from 'links'
    let list_links_href =[];
    Scrape(list_links_href, "links_hrefs", 'link', 'href', $);

    /*TEXT*/
    let list_span =[];
    Scrape_tag(list_span, "span", 'span', $);

    let list_p =[];
    Scrape_tag(list_p, "p", 'p', $);

    let list_hr =[];
    Scrape_tag(list_hr, "hr", 'h1, h2, h3, h4, h5, h6', $);
}
}, (error) => {console.log(error) });


//Chrome.query
    });

//Event Listener Button, "scrap_common_button"
});




//DOM Loading
});



/* OTHER */


//Example of using the function
    /*
    $('a').each((index, elem)=>{
        //add to the list
        list_a_href.push($(elem).attr('href'));
    });

    //If list is empty
    if (list_a_href.length == 0) document.getElementById("hrefs").innerHTML += "Nothing here :(";

     //Set with HTML to see whats happening, added list support
    for (i = 0; i < list_a_href.length; i++)
    {
        document.getElementById("hrefs").innerHTML += "[" + (i + 1) + "]: " + list_a_href[i];
        document.getElementById("hrefs").innerHTML += "\n";
    }

    */