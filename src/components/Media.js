import React from 'react';
import IFrame from './IFrame';

export default React.createClass({
  propTypes: {
    data: React.PropTypes.string.isRequired
  },

  isUrl: function (str) {
    let urlRegex = new RegExp(/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig);
    return urlRegex.test(str);
  },

  isImg: function (str) {
    let imgRegex = new RegExp(/\.(jpe?g|png|gif|bmp)$/i);
    return imgRegex.test(str);
  },

  getElement: function (data) {
    if (this.isUrl(data)) {
      if (this.isImg(data)) {
        return React.createElement('img', {src: data});
      } else {
        return React.createElement(IFrame, {link: data});
      }
    } else {
      return React.createElement('q', {}, data);
    }
  },

  render: function () {
    return this.getElement(this.props.data);
  }

});