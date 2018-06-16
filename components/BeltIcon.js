import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Image,
  Text,
  View
} from 'react-native';

/*
import Svg, {
  G,
  Path,
  Polygon,
  Rect
} from 'react-native-svg';
*/

const IMAGES = {
  white: require('../imgs/white_belt.png'),
  high_white: require('../imgs/high_white_belt.png'),
  yellow: require('../imgs/yellow_belt.png'),
  high_yellow: require('../imgs/high_yellow_belt.png'),
  green: require('../imgs/green_belt.png'),
  high_green: require('../imgs/high_green_belt.png'),
  blue: require('../imgs/blue_belt.png'),
  high_blue: require('../imgs/high_blue_belt.png'),
  red: require('../imgs/red_belt.png'),
  high_red: require('../imgs/high_red_belt.png'),
  black: require('../imgs/black_belt.png'),
  second_degree_black: require('../imgs/second_degree_black_belt.png'),
  third_degree_black: require('../imgs/third_degree_black_belt.png'),
  fourth_degree_black: require('../imgs/fourth_degree_black_belt.png')
};

export default class BeltIcon extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { name, height, width, id } = this.props;
    const image_name = name.toLowerCase().replace(" ", "_");

    return (
      <View style={{
        width: width,
        height: height
      }}>
        <Image
          style={{width: width, height: height, resizeMode: 'contain'}}
          source={ IMAGES[image_name] }
        />
      </View>
      /*
        <G>
          <Polygon points="44.952 22.46 26.647 51.383 36.017 57.306 58.074 22.46" fill="black" />
          <Polygon points="42.39400100708008,22.459999084472656 15.145999908447266,22.459999084472656 15.145999908447266,35.44599914550781 34.172000885009766,35.44599914550781 " fill="black" />
          <G>
            <Path d="m60.625,22.459999l-1.68,2.665001l4.326,10.256001l0.205002,0c0.007,0.021999 21.91,0.065998 21.91,0.065998l0,-12.987l-24.761002,0z" fill="black" />
            <Polygon points="50.75,38.69599914550781 58.33000183105469,57.689002990722656 68.49099731445312,53.29399871826172 57.55400085449219,27.394001007080078 " fill="black" />
          </G>
          <Rect transform="rotate(32.4771 35.9754 46.9636)" fill="black" x="30.520357" y="44.791818" width="10.910116" height="4.343599" className="belt-stripe" />
          <Rect transform="rotate(-23.4809 60.625 48.7041)" fill="black" x="55.178695" y="46.298061" width="10.892653" height="4.811992" className="belt-stripe" />
        </G>
      </Svg>
        */
    );
  }
};

BeltIcon.propTypes = {
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}
