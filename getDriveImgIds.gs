function placeHolderRegEx(placeHolderIndex)
{
    return new RegExp('({)?\\{' + placeHolderIndex + '\\}(?!})', 'gm')
}

function formatResult(txt)
{
    if (txt == null) return "";
    return txt.replace(placeHolderRegEx("\\d+"), "");
}

// usage : 
// var fullName = String.format('Hello. My name is {0} {1}.', 'FirstName', 'LastName');
String.format = function ()
{
    var s = arguments[0];
    if (s == null) return "";
    for (var i = 0; i < arguments.length - 1; i++)
    {
        var reg = placeHolderRegEx(i);
        s = s.replace(reg, (arguments[i + 1] == null ? "" : arguments[i + 1]));
    }
    return formatResult(s);
}

function getThumbUrl(imgId,w,h){
  return String.format("https://drive.google.com/thumbnail?id={0}&sz=w{1}-h{2}", imgId, w, h);
}
function myFunction() {
  var ss=SpreadsheetApp.getActiveSpreadsheet();
  var s=ss.getActiveSheet();
  var c=s.getActiveCell();
  var fldr=DriveApp.getFolderById("1lyuYE3tgzXxFntkN-djDJ65Kej29NbnP");
  var files=fldr.getFiles();
  var anchors=[],f,str;
  var imgs=[], str2;
  var ids=[], str0;
  
  
  while (files.hasNext()) {
    f=files.next();
    //str='=hyperlink("' + f.getUrl() + '","' + f.getName() + '")';
    str= '<li><a href="' + f.getUrl() + '">' + f.getName() +  '</a>';
    
    str0=  '<li>' + f.getId() + ' , ' + f.getName();
    
    //str2=  '<li><img src="' + f.getUrl() + '">' + f.getName() +  '</img>';
    str2=  '<li><img src="' + getThumbUrl(f.getId(), 250,200) + '">' + f.getName() +  '</img>';
    ids.push([str0]);  
    anchors.push([str]);
    imgs.push([str2]);
  }
  //s.getRange(c.getRow(),c.getColumn(),names.length).setFormulas(names);
  var row=c.getRow();
  var col= c.getColumn();
  
  s.getRange(row,col, ids.length).setValues(ids);
  row += ids.length+1;
  s.getRange(row,col,anchors.length).setValues(anchors);
  
  row += anchors.length +1 ;
  s.getRange(row,col, imgs.length).setValues(imgs);
}
