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

### Run

To run examples on the local machine:

```
$ git clone git@github.com:holmesal/react-completion.git
$ cd react-completition
$ npm install
$ npm run example
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
