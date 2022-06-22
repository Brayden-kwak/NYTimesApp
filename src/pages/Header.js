/* eslint-disable no-shadow */
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import SearchIcon from 'react-native-vector-icons/Ionicons';
import CalendarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RefreshIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ListItem from './ListItem';
import DatePicker from './DatePicker';
import {connect} from 'react-redux';
import {addToTitle, addToDate, addToKeyword} from '../utils/actions';

const data = [
  {name: 'Metro', id: 1},
  {name: 'Well', id: 2},
  {name: 'Sports', id: 3},
  {name: 'Insider', id: 4},
  {name: 'U.S.', id: 5},
  {name: 'Games', id: 6},
  {name: 'Travel', id: 7},
  {name: 'Culture', id: 8},
  {name: 'Dining', id: 9},
];

const Header = ({
  addToTitle,
  addToDate,
  addToKeyword,
  postTitle,
  postDate,
  postKeyword,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const [text, setText] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [pickDate, setPickDate] = useState('');

  const [getTitle, setGetTitle] = useState('');
  const [getPostDate, setGetPostDate] = useState('');
  const [getKeywords, setGetKeywords] = useState('');

  useEffect(() => {
    setText;
    setPickDate;
    postTitle.map(item => setGetTitle(item));
    postDate.map(item => setGetPostDate(item));
    postKeyword.map(item => setGetKeywords(item));
  }, [pickDate, postDate, postKeyword, postTitle, selectedItems, text]);

  const getTextDate = date => {
    setPickDate(date);
  };

  const searchFilter = word => {
    setText(word);
  };

  const handleOnPress = contact => {
    if (selectedItems.length) {
      return selectItems(contact.name);
    }
  };

  const getSelected = contact => selectedItems.includes(contact.name);
  const deSelectItems = () => setSelectedItems([]);

  const selectItems = item => {
    if (selectedItems.includes(item.name)) {
      const newListItems = selectedItems.filter(
        listItem => listItem !== item.name,
      );
      return setSelectedItems([...newListItems]);
    }
    setSelectedItems([...selectedItems, item.name]);
  };

  const headerRefresh = () => {
    setText('');
  };

  const keywordRefresh = () => {
    setSelectedItems('');
  };

  const submit = () => {
    addToTitle(text);
    addToDate(pickDate);
    addToKeyword(selectedItems);
  };

  return (
    <View>
      <Modal
        animation="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalBackground}>
          <View style={styles.modalInnerBackground}>
            <View style={styles.modalContentBox}>
              <View style={styles.modalFirstContentBox}>
                <View style={styles.headlineContainer}>
                  <Text style={styles.modalFirstContentTitle}>헤드라인</Text>
                  <TouchableOpacity
                    style={styles.refresh}
                    onPress={headerRefresh}>
                    <RefreshIcon name="refresh" size={20} color="gray" />
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.modalFirstInputBox}
                  placeholder="검색하실 헤드라인을 입력해주세요."
                  defaultValue={text}
                  onChangeText={searchFilter}
                />
              </View>
              <View style={styles.modalSecondContentBox}>
                <DatePicker getTextDate={getTextDate} />
              </View>
              <View style={styles.modalThirdContentBox}>
                <View style={styles.headlineContainer}>
                  <Text style={styles.modalThirdContentTitle}>신문사</Text>
                  <TouchableOpacity
                    style={styles.refresh}
                    onPress={keywordRefresh}>
                    <RefreshIcon name="refresh" size={20} color="gray" />
                  </TouchableOpacity>
                </View>
                <Pressable
                  onPress={deSelectItems}
                  style={styles.keyWordContainer}>
                  <FlatList
                    data={data}
                    numColumns={5}
                    keyExtractor={(_item, index) => index.toString()}
                    renderItem={({item}) => (
                      <ListItem
                        onPress={() => {
                          handleOnPress(item);
                          selectItems(item);
                        }}
                        selected={getSelected(item)}
                        item={item}
                        name={item.name}
                      />
                    )}
                  />
                </Pressable>
              </View>
              <TouchableOpacity
                onPress={() => {
                  submit();
                  setModalVisible(!modalVisible);
                }}
                style={styles.modalApplyBtn}>
                <Text style={styles.applyFilter}>필터 적용하기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.headContainer}>
        {getTitle && getTitle.length > 0 ? (
          <TouchableOpacity
            style={styles.searchHeadTitleActive}
            onPress={() => setModalVisible(true)}>
            <SearchIcon
              name="search"
              size={15}
              color="#3478F6"
              style={styles.headIcon}
            />
            <Text numberOfLines={1} style={styles.searchChangedBtn}>
              {getTitle}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.searchHeadTitleDeActive}
            onPress={() => setModalVisible(true)}>
            <SearchIcon
              name="search"
              size={15}
              color="#6D6D6D"
              style={styles.headIcon}
            />
            <Text style={styles.searchHeadTitleDeActiveText}>
              전체 헤드라인
            </Text>
          </TouchableOpacity>
        )}
        {getPostDate && getPostDate.length > 0 ? (
          <TouchableOpacity
            style={styles.searchDateActive}
            onPress={() => setModalVisible(true)}>
            <CalendarIcon
              name="calendar-check"
              size={15}
              color="#3478F6"
              style={styles.headIcon}
            />
            <Text style={styles.searchChangedBtn}>{getPostDate}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.searchDateDeActive}
            onPress={() => setModalVisible(true)}>
            <CalendarIcon
              name="calendar-check"
              size={15}
              color="#6D6D6D"
              style={styles.headIcon}
            />
            <Text style={styles.searchHeadTitleDeActiveText}>전체 날짜</Text>
          </TouchableOpacity>
        )}
        {(() => {
          if (getKeywords.length === 1) {
            return (
              <TouchableOpacity
                style={styles.searchThree}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.searchCountryActive}>{getKeywords}</Text>
              </TouchableOpacity>
            );
          } else if (getKeywords.length > 1) {
            return (
              <TouchableOpacity
                style={styles.searchThree}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.searchCountryActive}>{`${
                  getKeywords[0]
                } 외 ${getKeywords.length - 1}`}</Text>
              </TouchableOpacity>
            );
          } else {
            return (
              <TouchableOpacity
                style={styles.searchCountryOutLine}
                onPress={() => setModalVisible(true)}>
                <Text style={styles.searchCountryDeActive}>전체 신문사</Text>
              </TouchableOpacity>
            );
          }
        })()}
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  const {postTitle, postDate, postKeyword} = state;
  return {
    postTitle: postTitle,
    postDate: postDate,
    postKeyword: postKeyword,
  };
};

