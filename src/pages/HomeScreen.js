/* eslint-disable no-shadow */
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import moment from 'moment';
import NYT_API_KEY from '../config/NytApiKey';
import StarIcon from 'react-native-vector-icons/Octicons';
import {addToStar, deleteToStar} from '../utils/actions';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const HomeScreen = ({
  navigation,
  newsStore,
  addToStar,
  deleteToStar,
  postStar,
  postTitle,
  postDate,
  postKeyword,
}) => {
  const [loading, setLoading] = useState(false);
  const [articles, setArticles] = useState([]);
  const [mark, setMark] = useState('');
  const [title, setTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newKeyword, setNewKeyword] = useState('');
  const [refreshing, setRefreshing] = useState('');

  // semantic을 사용하여 location값을 가져오려고 시도해봄.
  const getArticles = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://api.nytimes.com/svc/archive/v1/2022/6.json?&api-key=${NYT_API_KEY}`,
      // `https://api.nytimes.com/svc/semantic/v2/concept?&api-key=${NYT_API_KEY}`,
    );
    setArticles(response.data.response.docs);
    setLoading(false);
  };

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    setMark('');
    postStar.map((item, index) => setMark(item));
    postTitle.map((item, index) => setTitle(item));
    postDate.map((item, index) => setNewDate(item));
    postKeyword.map((item, index) => setNewKeyword(item));
  }, [postStar, postTitle, postDate, postKeyword]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(4000)
      .then(() => setRefreshing(false))
      .then(setTitle(''), setNewDate(''), setNewKeyword(''), setMark(''))
      .then(() => HomeScreen);
  }, []);

  const searchFilterData =
    title || newDate
      ? articles
          .filter(filtered =>
            filtered.headline.main.toLowerCase().includes(title.toLowerCase()),
          )
          .filter(filtered =>
            moment(filtered.pub_date).format('YYYY.MM.DD').includes(newDate),
          )
      : newKeyword
      ? articles.filter(filtered => newKeyword.includes(filtered.news_desk))
      : articles;

  const renderItem = ({item, index}) => {
    const backgroundColor = mark._id === item._id ? '#FFB800' : '#6D6D6D';
    const iconName = mark._id === item._id ? 'star-fill' : 'star';

    const clickChange = () => {
      if (mark === item) {
        deleteToStar(item);
        Alert.alert('스크랩이 해제!');
      } else {
        addToStar(item);
        Alert.alert('스크랩 완료!');
      }
    };

    return (
      <View key={item.id} style={styles.container}>
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
                <StarIcon name={iconName} size={20} color={backgroundColor} />
              </TouchableOpacity>
            </View>
            <View style={styles.boxSubTwo}>
              <Text numberOfLines={1} style={styles.newsInfo}>
                {item.news_desk}  {item.byline.original}
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
    <View>
      {(() => {
        if (loading) {
          return (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>Loading...</Text>
            </View>
          );
        } else if (searchFilterData.length > 0) {
          return (
            <FlatList
              data={searchFilterData}
              showsVerticalScrollIndicator={false}
              keyExtractor={(_item, index) => index.toString()}
              renderItem={renderItem}
            />
          );
        } else {
          return (
            <SafeAreaView style={styles.loading}>
              <ScrollView
                contentContainerStyle={styles.scrollView}
                showsVerticalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }>
                <View style={styles.loadingTextContainer}>
                  <Text style={styles.loadingText}>검색 설정을 다시하거나</Text>
                  <Text style={styles.loadingText}>
                    페이지 새로고침을 해주세요.
                  </Text>
                  <Text style={styles.loadingSubText}>
                    화면을 위에서 아래로 당겨주세요.
                  </Text>
                </View>
              </ScrollView>
            </SafeAreaView>
          );
        }
      })()}
    </View>
  );
};

const mapStateToProps = state => {
  const {postStar, postTitle, postDate, postKeyword} = state;
  return {
    postStar: postStar,
    postTitle: postTitle,
    postDate: postDate,
    postKeyword: postKeyword,
  };
};

const mapDispatchToProps = dispatch => ({
  addToStar: item => dispatch(addToStar(item)),
  deleteToStar: item => dispatch(deleteToStar(item)),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 300,
  },
  loadingTextContainer: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 20,
  },
  loadingSubText: {
    fontSize: 12,
    color: 'gray',
    marginTop: 10,
  },
  scrollView: {
    flex: 1,
  },
  box: {
    paddingLeft: 22,
    paddingRight: 22,
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
    height: 48,
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
  backButton: {
    marginTop: 45,
    backgroundColor: '#3478F6',
    height: 60,
    width: '80%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
