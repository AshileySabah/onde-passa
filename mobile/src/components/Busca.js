import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function Busca({ termo, onTermoAlterado, onBuscar, onLimpar }) {
  return (
    <View style={styles.container}>
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
      <Pressable style={styles.botao} onPress={onBuscar}>
        <Text style={styles.botaoTexto}>Buscar</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
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
  botao: {
    backgroundColor: '#f5c518',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginLeft: 6,
  },
  botaoTexto: {
    color: '#12121a',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
