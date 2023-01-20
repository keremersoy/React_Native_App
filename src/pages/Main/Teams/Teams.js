import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import Styles from './Teams.style';
import api from '../../../api.js';
import {useDispatch, useSelector} from 'react-redux';
import Team from '../../../components/Team';
import {TouchableHighlight} from 'react-native-gesture-handler';
import Header from '../../../components/Header';

const Teams = ({navigation}) => {
  const token = useSelector(state => state.user.token);
  const [teamList, setTeamList] = useState([]);
  
  const keyExtractor = (item, index) => {
    return item._id || index * Math.random();
  };
  useEffect(() => {
    api
      .get('/team/get', {
        headers: {
          Authorization: 'bearer ' + token,
        },
      })
      .then(response => {
        if (response.status == 200 && response.data.success) {
          setTeamList(response.data.data);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  const renderItem = ({item}) => {
    return (
      <TouchableHighlight
        onPress={() => navigation.navigate('TeamDetail', {team: item})}>
        <Team item={item} />
      </TouchableHighlight>
    );
  };
  return (
    <View style={Styles.container}>
    <Header navigation={navigation} type={1}/>
      <FlatList
        keyExtractor={keyExtractor}
        data={teamList.reverse()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Teams;