const mapDispatchToProps = dispatch => ({
  addToTitle: item => dispatch(addToTitle(item)),
  addToDate: item => dispatch(addToDate(item)),
  addToKeyword: item => dispatch(addToKeyword(item)),
});

const styles = StyleSheet.create({
  iconStyle: {
    marginTop: 10,
  },
  headContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    height: 100,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#6D6D6D',
    shadowColor: 'gray',
    shadowOffset: {width: -2, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  searchThree: {
    marginTop: 45,
    marginRight: 10,
    borderColor: '#3478F6',
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
  },
  searchCountryOutLine: {
    marginTop: 45,
    marginRight: 10,
    borderColor: '#6D6D6D',
    borderWidth: 1,
    borderRadius: 20,
    padding: 8,
  },
  headIcon: {
    marginRight: 2,
  },
  listItem: {
    backgroundColor: '#fff',
    marginBottom: 10,
    marginRight: 5,
    borderRadius: 18,
    borderColor: '#999',
    borderWidth: 0.5,
    overflow: 'hidden',
    width: '100%',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(130,176,244,1)',
    zIndex: -1,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalInnerBackground: {
    margin: 20,
    height: 480,
    width: 335,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
  modalContentBox: {
    width: 320,
    alignItems: 'center',
    marginTop: -10,
  },
  modalFirstContentBox: {
    width: '90%',
  },
  modalFirstContentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalFirstInputBox: {
    marginTop: 10,
    height: 50,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    paddingLeft: 20,
    borderRadius: 8,
  },
  modalSecondContentBox: {
    marginTop: 35,
    width: '90%',
  },
  modalSecondContentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalThirdContentBox: {
    marginTop: 35,
    width: '90%',
  },
  modalThirdContentTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  modalApplyBtn: {
    marginTop: 25,
    backgroundColor: '#3478F6',
    height: 60,
    width: '90%',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headlineContainer: {
    flexDirection: 'row',
  },
  refresh: {
    marginLeft: 10,
    bottom: 2,
  },
  keyWordContainer: {
    marginTop: 12,
  },
  applyFilter: {
    color: '#fff',
    fontWeight: 'bold',
  },
  detailHeaderContainer: {
    height: 100,
    width: '100%',
    backgroundColor: '#fff',
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
  searchHeadTitleActive: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 45,
    marginRight: 10,
    borderColor: '#3478F6',
    borderWidth: 1,
    padding: 8,
    borderRadius: 20,
  },
  searchHeadTitleDeActive: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 45,
    marginRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    borderRadius: 20,
  },
  searchHeadTitleDeActiveText: {
    color: '#6D6D6D',
  },
  searchDateActive: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 45,
    marginRight: 10,
    borderColor: '#3478F6',
    borderWidth: 1,
    padding: 8,
    borderRadius: 20,
  },
  searchDateDeActive: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 45,
    marginRight: 10,
    borderColor: '#6D6D6D',
    borderWidth: 1,
    padding: 8,
    borderRadius: 20,
  },
  searchChangedBtn: {
    color: '#3478F6',
    width: 80,
  },
  searchCountryActive: {
    width: '100%',
    textAlign: 'center',
    color: '#3478F6',
    borderColor: '#3478F6',
  },
  searchCountryDeActive: {
    width: '100%',
    textAlign: 'center',
    color: '#6D6D6D',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
