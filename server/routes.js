'use strict';

module.exports.index = function(req, res){
  res.render('pages/index', {user: "Great User",title:"homepage"});
};

module.exports.about = function(req, res){
  res.render('pages/about', {title:"about page"});
};
