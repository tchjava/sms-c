//load side
function ls(laytpl,data,sideId,scriptEle) {
    var side_data=data;
    var getIndexTpl = scriptEle.innerHTML,
        sideEle = document.getElementById(sideId);
    laytpl(getIndexTpl).render(side_data,function(html){
        sideEle.innerHTML=html;
    });
}