import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { connect, isAuthenticated } from '../tractive';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

interface AuthContextType {
  loggedIn: boolean;
  login: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await isAuthenticated();
      setLoggedIn(authenticated);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const authenticated = await connect(email, password);
    setLoggedIn(authenticated);
  };
  console.log('AuthProvider');
  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
    <AuthContext.Provider value={{ loggedIn, login }}>{children}</AuthContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
