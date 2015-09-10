var React = require('react');
var Autosuggest = require('../react-autosuggest');

var Example = React.createClass({

	render: function() {
		var states = ['Alabama', 'Arkansas'];
		return (
			<div style={{width: 300}}>
				<Autosuggest />
			</div>
		);
	}

});

React.render(<Example/>, document.getElementById('app'));