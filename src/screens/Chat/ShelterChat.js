import ShelterChatList from './ShelterChatList';
import React, { useState, useContext, useEffect } from 'react';
import { Text, FlatList, View} from 'react-native';
import { db } from '../../firebase/config';
import { doc, getDocs, collection, getDoc, onSnapshot, query } from 'firebase/firestore';
import { UserContext } from '../../../App';
import Header from '../Sidebar/Header';
import GlobalStyles from '../../../GlobalStyles';

export default function ShelterChat() {
	const shelter = useContext(UserContext);
	const [matches, setMatches] = useState([]);

	//   const getMatches = async () => {
	//     const matchList = [];
	//     const docs = await getDocs(
	//       collection(db, "shelters", `${shelter.id}`, "matches")
	//     );
	//     docs.forEach((doc) => matchList.push(doc.data()));
	//     setMatches([...matchList]);
	//   };

	//   useEffect(() => {
	//     getMatches();
	//   }, []);

	useEffect(
		() =>
			onSnapshot(
				query(collection(db, 'shelters', `${shelter.id}`, 'matches')),
				(snapshot) =>
					setMatches(
						snapshot.docs.map((doc) => ({
							id: doc.id,
							...doc.data(),
						}))
					)
			),
		[]
	);

	return (
		<View style={GlobalStyles.droidSafeArea}>
			{matches.length === 0 ? (
				<Text style={{ alignSelf: "center", padding: 10, marginTop: 20, }}>No chats to display!</Text>
			) : (
				<>
					<FlatList
						data={matches}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <ShelterChatList match={item} />}
					/>
				</>
			)}
		</View>
	);
}
