var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// A property decorator. Class decorators are impractical, since
// properties don't exist until after construction.
function BackboneProperty(prototype, propertyName) {
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
}
class User {
}
__decorate([
    BackboneProperty
], User.prototype, "email", void 0);
const user = new User();
user.email = 'test@example.com';
console.log('Email is: ' + user.email);
class BackboneModel {
    set(properties) {
        Object.assign(this, properties);
    }
}
class BlogPostComment extends BackboneModel {
    constructor() {
        super();
        this.comment = 'blah';
    }
}
__decorate([
    BackboneProperty
], BlogPostComment.prototype, "userId", void 0);
__decorate([
    BackboneProperty
], BlogPostComment.prototype, "blogPostId", void 0);
__decorate([
    BackboneProperty
], BlogPostComment.prototype, "comment", void 0);
const blogPostComment = new BlogPostComment();
blogPostComment.userId = 123;
blogPostComment.blogPostId = 456;
blogPostComment.set({
    userId: 789,
    comment: 'wow'
});
console.log('userId is: ' + blogPostComment.userId);
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
