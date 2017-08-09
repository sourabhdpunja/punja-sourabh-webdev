/**
 * Created by Sourabh Punja on 8/6/2017.
 */

var mongoose = require('mongoose');
var pageSchema = require('./page.schema.server');
var db = require('../database');

var pageModel = mongoose.model('PageModel',pageSchema);
var websiteModel = require('../website/website.model.server');


pageModel.findAllPagesByWebsiteId = findAllPagesByWebsiteId;
pageModel.createPage = createPage;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;
pageModel.addWidget = addWidget;
pageModel.deleteWidget = deleteWidget;

module.exports = pageModel;

function addWidget(pageId,widgetId){
    return pageModel
        .findPageById(pageId)
        .then(function (page){
            page.widgets.push(widgetId);
            return page.save();
        });
}

function deleteWidget(pageId,widgetId){
    return pageModel
        .findPageById(pageId)
        .then(function (page){
            var index = page.widgets.indexOf(widgetId);
            page.widgets.splice(index,1);
            return page.save();
        });
}

function findAllPagesByWebsiteId(websiteId){
    return pageModel
        .find({websiteId:websiteId})
        .populate('websiteId')
        .exec();
}

function createPage(websiteId,page){
    page.websiteId = websiteId;
    var pageTmp = null;
    return pageModel
        .create(page)
        .then(function (page){
            pageTmp = page;
            return websiteModel
                .addPage(websiteId,page._id);
        })
        .then(function (website){
        return pageTmp;
    });
}

function findPageById(pageId){
    return pageModel.findById(pageId);
}

function updatePage(pageId,page){
    return pageModel.update({_id : pageId},{$set : page });
}

function deletePage(websiteId,pageId){
    return pageModel.remove({_id: pageId})
        .then(function (status){
            return websiteModel
                .deletePage(websiteId,pageId);
        });
}