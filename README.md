ember-has-scrolled-modifier
==============================================================================

This addon provides `has-scrolled` modifier which helps to understand whether the element was scrolled or not.


Compatibility
------------------------------------------------------------------------------

* Ember.js v3.20 or above
* Ember CLI v3.20 or above
* Node.js v12 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-has-scrolled-modifier
```


Usage
------------------------------------------------------------------------------

`has-scrolled` modifier accepts two positional arguments:

- `direction`: tracks scroll direction. Possible values are 'vertical', 'horizontal'
- `callback`: will be called when scroll event happened. A boolean argument will be passed which indicates if the element was scrolled in the specified direction.


Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
