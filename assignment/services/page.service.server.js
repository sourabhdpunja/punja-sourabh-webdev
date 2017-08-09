/**
 * Created by Sourabh Punja on 7/29/2017.
 */
var app = require("../../express");
var pageModel = require("../models/page/page.model.server");

// var pages=[
//     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
//     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
//     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
// ];

app.get("/api/user/:userId/website/:websiteId/page",findAllPagesByWebsiteId);
app.post("/api/user/:userId/website/:websiteId/page",createPage);
app.get("/api/user/:userId/website/:websiteId/page/:pageId",findPageById);
app.put("/api/user/:userId/website/:websiteId/page/:pageId",updatePage);
app.delete("/api/user/:userId/website/:websiteId/page/:pageId",deletePage);

function deletePage(req,res){
    var userId= req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    pageModel
        .deletePage(websiteId,pageId)
        .then(function (status){
           res.json(status);
        });

    // for (var p in pages) {
    //         if (pages[p]._id === pageId) {
    //         pages.splice(p,1);
    //         res.sendStatus(200);
    //         return;
    //         }
    //     }
    // res.sendStatus(404);
}

function updatePage(req,res){
    var userId= req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    var page = req.body;
    pageModel
        .updatePage(pageId,page)
        .then(function(status){
            return pageModel
                .findPageById(pageId);
        },function (err) {
            res.sendStatus(404).send(err);
        })
        .then(function(page){
            res.json(page);
            return;
        },function(err){
            res.sendStatus(404).send(err);
            return;
        });
    // for (var p in pages){
    //         if (pages[p]._id === pageId){
    //             pages[p]=page;
    //             res.json(pages[p]);
    //             return;
    //         }
    //     }
    //     res.sendStatus(404);
}

function findPageById(req,res){
    var userId= req.params.userId;
    var websiteId = req.params.websiteId;
    var pageId = req.params.pageId;
    pageModel
        .findPageById(pageId)
        .then(function(page){
           res.json(page);
        });
    // for (var p in pages){
    //     if (pages[p]._id === pageId){
    //         res.json(pages[p]);
    //         return;
    //     }
    // }
    // res.sendStatus(404);
}

function createPage(req,res){
    var userId= req.params.userId;
    var websiteId = req.params.websiteId;
    var page = req.body;
    pageModel
        .createPage(websiteId,page)
        .then(function(page){
            res.json(page);
        });
    // page.websiteId = websiteId;
    // page._id = (new Date()).getTime() + "";
    // pages.push(page);
    // res.json(page);
}

function findAllPagesByWebsiteId(req,res) {
    var userId= req.params.userId;
    var websiteId = req.params.websiteId;
    pageModel
        .findAllPagesByWebsiteId(websiteId)
        .then(function(pages){
            res.json(pages);
        });
    // var pagelist=[];
    // for (var p in pages){
    //     if (pages[p].websiteId === websiteId){
    //         pagelist.push(pages[p]);
    //     }
    // }
    // res.json(pagelist);
}

