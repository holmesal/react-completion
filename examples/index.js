var React = require('react');

var App = React.createClass({

	render: function() {
		return (
			<p>hey i am the app</p>
		);
	}

});

React.render <App/>, document.getElementById('app')

module.exports = App