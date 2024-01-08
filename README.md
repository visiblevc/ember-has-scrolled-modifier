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

- `direction`: tracks scroll direction. Possible values are 'vertical', 'horizontal'.
- `callback`: will be called when scroll event happened. An object will be passed as an argument with two boolean values:

  - `hasScrolled`: is `true` if the element was scrolled, is `false` otherwise.
  - `hasRemainingScroll`: is `true` if the element has some scroll left, is `false` otherwise.

Both values are `false` when the element has no scroll.


Contributing
------------------------------------------------------------------------------

PRs are welcome.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
