const db = require('../db');

module.exports = db.defineModel('articles', {
	category_id: {
		type: db.ID,
		comment: '文章分类'
	},
	title: {
		type: db.STRING(36),
		comment: '文章标题'
	},
	author: {
		type: db.STRING(36),
		comment: '文章作者'
	},
	content: {
		type: db.TEXT,
		comment: '文章内容'
	},
	description: {
		type: db.STRING(36),
		comment: '文章简介'
	},
	keyword: {
		type: db.STRING(36),
		defaultValue: '0',
		comment: '文章关键字'
	},
	cover: {
		type: db.STRING(36),
		comment: '文章封面'
	},
	browse: {
		type: db.INTEGER,
		defaultValue: 0,
		comment: '文章浏览次数'
	}
});
