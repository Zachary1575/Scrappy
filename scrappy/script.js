/*
SOURCE CODE SCRIPT - This is the source code script before converting it into a module through Browserify. 
Module was created since this script uses libraries and dependencies from node.js.

Made by Zchry

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
};




//Required Library needs a module loader as node cannot run client-side only! (You will get require undefined errors, use a module packager like Browserify). 
const cheerio = require('cheerio');
const axios = require('axios');

//Wait for DOM Contents to be Loaded before, button will be null if it isnt waited
document.addEventListener("DOMContentLoaded", ()=> {

/*SCRAPPING SEARCH ELEMENTS */

document.getElementById("scrap__button_search").addEventListener("click", function(){

    //Clear Textbox Incase of Https failure
    document.getElementById("search_result").innerHTML = "";

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        console.log(tabs[0])
        var url = tabs[0].url;
        document.getElementById("url_search").innerHTML = url;


        var URL = document.getElementById("url_search").innerHTML;
        var Search = document.getElementById("search_input").value;
        if (document.getElementById("attr_input").value != null) var attr = document.getElementById("attr_input").value;

        if (URL == undefined) {
            document.getElementById("url").innerHTML = "URL Could not be loaded!"
        } else if (Search == undefined)
        {
            document.getElementById("search_result").innerHTML = "Invalid Search Input!"
        }
        else 
        {

            document.getElementById("search_result").innerHTML = "Scrapping...";
            axios.get('' + URL).then((response) => {

                //Clear Textbox
                document.getElementById("search_result").innerHTML = "";

                if(response.status === 200) {
                let html = response.data;
            
                var $ = cheerio.load(html); 
            
                /*CUSTOM SEARCH*/
                list_Custom = []

                if (Search != "" && attr != "")
                {
                    Scrape(list_Custom, "search_result", '' + Search, attr, $);
                } else
                {
                    Scrape_tag(list_Custom, "search_result", '' + Search, $);
                }

                
                //Scrape_tag(list_Custom, "search_result", '' + Search, $);
            }
            }, (error) => {console.log(error) });

        }


    });//chrome.query



}); //Event Listener Button, "scrap__button_search"




/* SCRAPPING COMMON ELEMENTS */
document.getElementById("scrap__button_common").addEventListener("click", function(){

    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
        var url = tabs[0].url;
        document.getElementById("url").innerHTML = url;


//Below is used as a test script incase changes needed to be made to the htmls without returning errors from axios. Default URL.
//var URL = "https://google.com"
var URL = document.getElementById("url").innerHTML;

//Don't want to fire axios when there are errors.
if (URL == undefined) {
    document.getElementById("url").innerHTML = "URL Could not be loaded!"
} 
else 
{
//Background page gets HTML Content from user's current tab
axios.get('' + URL).then((response) => {

    if(response.status === 200) {
    let html = response.data;
    
    //Debug Purposes
    console.log(html);



    var $ = cheerio.load(html); 

    /*LINKS*/
    
    //href from 'a' tags
    let list_a_href =[];
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

    let list_b =[];
    console.log(list_b);
    Scrape_tag(list_b, "bold", 'b', $);

    let list_i =[];
    console.log(list_i);
    Scrape_tag(list_i, "italic", 'i', $);
    
    /*TABLE*/
    let list_tr =[];
    console.log(list_tr);
    Scrape_tag(list_tr, "tr", 'tr', $);

    let list_th =[];
    console.log(list_th);
    Scrape_tag(list_th, "th", 'th', $);

    let list_td =[];
    console.log(list_td );
    Scrape_tag(list_td , "td", 'td', $);

    /*LIST*/
    let list_ol =[];
    console.log(list_ol);
    Scrape_tag(list_ol, "ol", 'ol', $);

    let list_ul =[];
    console.log(list_ul);
    Scrape_tag(list_ul, "ul", 'ul', $);

    let list_li =[];
    console.log(list_li );
    Scrape_tag(list_li , "li", 'li', $);

    /*MISCELLANEOUS*/
    let list_div =[];
    console.log(list_div);
    Scrape_tag(list_div, "div", 'div', $);

    let list_img_src =[];
    Scrape(list_img_src, "img_src", 'img', 'src', $);

    let list_img_alt =[];
    Scrape(list_img_alt, "img_alt", 'img', 'alt', $);


}   
}, (error) => {console.log(error) });

}

    }); //Chrome.query


}); //Event Listener Button, "scrap_common_button"





/** SCROLL TO TOP BUTTONS **/
//Get the button
var mybutton = document.getElementById("btn-back-to-top");

window.onscroll = function () {
    scrollFunction();
};

mybutton.addEventListener("click", backToTop);

//Scroll function
function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.style.display = "block";
    } else if (mybutton != null) {
      mybutton.style.display = "none";
    }
}

//Get back to the top of the Document
function backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}




/** ABOUT BUTTONS **/
// Github link button
document.getElementById("github-button").addEventListener("click", function(){ 
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {

        chrome.tabs.create({url: "https://github.com/Zachary1575/Scrappy"});

    });
});

//Chrome store link button
document.getElementById("chrome-button").addEventListener("click", function(){ 
    chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {

        chrome.tabs.create({url: "https://chrome.google.com/webstore/category/extensions"});

    });
});


}); //DOM Loader

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