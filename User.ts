
// A property decorator. Class decorators are impractical, since
// properties don't exist until after construction.
function BackboneProperty<T> (prototype: T, propertyName: string) {

	Object.defineProperty (prototype, propertyName, {

		get: function () {

			return this._properties_[propertyName];
		},

		set: function (value) {

			console.log('Setting '+propertyName+' to '+value);

			if (!this._properties_) {
				this._properties_ = {};
			}

			this._properties_[propertyName] = value;
		}
	});
}

class User {

	@BackboneProperty email: string;
}

const user = new User();
user.email = 'test@example.com';
console.log('Email is: '+user.email);










class BackboneModel {

	set (properties: {[name: string]:any}) {

		Object.assign(this, properties);
	}
}

class BlogPostComment extends BackboneModel{

	@BackboneProperty userId: number;
	@BackboneProperty blogPostId: number;
	@BackboneProperty comment: string;

	constructor () {
		super();
		this.comment = 'blah';
	}
}

const blogPostComment = new BlogPostComment();
blogPostComment.userId = 123;
blogPostComment.blogPostId = 456;
blogPostComment.set({
	userId: 789,
	comment: 'wow'
});
console.log('userId is: '+blogPostComment.userId);




/*

function BackboneModel<T> (constructor: T) {

	function wrapConstructor() {
		const instance = new (<any>constructor)(arguments);

		// Replace all properties with accessors, triggering a Backbone event on set.
		Object.keys(instance)
			.reduce((prototype, propertyName) => {
			Object.defineProperty(prototype, propertyName, {
				get: function () {
					return this._properties_[propertyName];
				},
				set: function (value) {
					console.log('Setting ' + propertyName + ' to ' + value);
					if (!this._properties_) {
						this._properties_ = {};
					}
					this._properties_[propertyName] = value;
				}
			});
			return prototype;
		}, instance);

		instance._properties_ = {};

		return instance;
	}

	// Copy the old prototype, to avoid mutating it.
	Object.assign(wrapConstructor.prototype, (<any>constructor).prototype);

	return <T><any> wrapConstructor;
}


@BackboneModel
class BlogPostComment {

	userId: number;
	blogPostId: number;
	comment: string;

	constructor () {
		this.userId = 11111;
		this.blogPostId = null;
		this.comment = null;
	}
}

const blogPostComment = new BlogPostComment();
blogPostComment.userId = 123;
blogPostComment.blogPostId = 456;
console.log('userId is: '+blogPostComment.userId);

*/