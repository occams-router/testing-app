import AdopterChatList from "./AdopterChatList";
import React, {useState, useContext, useEffect} from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, FlatList, TouchableOpacity } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import GlobalStyles from '../../../GlobalStyles.js';
import styles from "../Home/styles";
import { db } from '../../firebase/config';
import { doc, getDocs, collection, getDoc } from 'firebase/firestore';
import { UserContext } from '../../../App';
import Header from '../Sidebar/Header';

export default function AdopterChat() {
  const adopter = useContext(UserContext);
  const [matches, setMatches] = useState([]);

  const getMatches = async () => {
    const matchList = [];
    const docs = await getDocs(
      collection(db, 'adopters', `${adopter.id}`, 'matches')
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
      <KeyboardAwareScrollView
        style={{ flex: 1, width: "100%" }}
        keyboardShouldPersistTaps="always"
      >
        <Header/>
      <Text style={styles.title}></Text>
      {matches.length === 0 ? (
        <Text>No chats to display!</Text>
      ) : (
          <>
        <FlatList
          data={matches}
          renderItem={({ item }) => <AdopterChatList match={item} />}
        />
        <Text style={styles.title}></Text>
        </>
      )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
    );
}