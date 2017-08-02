/**
 * Created by Sourabh Punja on 7/30/2017.
 */
var app = require("../../express");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });

var widgets = [
    { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"},
    { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>GIXMODO</p>"},
    { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E" },
    { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget", findAllWidgetsForThePage);
app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", findWidgetByWidgetId);
app.post("/api/user/:userId/website/:websiteId/page/:pageId/widget", createWidget);
app.put("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", deleteWidget);
app.post("/api/upload",upload.single('myFile'), uploadImage);
app.put("/api/page/:pageId/widget",sortWidgets);

function sortWidgets(req,res){
    var pageId = req.params.pageId;
    var start= req.query.start;
    var end= req.query.end;
    widgets.splice(end,0,widgets.splice(start,1)[0]);
    res.sendStatus(200);
    // console.log([start, end]);
}

function uploadImage(req, res) {

    var widgetId      = req.body.widgetId;
    var width         = req.body.width;
    var widgetType    = req.body.widgetType;
    var myFile        = req.file;

    var userId        = req.body.userId;
    var websiteId     = req.body.websiteId;
    var pageId        = req.body.pageId;

    var originalname  = myFile.originalname; // file name on user's computer
    var filename      = myFile.filename;     // new file name in upload folder
    var path          = myFile.path;         // full path of uploaded file
    var destination   = myFile.destination;  // folder where file is saved to
    var size          = myFile.size;
    var mimetype      = myFile.mimetype;

    var widget = getWidgetById(pageId,widgetId,widgetType);
    widget.url = '/uploads/'+filename;

    // var callbackUrl   = "/assignment/#/user/"+userId+"/website/"+websiteId;
    var callbackUrl = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
    // var callbackUrl = "/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

    res.redirect(callbackUrl);
}

function getWidgetById(pageId,widgetId,widgetType){
    for (var w in widgets){
        if (widgets[w]._id === widgetId){
            return widgets[w];
        }
    }
    var widget = {};
    widget._id = widgetId;
    widget.pageId= pageId;
    widget.widgetType = widgetType;
    widgets.push(widget);
    widgets = widgets.filter( function( eachobject, id, filteredArray ) {
        return filteredArray.indexOf(eachobject) == id;
    });

    return widget;
}

function deleteWidget(req,res) {
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;
    for (var w in widgets){
        if (widgets[w]._id === widgetId){
            widgets.splice(w,1);
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);

}
function updateWidget(req,res){
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;
    var widget= req.body;
    for (var w in widgets){
        if (widgets[w]._id === widgetId){
            widgets[w] = widget;
            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function findWidgetByWidgetId(req,res){
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;
    for (var w in widgets){
        if (widgets[w]._id === widgetId){
            res.json(widgets[w]);
            return;
        }
    }
    res.sendStatus(404);
}

function createWidget(req,res){
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    var widget = req.body;
    widget._id = (new Date()).getTime() + "";
    widgets.push(widget);
    widgets = widgets.filter( function( eachobject, id, filteredArray ) {
        return filteredArray.indexOf(eachobject) == id;
    });

    res.json(widget);
}

function findAllWidgetsForThePage(req,res){
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    widgets = deleteInvalidWidget();
    var widgetlist=[];
    for (var w in widgets){
        if (widgets[w].pageId === pageId){
            widgetlist.push(widgets[w]);
        }
    }
    res.json(widgetlist);
}


function deleteInvalidWidget(){
    for (var w in widgets){
        // console.log(typeof widgets[w].text);
        // console.log(typeof widgets[w].url);
        if (typeof widgets[w].text === 'undefined' && widgets[w].widgetType === 'HEADING')
        {
            widgets.splice(w,1);
        }
        else if ((typeof widgets[w].url === 'undefined' || typeof widgets[w].width === 'undefined') && widgets[w].widgetType === 'IMAGE')
        {
            widgets.splice(w,1);
        }
        else if (typeof widgets[w].url === 'undefined' && widgets[w].width === 'undefined' && widgets[w].widgetType === 'YOUTUBE')
        {
            widgets.splice(w,1);
        }
        else{
            continue;
        }
    }
    return widgets;
}