const model = require('../../../model');

class Category {
	static async create(params) {
		const { name, code, parent_id = 0 } = params;

		const hasCategory = await model.Category.findOne({
			where: {
				code
			}
		});

		if (hasCategory) {
			throw new global.errs.ParameterException('存在重复的分类');
		}

		await model.Category.create(params);
	}

	static async destroy(id) {
		const result = await model.Category.findOne({
			where: {
				id
			}
		});

		if (!result) {
			throw new global.errs.ParameterException('没有找到相关分类');
		}

		result.destroy();
	}

	static async update(body) {
		const result = await model.Category.findOne({
			where: {
				id: body.id
			}
		});

		if (!result) {
			throw new global.errs.ParameterException('没有找到相关分类');
		}

		Object.assign(result, body);

		await result.save();
	}

	static async list() {
		return await model.Category.findAll();
	}

	static async detail(id) {
		const result = await model.Category.findOne({
			where: {
				id
			}
		});

		if (!result) {
			throw new global.errs.ParameterException('没有找到相关分类');
		}

		return result;
	}
}

module.exports = Category;
