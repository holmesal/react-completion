React = require('react')

Autosuggest = React.createClass

	propTypes:

		# If provided, this will be a controlled component
		value: React.PropTypes.string
		# An array of possible suggestions
		suggestions: React.PropTypes.array.isRequired
		# if true, accept the current suggestion when the tab key is pressed. fires `onAccept`
		acceptOnTab: React.PropTypes.bool

	getDefaultProps: ->
		{
			suggestions: []
			acceptOnTab: true
			onChange: ->
			onTab: ->
			onFilter: ->
			textStyle: {}
			suggestionStyle: {}

		}
	


	render: ->
		<div style={@style.wrapper}>
			<input type="text" style={@style.input} />
			<span style={@style.suggestion}>suggestion</span>
		</div>

	style:
		wrapper:
			backgroundColor: 'red'
			padding: 6
			overflow: 'auto'
			whiteSpace: 'nowrap'
			position: 'relative'

		input: 
			# width: '100%'
			display: 'inline-block'
			boxSizing: 'border-box'

		suggestion:
			position: 'absolute'
			top: 0
			left: 0

module.exports = Autosuggest