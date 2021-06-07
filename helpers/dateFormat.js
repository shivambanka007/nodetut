const handleBar= require('handlebars');
const dateFormat=require('dateformat');
handleBar.registerHelper('dateFormat',function(dateDirty){
var datePretty=dateFormat(dateDirty,"dddd, mmmm dS, yyyy");
return datePretty;
})