const db = require('../db');

module.exports = db.defineModel('categorys', {
	name: {
		type: db.STRING(36),
		comment: '分类名称'
	},
	code: {
		type: db.STRING(36),
		comment: '分类编码'
	},
	parent_id: {
		type: db.ID,
		defaultValue: '0',
		comment: '分类父级编号'
	}
});
