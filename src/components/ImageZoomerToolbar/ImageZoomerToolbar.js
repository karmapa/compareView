import React, {PropTypes, Component} from 'react';
import shallowCompare from 'react-addons-shallow-compare';

export default class ImageZoomerToolbar extends Component {

  static propTypes = {
    className: PropTypes.string.isRequired,
    inputValue: PropTypes.string.isRequired,
    onAddButtonClick: PropTypes.func.isRequired,
    onInputBlur: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onMinusButtonClick: PropTypes.func.isRequired
  };

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  render() {
    const {inputValue, onAddButtonClick, onInputBlur, onInputChange, onMinusButtonClick} = this.props;
    return (
      <div className={this.props.className}>
        <button className="button-minus" onClick={onMinusButtonClick}>
          -
        </button>
        <input className="input" type="text" onChange={onInputChange} onBlur={onInputBlur} value={inputValue} />
        <button className="button-add" onClick={onAddButtonClick}>
          +
        </button>
      </div>
    );
  }
}
