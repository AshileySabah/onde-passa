import { StyleSheet, Text } from 'react-native';

export default function Creditos() {
  return (
    <Text style={styles.texto}>
      Este produto usa a API do TMDB, mas não é endossado nem certificado pelo TMDB.
    </Text>
  );
}

const styles = StyleSheet.create({
  texto: {
    textAlign: 'center',
    fontSize: 10,
    color: '#7a7a88',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
