import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image, ImageProps } from 'react-native';
import { TEXT_COLOR_HIGHLIGHT } from '../Constants/Constants';

interface CoinPreviewProps {
  course?: number;
  changePercentage?: number;
  image: ImageProps;
  abbreviation: string;
  fullname: string;
}

const HEIGHT = 80;
const MARGIN_HORIZONTAL = 16;
const MARGIN_TEXT = 4;

const CoinPreview = ({ image, abbreviation, fullname, course, changePercentage }: CoinPreviewProps): React.ReactElement => {
  return (
    <TouchableOpacity style={styles.button}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image style={styles.tinyLogo} source={image} />
        </View>
        <View style={styles.nameContainer}>
          <Text style={styles.textFullname}>{fullname}</Text>
          <Text style={styles.textAbbreviation}>{abbreviation}</Text>
        </View>
        <View style={styles.changeContainer}>
          <Text style={styles.textDailyChange}>{`${changePercentage?.toFixed(2)}%`}</Text>
          <Text style={styles.textValueTotal}>$0.76</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FFF',
    //Shadows for ios
    shadowColor: 'rgba(0,0,0, .4)',
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    //Shadows for android
    elevation: 0.35,
    borderRadius: 20,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    height: HEIGHT,
    flexDirection: 'row',
    marginBottom: 10,
    marginTop: 5,
  },
  container: {
    flexDirection: 'row',
  },
  imageContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginLeft: MARGIN_HORIZONTAL,
  },
  nameContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    marginLeft: 10,
    flex: 1,
  },
  changeContainer: {
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    marginRight: MARGIN_HORIZONTAL,
  },
  textFullname: {
    textAlign: 'left',
    fontFamily: 'SF-Pro-Text-Bold',
    color: TEXT_COLOR_HIGHLIGHT,
    marginBottom: MARGIN_TEXT,
  },
  textAbbreviation: {
    textAlign: 'left',
  },
  textDailyChange: {
    textAlign: 'right',
    fontFamily: 'SF-Pro-Text-Bold',
    marginBottom: MARGIN_TEXT,
  },
  textValueTotal: {
    textAlign: 'right',
  },
  tinyLogo: {
    width: 40,
    height: 40,
  },
});

export default CoinPreview;
