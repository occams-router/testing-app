import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import styles from './styles';
import GlobalStyles from '../../../GlobalStyles';
import AdopterPetCard from '../PetCards/AdopterPetCard';

export default function AdopterHome() {
  return (
    <SafeAreaView style={GlobalStyles.droidSafeArea}>
      <Text style={styles.title}></Text>
      <Text style={styles.title}>Adopter Feed</Text>

      <AdopterPetCard />
    </SafeAreaView>
  );
}
