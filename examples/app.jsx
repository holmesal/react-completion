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

	style: {
		wrapper: {
			width: '100%',
			height: '100%',
			display: 'flex',
			fontSize: '24px',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			fontFamily: 'Avenir'
		}
	}

});

React.render(<Example/>, document.getElementById('app'));