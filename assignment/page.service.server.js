/**
 * Created by Sourabh Punja on 7/29/2017.
 */
var app = require("../express");

var pages=[
    { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
];

app.get("/api/user/:userId/website/:websiteId/page",findAllPagesByWebsiteId);
app.post("/api/user/:userId/website/:websiteId/page",createPage);
app.get("/api/user/:userId/website/:websiteId/page/:pageId",findPageById);
app.put("/api/user/:userId/website/:websiteId/page/:pageId",updatePage);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId",deletePage);

function deletePage(req,res){
    var userId= req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    for (var p in pages) {
            if (pages[p]._id === pageId) {
            pages.splice(p,1);
            res.sendStatus(200);
            return;
            }
        }
    res.sendStatus(404);
}

function updatePage(req,res){
    var userId= req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    var page = req.body;
    for (var p in pages){
            if (pages[p]._id === pageId){
                pages[p]=page;
                res.json(pages[p]);
                return;
            }
        }
        res.sendStatus(404);
}

function findPageById(req,res){
    var userId= req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    for (var p in pages){
        if (pages[p]._id === pageId){
            res.json(pages[p]);
            return;
        }
    }
    res.sendStatus(404);
}

function createPage(req,res){
    var userId= req.params.userId;
    var websiteId = req.params.websiteId;
    var page = req.body;
    page.websiteId = websiteId;
    page._id = (new Date()).getTime() + "";
    pages.push(page);
    res.json(page);
}

function findAllPagesByWebsiteId(req,res) {
    var userId= req.params.userId;
    var websiteId = req.params.websiteId;
    var pagelist=[];
    for (var p in pages){
        if (pages[p].websiteId === websiteId){
            pagelist.push(pages[p]);
        }
    }
    res.json(pagelist);
}

