# react-completion

Get completion suggestions in-line, as you type.

(insert sweet gif here)

## Install

`npm install --save react-completion`

## Example

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

	handleAccept: function(suggestion) {
		console.info('the user accepted the suggestion: ' + suggestion);
		this.setState({
			text: suggestion
		});
	},

	render: function() {
		return (
			<div>
				<Completion
					suggestions={states}
					value={this.state.text}
					onChange={this.handleChange}
					onAccept={this.handleAccept}/>
			</div>
		);
	}

});

React.render(<Example/>, document.getElementById('app'));
```

## Properties

This API aims to align as closely as possible with the native `<input>`.

`suggestions` (*Array of Strings*) - the suggestions to be matched.

`value` *String* - the text value of the input

`onChange(ev)` - called when the input value changes. 

`onAccept(suggestion)` - called when the user accepts a suggestion by pressing tab.

## todo

* Add support for uncontrolled components
* Add props to style the textarea
* Add prop to control suggestion styles
* Add the ability to cycle through suggestions with the up/down arrow keys
