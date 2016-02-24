import React, { cloneElement, Children, Component, PropTypes } from 'react';
import Dock from 'react-dock';
import parseKey from 'parse-key';
import JSONTree from 'react-json-tree'
import CoreStore from 'focus-core/store/CoreStore'
export default class DockDX extends Component {

  static propTypes = {
    defaultIsVisible: PropTypes.bool.isRequired,
    defaultSize: PropTypes.number.isRequired,
    toggleVisibilityKey: PropTypes.string.isRequired,
    fluid: PropTypes.bool,
  };

  static defaultProps = {
    defaultIsVisible: true,
    defaultPosition: 'right',
    defaultSize: 0.3,
    fluid: true
  };

  constructor(props) {
    super(props);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.toggleVisibility = this.toggleVisibility.bind(this);
    this.state = {isVisible : this.props.defaultIsVisible}
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  matchesKey(key, event) {
    if (!key) {
      return false;
    }

    const charCode = event.keyCode || event.which;
    const char = String.fromCharCode(charCode);
    return key.name.toUpperCase() === char.toUpperCase() &&
      key.alt === event.altKey &&
      key.ctrl === event.ctrlKey &&
      key.meta === event.metaKey &&
      key.shift === event.shiftKey;
  }

  handleKeyDown(e) {
    // Ignore regular keys when focused on a field
    // and no modifiers are active.
    if ((
      !e.ctrlKey && !e.metaKey && !e.altKey
    ) && (
      e.target.tagName === 'INPUT' ||
      e.target.tagName === 'SELECT' ||
      e.target.tagName === 'TEXTAREA' ||
      e.target.isContentEditable
    )) {
      return;
    }

    const visibilityKey = parseKey(this.props.toggleVisibilityKey);


    if (this.matchesKey(visibilityKey, e)) {
      e.preventDefault();
      this.toggleVisibility();
    }
  }

  toggleVisibility(){
    this.setState({isVisible: !this.state.isVisible});
  }
  render() {
    const { children, fluid, ...rest } = this.props;
    const {  isVisible} = this.state;
    const JSONState = Object.keys(CoreStore.prototype._instances).reduce((res, current) => {
      res[CoreStore.prototype._instances[current].constructor.name] =  CoreStore.prototype._instances[current].getValue();
      return res;
    }, {});

    const routes = Backbone.history.handlers.map(function(r){return r.route.toString().split('(')[0]});
    return (
      <Dock position={'right'}
            isVisible={isVisible}
            fluid={fluid}
            dimMode='none'>
          <h3>Focus stores</h3>
          <JSONTree data={JSONState} />
          <h3>Routes</h3>
          <JSONTree data={routes} />
      </Dock>
    );
  }
}