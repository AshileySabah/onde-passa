import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Busca({ termo, onTermoAlterado, onLimpar, buscando }) {
  const tamanhoTermo = termo.trim().length;

  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        <TextInput
          style={styles.campo}
          value={termo}
          onChangeText={onTermoAlterado}
          placeholder="Digite o título de um filme"
          placeholderTextColor="#7a7a88"
        />
        {termo !== '' && (
          <Pressable style={styles.limpar} onPress={onLimpar}>
            <Text style={styles.limparTexto}>×</Text>
          </Pressable>
        )}
        {buscando && <ActivityIndicator size="small" color="#f5c518" />}
      </View>
      {tamanhoTermo > 0 && tamanhoTermo < 3 && (
        <Text style={styles.dica}>Digite pelo menos 3 letras.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 12,
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  campo: {
    flex: 1,
    backgroundColor: '#1e1e2a',
    color: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
  },
  limpar: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  limparTexto: {
    color: '#c8c8d4',
    fontSize: 22,
  },
  dica: {
    color: '#9a9aa8',
    fontSize: 12,
    marginTop: 6,
  },
});
