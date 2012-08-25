/* System Library */
var sys = require('sys'),
	OperationHelper = require('apac').OperationHelper;
	
var opHelper = new OperationHelper({
	awsId: '',
	awsSecret: '',
	assocId: '',	
});

App = Ember.Application.create();

/* MODEL */
App.Book = Ember.Object.extend({
	asin: '',
	title: '',
	url: '',
	thumbnail: '',
	price: '',
	author: '',
	date: '',
	publisher: '',
	isbn: '';
});

/* Controller */
App.booksController = Ember.ArrayController.create({
	book: [],
	
	create : function() {
	
	},
	
	destroy : function() {
	
	},
	
	failure : function() {
	
	},
	
	loadBooks : function() {
		opHelper.execute('ItemSearch', {
			'SearchIndex' : 'Books',
			'Keywords' : 'Programming',
			'ResponseGroup' : 'ItemAttributes, Offers'
		}, function(error, results) {
			if(!error) {
				for( i = 0; i < 5; i++ ) {
					this.set('content',[]);
					$(results).each(function (index, value){
						var aBook = App.Book.create({
							asin : value.Item.asin,
							url : value.Item.DetailPageURL,
							thumbnail : value.Item.MediumImage.URL,
							author : value.Item.ItemAttributes.Author,
							publisher : value.Item.ItemAttributes.Manufacturer,
							date : value.Item.ItemAttributes.PublicationDate,
							isbn : value.Item.ItemAttributes.ISBN,
							title : value.Item.ItemAttributes.Title,
							price : value.Item.ItemAttributes.ListPrice.FormattedPrice;
						});
					});
				}
			}
		}
	}
});

App.booksController.loadBooks();

/* View */
App.ImgView = Ember.View.extend({
	tagName : 'img'
});