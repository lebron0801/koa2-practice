const Sequelize = require('sequelize');
const uuid = require('node-uuid');
const config = require('./config/db-config');

function generateId() {
	return uuid.v4();
}

// 实例化ORM框架
var sequelize = new Sequelize(config.database, config.username, config.password, {
	host: config.host,
	dialect: config.dialect,
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

const ID_TYPE = Sequelize.STRING(50);

function defineModel(name, attributes) {
	var attrs = {};

	attrs.id = {
		type: ID_TYPE,
		primaryKey: true
	};

	for (let key in attributes) {
		let value = attributes[key];
		if (typeof value === 'object' && value['type']) {
			value.allowNull = value.allowNull || false;
			attrs[key] = value;
		} else {
			attrs[key] = {
				type: value,
				allowNull: false
			};
		}
	}

	attrs.created_at = {
		type: Sequelize.BIGINT,
		allowNull: false
	};

	attrs.updated_at = {
		type: Sequelize.BIGINT,
		allowNull: false
	};

	attrs.version = {
		type: Sequelize.BIGINT,
		allowNull: false
	};

	return sequelize.define(name, attrs, {
		tableName: name,
		timestamps: false,
		charset: 'utf8mb4',
		collate: 'utf8mb4_unicode_ci',
		hooks: {
			beforeUpdate: function (instance) {
				console.log('更新数据');
				instance.updated_at = Date.now();
				instance.version++;
			},
			beforeValidate: function (instance) {
				console.log('只判断是否是创建');
				let now = Date.now();
				if (instance.isNewRecord) {
					if (!instance.id) {
						instance.id = generateId();
					}
					instance.created_at = now;
					instance.updated_at = now;
					instance.version = 0;
				}
			}
		}
	});
}

const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN'];

var exp = {
	defineModel: defineModel,
	sync: () => {
		// only allow create ddl in non-production environment:
		if (process.env.NODE_ENV !== 'production') {
			// 一次性同步所有模型到数据库表
			// 如果数据库表已经存在，则先删除数据库表，然后重新创建数据表
			sequelize.sync({ force: true });
		} else {
			throw new Error("Cannot sync() when NODE_ENV is set to 'production'.");
		}
	}
};

for (let type of TYPES) {
	exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.generateId = generateId;

module.exports = exp;
