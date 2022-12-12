const mongoose = require('mongoose');
const marked = require('marked');

const slugify = require('slugify');
// const createDomPurify = require('dompurify');
// const { JSDOM } = require('jsdom')
// const dompurify = createDomPurify(new JSDOM().window)

const Newarticles = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String
	},

	markdown: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	},
	slug: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true
	}
})

Newarticles.pre('validate', function(next) {
	if(this.title)
	{
		this.slug = slugify(this.title, {lower: true, strict: true});
	}

	// if(this.markdown) {
	// 	this.SanitizeHtml = dompurify.sanitize(marked(this.markdown));
	// }
	next();
})

module.exports = mongoose.model('Article', Newarticles);