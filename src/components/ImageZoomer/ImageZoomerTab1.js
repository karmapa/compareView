import Animator from './Animator';
import ImageZoomerToolbarTab1 from '../ImageZoomerToolbar/ImageZoomerToolbarTab1';
import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import shallowCompare from 'react-addons-shallow-compare';
import './ImageZoomer.scss';

const MOVING_SPEED = 1.3;
const DELTA_PERCENT = 25;

export default class ImageZoomer extends Component {

  static propTypes = {
    src: PropTypes.string
  };

  constructor(props) {
    super(props);
    this.state = {
      percent: 100,
      inputValue: '100%',
      translateX: 0,
      translateY: 0,
      isHolding: false,
      isDragging: false
    };
  }

  container = {
    width: 0,
    height: 0
  };

  image = {
    width: 0,
    height: 0
  };

  mouse = {
    x: null,
    y: null,
    event: null,
    onMouseMove: null,
    onMouseUp: null
  };

  animator = new Animator();

  onResize = null;

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  handleMouseMove = () => {

    const mouse = this.mouse;
    const e = mouse.event;
    const newX = e.clientX;
    const newY = e.clientY;
    let deltaX = 0;
    let deltaY = 0;

    if (this.isOverflowX()) {
      deltaX = (newX - mouse.x) * MOVING_SPEED;
      this.setState({
        translateX: this.state.translateX + deltaX
      });
    }
    if (this.isOverflowY()) {
      deltaY = (newY - mouse.y) * MOVING_SPEED;
      this.setState({
        translateY: this.state.translateY + deltaY
      });
    }
    mouse.x = newX;
    mouse.y = newY;
  };

  onMouseDown = e => {
    console.log(e.clientX);
    const mouse = this.mouse;
    mouse.event = e;
    // prevent image downloading in chrome
    if (['DIV', 'IMG'].includes(e.target.tagName)) {
      e.preventDefault();
    }
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    this.setState({
      isHolding: true
    });
  };

  onMouseMove = e => {

    const animator = this.animator;
    this.mouse.event = e;

    if (this.state.isHolding) {
      this.setState({
        isDragging: true
      });
      if (! animator.isRunning()) {
        animator.start(this.handleMouseMove);
      }
    }
  };

  isOverflowX(percent = this.state.percent) {
    const ratio = percent / 100;
    return ((this.image.width * ratio) > this.container.width);
  }

  isOverflowY(percent = this.state.percent) {
    const ratio = percent / 100;
    return ((this.image.height * ratio) > this.container.height);
  }

  onMouseUp = () => {
    this.animator.stop();
    this.setState({
      isHolding: false,
      isDragging: false
    });
  };

  enlarge = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const newPercent = this.state.percent + DELTA_PERCENT;

    this.setState({
      percent: newPercent,
      inputValue: newPercent + '%'
    });
    this.adjustTranslate(newPercent);
  };

  shrink = e => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const newPercent = this.state.percent - DELTA_PERCENT;

    if (newPercent >= 25) {
      this.setState({
        percent: newPercent,
        inputValue: newPercent + '%'
      });
      this.adjustTranslate(newPercent);
    }
  };

  handleInputChange = e => {

    const value = e.target.value;
    const parsedValue = parseFloat(value);

    this.setState({
      percent: isNaN(parsedValue) ? this.state.percent : parsedValue,
      inputValue: value
    });
    this.adjustTranslate();
  };

  adjustTranslate(percent = this.state.percent) {

    if (! this.isOverflowX(percent)) {
      this.setState({
        translateX: 0
      });
    }
    if (! this.isOverflowY(percent)) {
      this.setState({
        translateY: 0
      });
    }
  }

  handleInputBlur = () => {
    this.setPercentToInputValue();
  };

  setPercentToInputValue() {
    this.setState({
      inputValue: this.state.percent + '%'
    });
  }

  onImageLoad = () => {
    this.setOffsetSize();
  };

  onImageError(err) {
    console.error('ImageZoomer error: ', err);
  }

  setOffsetSize() {
    const domContainer = ReactDOM.findDOMNode(this.refs.imageZoomer);
    const domImage = ReactDOM.findDOMNode(this.refs.imageZoomable);
    const {container, image} = this;

    container.width = domContainer.offsetWidth;
    container.height = domContainer.offsetHeight;
    image.width = domImage.offsetWidth;
    image.height = domImage.offsetHeight;
  }

  componentDidMount() {
    const mouse = this.mouse;
    mouse.onMouseMove = this.onMouseMove;
    mouse.onMouseUp = this.onMouseUp;

    this.onResize = () => {
      this.setOffsetSize();
      this.adjustTranslate();
    };

    window.addEventListener('mousemove', mouse.onMouseMove);
    window.addEventListener('mouseup', mouse.onMouseUp);
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    this.animator.stop();
    window.removeEventListener('mousemove', this.mouse.onMouseMove);
    window.removeEventListener('mouseup', this.mouse.onMouseUp);
    window.removeEventListener('resize', this.onResize);
  }

  render() {

    const {translateX, translateY, percent, isDragging, isHolding} = this.state;
    const {src} = this.props;

    const divProps = {
      className: classNames({
        'imageZoomer': true,
        holding: isHolding,
        dragging: isDragging
      }),
      onMouseDown: this.onMouseDown,
      ref: 'imageZoomer'
    };

    const imgProps = {
      className: 'imageZoomable',
      onError: this.onImageError,
      onLoad: this.onImageLoad,
      ref: 'imageZoomable',
      src: src + '',
      style: {transform: 'translate(' + translateX + 'px,' + translateY + 'px) scale(' + percent / 100 + ')'}
    };

    const imageZoomerToolbarProps = {
      className: 'image-zoomer-toolbar',
      inputValue: this.state.inputValue,
      onAddButtonClick: this.enlarge,
      onInputBlur: this.handleInputBlur,
      onInputChange: this.handleInputChange,
      onMinusButtonClick: this.shrink
    };

    return (
      <div {...divProps}>
        <img {...imgProps} />
        <ImageZoomerToolbarTab1 {...imageZoomerToolbarProps} />
      </div>
    );
  }
}
