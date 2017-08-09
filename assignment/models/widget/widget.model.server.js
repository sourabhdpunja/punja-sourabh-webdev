/**
 * Created by Sourabh Punja on 8/7/2017.
 */
var mongoose = require('mongoose');
var widgetSchema = require('./widget.schema.server');
var db = require('../database');
var widgetModel = mongoose.model('WidgetModel',widgetSchema);
var pageModel = require('../page/page.model.server');

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForThePage = findAllWidgetsForThePage;
widgetModel.findWidgetByWidgetId = findWidgetByWidgetId;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget  = deleteWidget;
widgetModel.deleteInvalidWidget  = deleteInvalidWidget;
widgetModel.reorderWidget = reorderWidget;


module.exports = widgetModel;


function createWidget(pageId,widget){
    widget._page = pageId;
    var widgetTmp = null;
    return widgetModel
        .create(widget)
        .then(function (widget){
            widgetTmp = widget;
           return pageModel
                .addWidget(pageId,widget._id);
        })
        .then(function (page){
            return widgetTmp;
        });
}

function findAllWidgetsForThePage(pageId){
    // return widgetModel
    //     .find({_page:pageId})
    //     .populate('_page')
    //     .exec();
    return pageModel
        .findPageById(pageId)
        .populate('widgets')
        .exec()
        .then(function (page){
            return page.widgets;
        });
}

function findWidgetByWidgetId(widgetId){
    return widgetModel
        .findById(widgetId);
}

function updateWidget(widgetId,widget){
    return widgetModel
        .update({_id:widgetId},{$set:widget});
}

function deleteWidget(pageId,widgetId){
    return widgetModel
        .remove({_id:widgetId})
        .then(function(status){
            return pageModel
                .deleteWidget(pageId,widgetId)
        });
}
function deleteInvalidWidget(){
    return widgetModel
        .find()
        .then(function(widgets){
            for (var w in widgets){
                if (typeof widgets[w].text === 'undefined' && widgets[w].widgetType === 'HEADING')
                {
                    // widgets.splice(w,1);
                    console.log(typeof widgets[w].text);
                    console.log(widgets[w]._id);
                   return  widgetModel
                        .remove({_id:widgets[w]._id})
                       .then(function(status){
                           return pageModel
                               .deleteWidget(widgets[w]._page,widgets[w]._id)
                       },function (err){
                           console.log(err);
                       });
                }
                else if ((typeof widgets[w].url === 'undefined' || typeof widgets[w].width === 'undefined') && widgets[w].widgetType === 'IMAGE')
                {
                    return widgetModel
                        .remove({_id:widgets[w]._id})
                        .then(function (status){
                            return pageModel
                                .deleteWidget(widgets[w]._page,widgets[w]._id);
                        });
                }
                else if (typeof widgets[w].url === 'undefined' && typeof widgets[w].width === 'undefined' && widgets[w].widgetType === 'YOUTUBE')
                {
                    widgetModel
                        .remove({_id:widgets[w]._id})
                     .then(function (status){
                            return pageModel
                            .deleteWidget(widgets[w]._page,widgets[w]._id);
                         });
                }
                else if (typeof widgets[w].text === 'undefined' && widgets[w].widgetType === 'HTML')
                {
                    widgetModel
                        .remove({_id:widgets[w]._id})
                        .then(function (status){
                            return pageModel
                                .deleteWidget(widgets[w]._page,widgets[w]._id);
                        });
                }
                else if (typeof widgets[w].rows === 'undefined' && widgets[w].widgetType === 'INPUT')
                {
                    widgetModel
                        .remove({_id:widgets[w]._id})
                        .then(function (status){
                            return pageModel
                                .deleteWidget(widgets[w]._page,widgets[w]._id);
                        });
                }
                else{
                    continue;
                }
            }
        })
        .then(function (){
            return widgetModel
                .find();
        });
}

function reorderWidget(pageId, start, end){
    return pageModel
        .findPageById(pageId)
        .populate('widgets')
        .exec()
        .then(function (page){
            var widgets = page.widgets;
            widgets.splice(end,0,(widgets.splice(start,1))[0]);
            page.widgets = widgets
            pageModel
                .updatePage(pageId,page)
                .then(function (status){
                    return widgets;
                });
        });
}

