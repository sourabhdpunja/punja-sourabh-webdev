/**
 * Created by Sourabh Punja on 7/28/2017.
 */
var app = require("../express");

var websites = [
    { "_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem" },
    { "_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem" },
    { "_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem" },
    { "_id": "890", "name": "Go",          "developerId": "123", "description": "Lorem" },
    { "_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem" },
    { "_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem" },
    { "_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem" }
];

app.get("/api/user/:userId/website",findWebsitesForUser);
app.get("/api/user/:userId/website/:websiteId",findWebsiteById);
app.post("/api/user/:userId/website",createWebsite);
app.put("/api/user/:userId/website/:websiteId",updateWebsite);
app.delete("/api/user/:userId/website/:websiteId",deleteWebsite);

function deleteWebsite(req,res){
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    for(var w in websites) {
            if (websites[w]._id === websiteId) {
                var index = websites.indexOf(websites[w]);
                websites.splice(index, 1);
                res.sendStatus(200);
                return;
            }
    }
    res.sendStatus(404);
}

function updateWebsite(req, res){
    var userId = req.params.userId;
    var websiteId = req.params.websiteId;
    var website = req.body;
    for(var w in websites) {
            if(websites[w]._id === websiteId) {
                websites[w] = website;
                res.json(websites[w]);
                return;
            }
        }
        res.sendStatus(404);
}

function createWebsite(req, res) {
    var userId = req.params.userId;
    var website = req.body;
    website._id = (new Date()).getTime() + "";
    website.developerId = userId;
    websites.push(website);
    res.json(website);
    }
    // console.log(sites);
    // res.json(sites);
// }

function findWebsiteById(req,res){
    var website = websites.find(function (website){
           return website._id === req.params.websiteId;
        });
         res.json(website);
}

function findWebsitesForUser(req,res){
    var userId = req.params.userId;
    var sites = [];
    for(var w in websites) {
        if(websites[w].developerId === userId) {
            sites.push(websites[w]);
        }
    }
    res.json(sites);
}
