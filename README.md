# react-completion

Get completion suggestions in-line, as you type.

![sweet gif](http://zippy.gfycat.com/GrouchyRewardingInvisiblerail.gif)

**This is still verrrrrrrry beta, and the api is subject to change. Please, don't use in critical financial infrastructure quite yet.**

## Install

`npm install --save react-completion`

## Example

[Live demo](http://holmesal.github.io/react-completion)

[view source](./examples/app.jsx)

```javascript
var React = require('react');
var Completion = require('../react-completion');
var states = require('./states.json');

var Example = React.createClass({

	getInitialState: function() {
		return {
			text: ''
		};
	},

	handleChange: function(ev) {
		this.setState({
			text: ev.target.value
		});
	},

	handleSuggestionChange: function(suggestion) {
		console.info('the suggestion changed to ' + suggestion);
	},

	handleSuggestionAccept: function(suggestion) {
		console.info('the user accepted the suggestion: ' + suggestion);
		this.setState({
			text: suggestion
		});
	},

	render: function() {
		return (
			<div style={this.style.wrapper}>
				<Completion
					suggestions={states}
					value={this.state.text}
					onChange={this.handleChange}
					onSuggestionChange={this.handleSuggestionChange}
					onSuggestionAccept={this.handleAccept}/>
			</div>
		);
	},

});

React.render(<Example/>, document.getElementById('app'));
```

### Run

To run examples on the local machine:

```
$ git clone git@github.com:holmesal/react-completion.git
$ cd react-completition
$ npm install
$ npm run example
```

## Properties

This component wraps an `<input>`, so **all input-compatible properties are supported**. Note the use of the `onChange` property in the above example.

* `suggestions` *Array of Strings* **required** - the suggestions to be matched

* `value` *String* **required** - the text value of the input

* `acceptOnEnter` *Boolean* (default `true`) - hitting the Enter key will accept the current suggestion

* `acceptOnTab` *Boolean* (default `true`) - hitting the Tab key will accept the current suggestion

* `onSuggestionChange(suggestion)` - called when the suggestion changes.

* `onSuggestionAccept(suggestion)` - called when the user accepts a suggestion by pressing tab.

## Gotchas

### `.focus()`

Because you're asking a react component to `.focus()` instead of an HTML element, you need to use the form 

`this.refs.yourCompletionRef.focus()` 

instead of 

`React.findDOMNode(this.refs.yourCompletionRef).focus()`.

Exposing component functions [doesn't seem especially encouraged in the docs](https://facebook.github.io/react/tips/expose-component-functions.html). Have a better idea for this API? Send a PR!

## todo

* Add support for uncontrolled components
* Add props to style the `<input>` and suggestion styles
* Add the ability to cycle through suggestions with the up/down arrow keys
* Unit testssssssssss
