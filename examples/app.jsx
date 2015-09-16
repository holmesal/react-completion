var React = require('react');
var Completion = require('../react-completion');
var states = require('./states.json');

var Example = React.createClass({

	// This is a controlled component, so we'll be managing the value of the input ourselves
	getInitialState: function() {
		return {
			text: ''
		};
	},

	// Focus on the input when the component mounts
	componentDidMount: function() {
		this.refs.input.focus();
	},

	// When the input value changes, update our state
	handleChange: function(ev) {
		this.setState({
			text: ev.target.value
		});
	},

	// Called when the suggestion changes
	handleSuggestionChange: function(suggestion) {
		console.info('the suggestion changed to ' + suggestion);
	},

	// Called when the user accepts a suggestion by pressing Tab or Enter
	// For this example, we'll just update the text value to the accepted suggestion
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
					ref="input"
					suggestions={states}
					value={this.state.text}
					onChange={this.handleChange}
					onSuggestionChange={this.handleSuggestionChange}
					onSuggestionAccept={this.handleSuggestionAccept}/>
				<p style={{fontSize: 14, marginTop: 60}}>(start typing the name of a U.S. state)</p>
			</div>
		);
	},

	style: {
		wrapper: {
			width: '100%',
			height: '100%',
			display: 'flex',
			fontSize: '24px',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center'
		}
	}

});

React.render(<Example/>, document.getElementById('app'));