/* eslint-disable no-shadow */
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {deleteToStar, addToStar} from '../utils/actions';
import BackIcon from 'react-native-vector-icons/Ionicons';
import StarIcon from 'react-native-vector-icons/Octicons';

const DetailHeader = ({
  navigation: {goBack},
  route,
  deleteToStar,
  addToStar,
  postStar,
}) => {
  const [mark, setMark] = useState('');

  const newsData = route.params.paramKey;

  const backgroundColor = mark._id === newsData._id ? '#FFB800' : '#6D6D6D';
  const iconName = mark._id === newsData._id ? 'star-fill' : 'star';

  const clickChange = () => {
    if (mark === newsData) {
      deleteToStar(newsData);
      Alert.alert('스크랩이 해제!');
    } else {
      addToStar(newsData);
      Alert.alert('스크랩 완료!');
    }
  };

  useEffect(() => {
    setMark('');
    postStar.map((item, index) => setMark(item));
  }, [postStar]);

  return (
    <View style={styles.detailHeaderContainer}>
      <TouchableOpacity
        onPress={() => goBack()}
        style={styles.detailHeaderGoBack}>
        <BackIcon name="chevron-back-sharp" size={35} />
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.detailHeaderTitle}>
        {route.params.paramKey.headline.main}
      </Text>
      {addToStar._id === route.params.paramKey.id ? (
        <TouchableOpacity
          onPress={() => clickChange()}
          style={styles.detailHeaderStar}>
          <StarIcon name={iconName} size={20} color={backgroundColor} />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => clickChange()}
          style={styles.detailHeaderStar}>
          <StarIcon name={iconName} size={20} color={backgroundColor} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const mapStateToProps = state => {
  const {postData, postStar} = state;
  return {
    postData: postData,
    postStar: postStar,
  };
};

const mapDispatchToProps = dispatch => ({
  deleteToStar: item => dispatch(deleteToStar(item)),
  addToStar: item => dispatch(addToStar(item)),
});

const styles = StyleSheet.create({
  detailHeaderContainer: {
    height: 100,
    width: '100%',
    backgroundColor: '#fff',
    shadowColor: 'gray',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  detailHeaderGoBack: {
    top: 50,
    marginLeft: 15,
  },
  detailHeaderTitle: {
    fontSize: 15,
    width: 180,
    left: 110,
    top: 22,
  },
  detailHeaderStar: {
    left: 350,
    top: 5,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailHeader);
