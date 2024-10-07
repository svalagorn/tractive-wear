import React, { useEffect, useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useAuth } from './contexts/Auth';
import { getAccountInfo } from './tractive/account';

const AuthenticatedApp = () => {
  useEffect(() => {
    const getInfo = async () => {
      const info = await getAccountInfo();
      console.log('info:', info);
    };
    getInfo();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to Wear OS</Text>
      <HelloWave />
    </View>
  );
};

const UnauthenticatedApp = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    login(email, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Login"
        onPress={handleSubmit}
      />
    </View>
  );
};

export default function StartPage() {
  const { loggedIn } = useAuth();

  return loggedIn ? <AuthenticatedApp /> : <UnauthenticatedApp />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
  },

  text: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    color: 'white',
    width: '75%', // Make the input full width
  },
});
