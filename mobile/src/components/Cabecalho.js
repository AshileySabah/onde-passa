import { StyleSheet, Text, View } from 'react-native';

export default function Cabecalho() {
  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        <Text style={styles.icone}>🍿</Text>
        <Text style={styles.nome}>OndePassa</Text>
      </View>
      <Text style={styles.subtitulo}>Descubra onde assistir qualquer filme</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icone: {
    fontSize: 28,
    marginRight: 8,
  },
  nome: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitulo: {
    fontSize: 14,
    color: '#9a9aa8',
    marginTop: 4,
  },
});
