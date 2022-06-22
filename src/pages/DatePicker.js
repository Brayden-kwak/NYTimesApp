import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CalendarIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import RefreshIcon from 'react-native-vector-icons/MaterialCommunityIcons';

// eslint-disable-next-line no-extend-native
Date.prototype.format = function (f) {
  if (!this.valueOf()) return ' ';

  var weekName = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case 'yyyy':
        return d.getFullYear();
      case 'yy':
        return (d.getFullYear() % 1000).zf(2);
      case 'MM':
        return (d.getMonth() + 1).zf(2);
      case 'dd':
        return d.getDate().zf(2);
      case 'E':
        return weekName[d.getDay()];
      case 'HH':
        return d.getHours().zf(2);
      case 'hh':
        return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case 'mm':
        return d.getMinutes().zf(2);
      case 'ss':
        return d.getSeconds().zf(2);
      case 'a/p':
        return d.getHours() < 12 ? '오전' : '오후';
      default:
        return $1;
    }
  });
};

String.prototype.string = function (len) {
  var s = '',
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return '0'.string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

const DatePicker = ({getTextDate}) => {
  const placeholder = '날짜를 선택해주세요';

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [text, onChangeText] = useState('');

  useEffect(() => {
    setDatePickerVisibility;
    onChangeText;
  }, [text, isDatePickerVisible]);

  const confirmDate = data => {
    getTextDate(data);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    onChangeText(date.format('yyyy.MM.dd'));
    confirmDate(date.format('yyyy.MM.dd'));
  };

  const dateRefresh = () => {
    onChangeText('');
    confirmDate('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>날짜</Text>
        <TouchableOpacity style={styles.refresh} onPress={dateRefresh}>
          <RefreshIcon name="refresh" size={20} color="gray" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          showDatePicker();
          confirmDate();
        }}>
        <View style={styles.inputContainer}>
          <TextInput
            pointerEvents="none"
            style={styles.textInput}
            placeholder={placeholder}
            placeholderTextColor="#C4C4C4"
            underlineColorAndroid="transparent"
            editable={false}
            value={text}
          />
          <CalendarIcon
            name="calendar-check"
            size={20}
            color="#C4C4C4"
            style={styles.icon}
          />
        </View>
        <DateTimePickerModal
          headerTextIOS={placeholder}
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignContent: 'flex-start',
    backgroundColor: 'white',
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  refresh: {
    marginLeft: 10,
    bottom: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    fontSize: 15,
    height: 50,
    width: 290,
    borderColor: '#C4C4C4',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 20,
    marginTop: 10,
    marginLeft: 40,
  },
  icon: {
    padding: 10,
    right: 45,
    top: 5,
  },
});

export default DatePicker;
