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
			value: ''
			onChange: ->
			onAccept: ->
			# onTab: ->
			# onFilter: ->
			# textStyle: {}
			# suggestionStyle: {}

		}

	getInitialState: ->
		{
			value: @props.value or ''
			offsets:
				margin: 0
				padding: 0
			measuredWidth: 0
		}

	componentDidMount: ->
		@updateInputTextStyle()
		# @updateSuggestionPosition()

	componentWillReceiveProps: (nextProps) ->
		@setState
			value: nextProps.value
			suggestion: @getSuggestion nextProps.value

	handleChange: (ev) ->
		@props.onChange ev

	handleSuggestionClick: ->
		@refs.input.getDOMNode().focus()

	handleKeyDown: (ev) ->
		switch ev.key
			when 'Tab'
				if @props.acceptOnTab
					ev.preventDefault()
					@props.onAccept @state.suggestion
			when 'ArrowUp', 'ArrowDown'
				console.info 'TODO - implement up/down arrow key switching'

	updateInputTextStyle: ->
		node = @refs.input?.getDOMNode()
		computed = window.getComputedStyle node
		# Grab all relevant font styles
		cloned =
			letterSpacing: computed.letterSpacing
			wordSpacing: computed.wordSpacing
			textDecoration: computed.textDecoration
			textTransform: computed.textTransform
			lineHeight: computed.lineHeight
			fontStyle: computed.fontStyle
			fontVariant: computed.fontVariant
			fontWeight: computed.fontWeight
			fontSize: computed.fontSize
			fontFamily: computed.fontFamily

		offsets =
			padding: Number computed.paddingLeft.replace 'px', ''
			border: Number computed.borderLeftWidth.replace 'px', ''
			height: Number computed.height.replace 'px', ''

		@setState
			clonedStyle: cloned
			offsets: offsets

	getSuggestionStyle: ->
		style = @style.suggestion
		for k, v of @state.clonedStyle
			style[k] = v
		sideOffset = @state.offsets.padding + @state.offsets.border
		style.left = sideOffset + @state.measuredWidth
		style.height = @state.offsets.height
		style

	getRulerWrapperStyle: ->
		style = @style.rulerWrapper
		for k, v of @state.clonedStyle
			style[k] = v
		style

	getSuggestion: (text) ->
		text = text.toLowerCase()
		if text
			for suggestion in @props.suggestions
				if suggestion.toLowerCase().indexOf(text) is 0
					return suggestion

	renderSuggestion: ->
		if @state.suggestion
			@state.suggestion.toLowerCase().replace @state.value.toLowerCase(), ''

	render: ->
		<div style={@style.wrapper}>
			<input ref="input" type="text" style={@style.input} value={@state.value} onChange={@handleChange} onKeyDown={@handleKeyDown}></input>
			<div style={@getSuggestionStyle()} onClick={@handleSuggestionClick}>{@renderSuggestion()}</div>
			<pre style={@getRulerWrapperStyle()}>
				<span style={@style.ruler} ref="ruler">{@state.value}</span>
			</pre>
		</div>

	componentDidUpdate: (prevProps, prevState) ->
		unless prevState.value is @state.value
			@updateSuggestionPosition()

	updateSuggestionPosition: ->
		@setState
			measuredWidth: @refs.ruler.getDOMNode().offsetWidth

	style:
		wrapper:
			# padding: 6
			overflow: 'auto'
			whiteSpace: 'nowrap'
			position: 'relative'

		input: 
			width: '100%'
			display: 'block'
			boxSizing: 'border-box'
			opacity: 1

		suggestion:
			position: 'absolute'
			top: 0
			# marginLeft: 6
			display: 'flex'
			flexDirection: 'column'
			justifyContent: 'center'
			# backgroundColor: 'green'
			opacity: 0.5

		rulerWrapper:
			position: 'absolute'
			top: 0
			zIndex: -1
			width: 0
			overflow: 'hidden'
			backgroundColor: 'red'
			opacity: 1
			padding: 0
			margin: 0


module.exports = Autosuggest