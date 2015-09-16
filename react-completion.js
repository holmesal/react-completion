// Generated by CoffeeScript 1.9.3
(function() {
  var Autosuggest, React;

  React = require('react');

  Autosuggest = React.createClass({displayName: "Autosuggest",
    propTypes: {
      value: React.PropTypes.string,
      suggestions: React.PropTypes.array.isRequired,
      acceptOnTab: React.PropTypes.bool,
      acceptOnEnter: React.PropTypes.bool,
      onSuggestionChange: React.PropTypes.func,
      onSuggestionAccept: React.PropTypes.func
    },
    getDefaultProps: function() {
      return {
        suggestions: [],
        acceptOnTab: true,
        acceptOnEnter: true,
        value: '',
        onSuggestionChange: function() {},
        onSuggestionAccept: function() {}
      };
    },
    getInitialState: function() {
      return {
        value: this.props.value || '',
        offsets: {
          margin: 0,
          padding: 0
        },
        measuredWidth: 0
      };
    },
    componentDidMount: function() {
      return this.updateInputTextStyle();
    },
    componentWillReceiveProps: function(nextProps) {
      var base, suggestion;
      suggestion = this.getSuggestion(nextProps.value);
      this.setState({
        value: nextProps.value,
        suggestion: suggestion
      });
      if (suggestion !== this.state.suggestion) {
        return typeof (base = this.props).onSuggestionChange === "function" ? base.onSuggestionChange(suggestion) : void 0;
      }
    },
    handleSuggestionClick: function() {
      return this.refs.input.getDOMNode().focus();
    },
    handleKeyDown: function(ev) {
      var base;
      switch (ev.key) {
        case 'Tab':
          if (this.props.acceptOnTab) {
            ev.preventDefault();
            if (this.state.suggestion) {
              this.props.onSuggestionAccept(this.state.suggestion);
            }
          }
          break;
        case 'Enter':
          if (this.props.acceptOnEnter) {
            ev.preventDefault();
            if (this.state.suggestion) {
              this.props.onSuggestionAccept(this.state.suggestion);
            }
          }
          break;
        case 'ArrowUp':
        case 'ArrowDown':
          console.info('TODO - implement up/down arrow key switching');
      }
      return typeof (base = this.props).onKeyDown === "function" ? base.onKeyDown(ev) : void 0;
    },
    updateInputTextStyle: function() {
      var cloned, computed, node, offsets, ref;
      node = (ref = this.refs.input) != null ? ref.getDOMNode() : void 0;
      computed = window.getComputedStyle(node);
      cloned = {
        letterSpacing: computed.letterSpacing,
        wordSpacing: computed.wordSpacing,
        textDecoration: computed.textDecoration,
        textTransform: computed.textTransform,
        lineHeight: computed.lineHeight,
        fontStyle: computed.fontStyle,
        fontVariant: computed.fontVariant,
        fontWeight: computed.fontWeight,
        fontSize: computed.fontSize,
        fontFamily: computed.fontFamily
      };
      offsets = {
        padding: Number(computed.paddingLeft.replace('px', '')),
        border: Number(computed.borderLeftWidth.replace('px', '')),
        height: Number(computed.height.replace('px', ''))
      };
      return this.setState({
        clonedStyle: cloned,
        offsets: offsets
      });
    },
    getSuggestionStyle: function() {
      var k, ref, sideOffset, style, v;
      style = this.style.suggestion;
      ref = this.state.clonedStyle;
      for (k in ref) {
        v = ref[k];
        style[k] = v;
      }
      sideOffset = this.state.offsets.padding + this.state.offsets.border;
      style.left = sideOffset + this.state.measuredWidth;
      style.height = this.state.offsets.height;
      return style;
    },
    getRulerWrapperStyle: function() {
      var k, ref, style, v;
      style = this.style.rulerWrapper;
      ref = this.state.clonedStyle;
      for (k in ref) {
        v = ref[k];
        style[k] = v;
      }
      return style;
    },
    getInputStyle: function() {
      var k, ref, style, v;
      style = this.style.input;
      ref = this.props.style;
      for (k in ref) {
        v = ref[k];
        style[k] = v;
      }
      return style;
    },
    getSuggestion: function(text) {
      var i, len, ref, suggestion;
      text = text.toLowerCase();
      if (text) {
        ref = this.props.suggestions;
        for (i = 0, len = ref.length; i < len; i++) {
          suggestion = ref[i];
          if (suggestion.toLowerCase().indexOf(text) === 0) {
            return suggestion;
          }
        }
      }
    },
    focus: function() {
      return React.findDOMNode(this.refs.input).focus();
    },
    renderSuggestion: function() {
      if (this.state.suggestion) {
        return this.state.suggestion.toLowerCase().replace(this.state.value.toLowerCase(), '');
      }
    },
    render: function() {
      return React.createElement("div", {
        "style": this.style.wrapper
      }, React.createElement("input", React.__spread({}, this.props, {
        "ref": "input",
        "type": "text",
        "style": this.getInputStyle(),
        "value": this.state.value,
        "onKeyDown": this.handleKeyDown
      })), React.createElement("div", {
        "style": this.getSuggestionStyle(),
        "onClick": this.handleSuggestionClick
      }, this.renderSuggestion()), React.createElement("pre", {
        "style": this.getRulerWrapperStyle()
      }, React.createElement("span", {
        "style": this.style.ruler,
        "ref": "ruler"
      }, this.state.value)));
    },
    componentDidUpdate: function(prevProps, prevState) {
      if (prevState.value !== this.state.value) {
        return this.updateSuggestionPosition();
      }
    },
    updateSuggestionPosition: function() {
      return this.setState({
        measuredWidth: this.refs.ruler.getDOMNode().offsetWidth
      });
    },
    style: {
      wrapper: {
        overflow: 'auto',
        whiteSpace: 'nowrap',
        position: 'relative'
      },
      input: {
        width: '100%',
        display: 'block',
        boxSizing: 'border-box',
        opacity: 1,
        padding: 10
      },
      suggestion: {
        position: 'absolute',
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        opacity: 0.5
      },
      rulerWrapper: {
        position: 'absolute',
        top: 0,
        zIndex: -1,
        width: 0,
        overflow: 'hidden',
        backgroundColor: 'red',
        opacity: 1,
        padding: 0,
        margin: 0
      }
    }
  });

  module.exports = Autosuggest;

}).call(this);
