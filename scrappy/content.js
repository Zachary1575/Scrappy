chrome.runtime.sendMessage({content: "" + document.location.href}, (response)=>{

    if (response == null) {
        console.log("Its happening again, undefined...")
    } else {
        console.log(response);
    }
    
});