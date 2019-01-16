if(!localStorage.getItem('userMorningInfo')){    
    //send to /form/ to give user option of entering existing userNumber or creating new profile
    window.location.replace('/form');
}else{
    // localStorage.clear();
    let objUserInfo = JSON.parse(localStorage.getItem('userMorningInfo'));    
    window.location.replace('/show/'+objUserInfo.userNumber);
}