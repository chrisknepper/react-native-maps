let React = require('react');
const ReactNative = require('react-native');
let {
  StyleSheet,
  PropTypes,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
} = ReactNative;

let MapView = require('react-native-maps');
const PriceMarker = require('./PriceMarker');

let { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.78825;
const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const SPACE = 0.01;

const MarkerTypes = React.createClass({
  getInitialState() {
    return { mapSnapshot: null };
  },

  takeSnapshot() {
    this.refs.map.takeSnapshot(300, 300, {
      latitude: LATITUDE - SPACE,
      longitude: LONGITUDE - SPACE,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01 * ASPECT_RATIO,
    }, (err, data) => {
      if (err) console.log(err);
      this.setState({ mapSnapshot: data });
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <MapView
          ref="map"
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
        >
          <MapView.Marker
            coordinate={{
              latitude: LATITUDE + SPACE,
              longitude: LONGITUDE + SPACE,
            }}
            centerOffset={{ x: -18, y: -60 }}
            anchor={{ x: 0.69, y: 1 }}
            image={require('./assets/flag-blue.png')}
          />
          <MapView.Marker
            coordinate={{
              latitude: LATITUDE - SPACE,
              longitude: LONGITUDE - SPACE,
            }}
            centerOffset={{ x: -42, y: -60 }}
            anchor={{ x: 0.84, y: 1 }}
            image={require('./assets/flag-pink.png')}
          />
        </MapView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={this.takeSnapshot} style={[styles.bubble, styles.button]}>
            <Text>Take snapshot</Text>
          </TouchableOpacity>
        </View>
        {this.state.mapSnapshot
          ? <TouchableOpacity
            style={[styles.container, styles.overlay]}
            onPress={() => this.setState({ mapSnapshot: null })}
          >
              <Image
                source={{ uri: this.state.mapSnapshot.uri }}
                style={{ width: 300, height: 300 }}
              />
            </TouchableOpacity>
            : null}
      </View>
    );
  },
});

let styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bubble: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  button: {
    width: 140,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});

module.exports = MarkerTypes;
