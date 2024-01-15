import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import fontFamily from '../../styles/fontFamily';
import InputComp from '../../component/InputComp';
import {
  NestableDraggableFlatList,
  NestableScrollContainer,
} from 'react-native-draggable-flatlist';
import {
  addAlpha,
  getDataAsync,
  getRanHex,
  setDataAsync,
  validateEmail,
} from '../../helper/helper';
import {Swipeable} from 'react-native-gesture-handler';

const Home = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [address, setAddres] = useState('');
  const [selectInd, setSelectInd] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [listArr, setListArr] = useState([]);
  const swipeRef = useRef();

  useEffect(() => {
    Dimensions.addEventListener('change', ({window: {width, height}}) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
    });
  }, []);

  useEffect(() => {
    getAllData();
  }, []);

  const getAllData = async () => {
    const value = await getDataAsync();
    setListArr(value);
  };

  const onPressJoin = () => {
    if (!email.length) {
      Alert.alert('Enter your email address');
      return;
    }
    if (!validateEmail(email)) {
      Alert.alert('Enter Valid Email');
      return;
    }

    if (!name.length) {
      Alert.alert('Enter your name');
      return;
    }

    if (!name.length || !email.length) {
      Alert.alert('All fields are required');
      return;
    }
    let saveObj = {
      name: name,
      email: email,
      address: getRanHex(16),
    };
    setName('');
    setEmail('');
    setAddres('');
    if (!isEditable) {
      let newUpdateState = [...listArr, saveObj];
      setListArr(newUpdateState);
      setDataAsync(newUpdateState);
    } else {
      const newState = listArr.map((obj, index) =>
        index === selectInd
          ? {...obj, name: name, email: email, address: address}
          : obj,
      );
      setIsEditable(false);
      setListArr(newState);
      setDataAsync(newState);
      swipeRef?.current?.close();
    }
  };

  const onDeleteItem = () => {
    let arr = [...listArr];
    arr.splice(selectInd, 1);
    setListArr(arr);
    setDataAsync(arr);
    swipeRef?.current?.close();
  };

  const onEditItem = () => {
    let arr = [...listArr];
    setEmail(arr[selectInd]?.email);
    setName(arr[selectInd]?.name);
    setAddres(arr[selectInd]?.address);
    setIsEditable(true);
  };

  const renderRightActions = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onEditItem}
          style={{...styles.iconView, backgroundColor: 'blue'}}>
          <Image
            source={require('../../assets/images/editIcon.png')}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onDeleteItem}
          style={styles.iconView}>
          <Image
            source={require('../../assets/images/deleteIcon.png')}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const _renderItem = ({item, getIndex, drag, isActive}) => {
    return (
      <Swipeable
        ref={swipeRef}
        friction={2}
        leftThreshold={80}
        rightThreshold={40}
        onSwipeableOpen={() => setSelectInd(getIndex())}
        onSwipeableClose={() => {
          setSelectInd(null), setIsEditable(false);
        }}
        renderRightActions={renderRightActions}>
        <TouchableOpacity
          activeOpacity={1}
          disabled={isActive}
          onLongPress={drag}
          style={{
            ...styles.listView,
            backgroundColor:
              (getIndex() + 1) % 2 === 0
                ? addAlpha('#D97083', 0.31)
                : addAlpha('#D97083', 0.12),
          }}>
          <View style={{flex: 0.2, alignItems: 'flex-start'}}>
            <Text style={styles.textStyle}># {getIndex() + 1}</Text>
          </View>
          <View style={{flex: 0.5, alignItems: 'flex-start'}}>
            <Text numberOfLines={2} style={styles.textStyle}>
              {item?.name}
            </Text>
          </View>
          <View style={{flex: 0.4, alignItems: 'flex-start'}}>
            <Text numberOfLines={1} style={styles.textStyle}>
              {item?.address?.substring(0, 4)}....
              {item?.address?.substring(13, 16)}
            </Text>
          </View>
          {orientation !== 'PORTRAIT' ? (
            <View style={{flex: 0.5, alignItems: 'flex-start'}}>
              <Text numberOfLines={2} style={styles.textStyle}>
                {item?.email}
              </Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </Swipeable>
    );
  };

  return (
    <NestableScrollContainer
      nestedScrollEnabled
      showsVerticalScrollIndicator={false}
      style={{flexGrow: 1}}>
      <View style={{flex: 1}}>
        <Text style={styles.joinTxt}>Join</Text>
        <Text style={styles.uniqueTxt}>Unique</Text>
        <Text style={styles.uniqueTxt}>Schools</Text>

        <InputComp
          placeholder="Email"
          value={email}
          onChangeText={e => setEmail(e)}
          editable={true}
        />
        <InputComp
          placeholder="Name"
          value={name}
          onChangeText={e => setName(e)}
          editable={true}
        />
        <InputComp
          placeholder="Ethereum address"
          value={address}
          editable={false}
          secureTextEntry={true}
        />

        <TouchableOpacity
          onPress={onPressJoin}
          activeOpacity={0.8}
          style={styles.btnStyle}>
          <Text style={styles.btnText}>Join</Text>
        </TouchableOpacity>

        <Text style={styles.numerTxt}>
          {listArr.length}
          <Text style={styles.joineeTxt}> Joinee’s</Text>
        </Text>
      </View>
      <NestableDraggableFlatList
        keyExtractor={(_, index) => index}
        data={listArr}
        renderItem={_renderItem}
        style={{flex: 1, marginTop: 40, paddingBottom: 20}}
        onDragEnd={data => setListArr(data?.data)}
      />
    </NestableScrollContainer>
  );
};

export default Home;

const styles = StyleSheet.create({
  joinTxt: {
    fontFamily: fontFamily.primaryRegular,
    fontSize: 100,
    color: '#000000',
    fontWeight: '400',
    textAlign: 'center',
  },
  uniqueTxt: {
    fontFamily: fontFamily.primaryBold,
    fontSize: 100,
    color: '#D97083',
    fontWeight: '700',
    textAlign: 'center',
  },
  btnText: {
    fontFamily: fontFamily.primaryBold,
    fontWeight: '700',
    fontSize: 25,
    lineHeight: 30,
  },
  btnStyle: {
    height: 53,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#D97083',
    paddingHorizontal: 100,
    alignSelf: 'center',
  },
  numerTxt: {
    fontFamily: fontFamily.primaryBold,
    fontSize: 70,
    color: '#D97083',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 40,
  },
  joineeTxt: {
    fontFamily: fontFamily.primaryRegular,
    fontSize: 70,
    color: '#000000',
    fontWeight: '400',
  },
  listView: {
    height: 82,
    backgroundColor: addAlpha('#D97083', 0.3),
    width: '100%',
    justifyContent: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: fontFamily.primaryBold,
    fontSize: 16,
    color: '#000000',
  },
  iconStyle: {
    height: 30,
    width: 30,
  },
  iconView: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    height: 82,
    width: 50,
  },
});
