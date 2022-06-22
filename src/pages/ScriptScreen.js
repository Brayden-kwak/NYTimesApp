import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FeedIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import StarIcon from 'react-native-vector-icons/Octicons';
import moment from 'moment';

import {deleteToStar} from '../utils/actions';

const ScriptScreen = ({
  navigation: {goBack},
  navigation,
  deleteToStar,
  postStar,
}) => {
  const [star, setStar] = useState('');

  useEffect(() => {
    setStar('');
    postStar.map(item => setStar(item));
  }, [postStar]);

  const renderItem = ({item}) => {
    const clickChange = () => {
      deleteToStar(item);
      Alert.alert('스크랩이 해제!');
    };
    return (
      <View style={styles.containerTwo}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('newsDetail', {
              paramKey: item,
            })
          }>
          <View style={styles.box}>
            <View style={styles.boxSubOne}>
              <Text numberOfLines={2} style={styles.title}>
                {item.headline.main}
              </Text>
              <TouchableOpacity onPress={() => clickChange()}>
                <StarIcon name="star-fill" size={20} color="#FFB800" />
              </TouchableOpacity>
            </View>
            <View style={styles.boxSubTwo}>
              <Text numberOfLines={1} style={styles.newsInfo}>
                {item.news_desk} {item.byline.original}
              </Text>
              <Text style={styles.date}>
                {moment(item.pub_date).format('YYYY.MM.DD. (ddd)')}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.starsContainer}>
      {star ? (
        <FlatList
          data={postStar}
          showsVerticalScrollIndicator={false}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={renderItem}
        />
      ) : (
        <View style={styles.container}>
          <FeedIcon name="script-text-outline" size={45} color="#6D6D6D" />
          <Text style={styles.infoText}>저장된 스크랩이 없습니다.</Text>
          <TouchableOpacity onPress={() => goBack()} style={styles.backButton}>
            <Text style={styles.btnTitle}>스크랩 하러 가기</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const mapStateToProps = state => {
  const {bookmarkItems} = state;
  const {postStar} = state;
  return {
    bookmarkItems: bookmarkItems,
    postStar: postStar,
  };
};

const mapDispatchToProps = dispatch => ({
  deleteToStar: item => dispatch(deleteToStar(item)),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starsContainer: {
    flex: 1,
  },
  containerTwo: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  box: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 13,
    paddingBottom: 13,
    width: 335,
    height: 104,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  boxSubOne: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    width: '85%',
  },
  boxSubTwo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '70%',
  },
  newsInfo: {
    width: 170,
    fontSize: 12,
  },
  date: {
    marginLeft: 30,
    fontSize: 12,
    color: '#6D6D6D',
  },
  infoText: {
    fontSize: 17,
    color: '#6D6D6D',
    fontWeight: 'bold',
    marginTop: 12,
  },
  backButton: {
    marginTop: 30,
    backgroundColor: '#3478F6',
    height: 60,
    width: '80%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScriptScreen);
