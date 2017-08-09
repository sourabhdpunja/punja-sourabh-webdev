/**
 * Created by Sourabh Punja on 7/30/2017.
 */
var app = require("../../express");
var multer = require('multer'); // npm install multer --save
var upload = multer({ dest: __dirname+'/../../public/uploads' });
var widgetModel = require('../models/widget/widget.model.server');

// var widgets = [
//     { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
//     { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
//         "url": "http://lorempixel.com/400/200/"},
//     { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>GIXMODO</p>"},
//     { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
//     { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
//         "url": "https://youtu.be/AM2Ivdi9c4E" },
//     { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
// ];

app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget", findAllWidgetsForThePage);
app.get("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", findWidgetByWidgetId);
app.post("/api/user/:userId/website/:websiteId/page/:pageId/widget", createWidget);
app.put("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", updateWidget);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId", deleteWidget);
app.post("/api/upload",upload.single('myFile'), uploadImage);
app.put("/api/page/:pageId/widget",sortWidgets);
app.put("/api/user/:userId/website/:websiteId/page/:pageId/widget/:widgetId/updateUrl", updatePhoto);

function updatePhoto(req,res){
    var userId = req.params.userId;
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;
    var websiteId = req.params.websiteId;
    var widget = req.body;
    var widgeturl = widget.url;
    var widgetType = 'IMAGE';
    console.log(widgeturl);
    // var widget = getWidgetById(pageId,widgetId,widgetType,widgeturl);
    getWidgetById(pageId,widgetId,widgetType,widgeturl)
        .then(function (widget){
            res.json(widget);
        });
    // res.json(widget);
}

function sortWidgets(req,res){
    var pageId = req.params.pageId;
    var start= req.query.start;
    var end= req.query.end;
    // widgets.splice(end,0,widgets.splice(start,1)[0]);
    widgetModel
        .reorderWidget(pageId,start,end)
        .then(function (status){
            res.sendStatus(200);
        });

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
    var widgeturl     = '/uploads/'+filename;

    var widget = getWidgetById(pageId,widgetId,widgetType,widgeturl);
    // widget.url = '/uploads/'+filename;

    // var callbackUrl   = "/assignment/#/user/"+userId+"/website/"+websiteId;
    var callbackUrl = "/assignment/#!/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;
    // var callbackUrl = "/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget/"+widgetId;

    res.redirect(callbackUrl);
}

function getWidgetById(pageId,widgetId,widgetType,widgeturl){
    return widgetModel
        .findWidgetByWidgetId(widgetId)
        .then(function(widget){
            if (widget === null) {
                var widget = {};
                widget._id = widgetId;
                widget.pageId= pageId;
                widget.widgetType = widgetType;
                widget.url = widgeturl;
                return widgetModel
                    .createWidget(pageId,widget)
                    .then(function (widget){
                        return widget;
                    });
                // widget = widgetModel
                    // .findWidgetByWidgetId(widgetId);

            } else{
                return widget;
            }

        },function(err){
            return err;
        });

    // for (var w in widgets){
    //     if (widgets[w]._id === widgetId){
    //         widgets[w].url= widgeturl;
    //         return widgets[w];
    //     }
    // }
    // var widget = {};
    // widget._id = widgetId;
    // widget.pageId= pageId;
    // widget.widgetType = widgetType;
    // widget.url = widgeturl;
    // widgets.push(widget);
    // widgets = widgets.filter( function( eachobject, id, filteredArray ) {
    //     return filteredArray.indexOf(eachobject) == id;
    // });

    // return widget;
}

function deleteWidget(req,res) {
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;

    widgetModel
        .deleteWidget(pageId,widgetId)
        .then(function (status){
            res.json(status);
        });

    // for (var w in widgets){
    //     if (widgets[w]._id === widgetId){
    //         widgets.splice(w,1);
    //         res.sendStatus(200);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function updateWidget(req,res){
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;
    var widget= req.body;
    widgetModel
        .updateWidget(widgetId,widget)
        .then(function(status){
            return widgetModel
                .findWidgetByWidgetId(widgetId);
        },function (err) {
            res.sendStatus(404).send(err);
        })
        .then(function (widget){
            // console.log(user);
            res.json(widget);
            return;
        },function (err) {
            res.sendStatus(404).send(err);
            return;
            // }
        });

    // for (var w in widgets){
    //     if (widgets[w]._id === widgetId){
    //         widgets[w] = widget;
    //         res.json(widgets[w]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function findWidgetByWidgetId(req,res){
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    var widgetId = req.params.widgetId;
    widgetModel
        .findWidgetByWidgetId(widgetId)
        .then(function (widget){
            res.json(widget);
        });
    // for (var w in widgets){
    //     if (widgets[w]._id === widgetId){
    //         res.json(widgets[w]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function createWidget(req,res){
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    var widget = req.body;

    widgetModel
        .createWidget(pageId,widget)
        .then(function (widget){
           res.json(widget);
        });

    // widget._id = (new Date()).getTime() + "";
    // widgets.push(widget);
    // widgets = widgets.filter( function( eachobject, id, filteredArray ) {
    //     return filteredArray.indexOf(eachobject) == id;
    // });

    // res.json(widget);
}

function findAllWidgetsForThePage(req,res){
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    // widgets = deleteInvalidWidget();
    widgetModel
        .deleteInvalidWidget()
        .then(function (widgets){
           return widgetModel
                .findAllWidgetsForThePage(pageId);
        },function (err){
            res.sendStatus(404).send(err);
        })
        .then(function (widgets){
            res.json(widgets);
            return;
        },function (err) {
            res.sendStatus(404).send(err);
            return;
            // }
        });
    // var widgetlist=[];
    // for (var w in widgets){
    //     if (widgets[w].pageId === pageId){
    //         widgetlist.push(widgets[w]);
    //     }
    // }
    // res.json(widgetlist);
}


function deleteInvalidWidget(){
    widgetModel
        .deleteInvalidWidget()
        .then(function(widgets){
            return widgets;
        });
    // for (var w in widgets){
    //     // console.log(typeof widgets[w].text);
    //     // console.log(typeof widgets[w].url);
    //     if (typeof widgets[w].text === 'undefined' && widgets[w].widgetType === 'HEADING')
    //     {
    //         widgets.splice(w,1);
    //     }
    //     else if ((typeof widgets[w].url === 'undefined' || typeof widgets[w].width === 'undefined') && widgets[w].widgetType === 'IMAGE')
    //     {
    //         widgets.splice(w,1);
    //     }
    //     else if (typeof widgets[w].url === 'undefined' && widgets[w].width === 'undefined' && widgets[w].widgetType === 'YOUTUBE')
    //     {
    //         widgets.splice(w,1);
    //     }
    //     else{
    //         continue;
    //     }
    // }
    // return widgets;
}