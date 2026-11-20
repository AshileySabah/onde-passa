import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Cabecalho from './src/components/Cabecalho';
import Creditos from './src/components/Creditos';

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Cabecalho />
        <View style={styles.conteudo} />
        <Creditos />
        <StatusBar style="light" />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12121a',
  },
  conteudo: {
    flex: 1,
  },
});
