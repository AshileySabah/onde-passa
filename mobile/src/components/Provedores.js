import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function Provedores({ titulo, provedores }) {
  if (provedores.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>
      <ScrollView horizontal>
        {provedores.map((provedor) => (
          <View key={provedor.nome} style={styles.item}>
            <Image source={{ uri: provedor.logo }} style={styles.logo} />
            <Text style={styles.nome} numberOfLines={2}>
              {provedor.nome}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  titulo: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#e0e0e8',
    marginBottom: 6,
  },
  item: {
    width: 72,
    marginRight: 10,
    alignItems: 'center',
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 10,
  },
  nome: {
    fontSize: 11,
    color: '#c8c8d4',
    textAlign: 'center',
    marginTop: 4,
  },
});
