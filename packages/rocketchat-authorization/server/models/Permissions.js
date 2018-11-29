import { RocketChat } from 'meteor/rocketchat:lib';

class ModelPermissions extends RocketChat.models._Base {
	constructor(...args) {
		super(...args);
		this.findByRole = RocketChat.memoize(this.findByRole);
		this.findOneById = RocketChat.memoize(this.findOneById);
	}

	// FIND
	findByRole(role, options) {
		const query = {
			roles: role,
		};

		return this.find(query, options);
	}

	findOneById(_id) {
		return this.findOne(_id);
	}

	createOrUpdate(name, roles) {
		this.upsert({ _id: name }, { $set: { roles } });
	}

	addRole(permission, role) {
		this.update({ _id: permission }, { $addToSet: { roles: role } });
	}

	removeRole(permission, role) {
		this.update({ _id: permission }, { $pull: { roles: role } });
	}
}

RocketChat.models.Permissions = new ModelPermissions('permissions');
