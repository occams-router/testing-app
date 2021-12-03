import React, { useContext, useState, useEffect } from 'react';
import { SafeAreaView, Text, FlatList, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MatchCard from './ShelterMatchCard';
import styles from '../Home/styles';
import { db } from '../../firebase/config';
import { collection, getDocs } from 'firebase/firestore';
import { UserContext } from '../../../App';

export default function ShelterMatches() {
  const shelter = useContext(UserContext);
  const [matches, setMatches] = useState([]);

  const getMatches = async () => {
    const matchList = [];
    const docs = await getDocs(
      collection(db, 'shelters', `${shelter.id}`, 'matches')
    );
    docs.forEach((doc) => matchList.push(doc.data()));
    setMatches([...matchList]);
  };

  useEffect(() => {
    getMatches();
  }, []);

  console.log(matches);

  return (
    <SafeAreaView>
      <Text style={styles.title}>My Matches</Text>
      {matches.length === 0 ? (
        <Text>No matches to display!</Text>
      ) : (
        <FlatList
          data={matches}
          renderItem={({ item }) => <MatchCard match={item} />}
        />
      )}
    </SafeAreaView>
  );
}
