# react-completion

Get completion suggestions in-line, as you type.

![sweet gif](http://zippy.gfycat.com/GrouchyRewardingInvisiblerail.gif)

## Install

`npm install --save react-completion`

## Example

[Live demo](https://jsfiddle.net/aulizko/8gs43etv/embedded/result/)

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

	handleAccept: function(suggestion) {
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

`suggestions` *Array of Strings* **required** - the suggestions to be matched

`value` *String* **required** - the text value of the input

`acceptOnEnter` *Boolean* (default `true`) - hitting the Enter key will accept the current suggestion

`acceptOnTab` *Boolean* (default `true`) - hitting the Tab key will accept the current suggestion

`onSuggestionChange(suggestion)` - called when the suggestion changes.

`onSuggestionAccept(suggestion)` - called when the user accepts a suggestion by pressing tab.

## todo

* Add support for uncontrolled components
* Add props to style the `<input>` and suggestion styles
* Add the ability to cycle through suggestions with the up/down arrow keys
* Unit testssssssssss
