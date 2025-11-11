import React from 'react';
import { Drawer } from 'expo-router/drawer';
import { GluestackUIProvider, Text, HStack } from '@gluestack-ui/themed';
import { config } from '@gluestack-ui/config';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { User, Home, FileText, UserCircle } from 'lucide-react-native';

export default function Layout() {
  return (
    <GluestackUIProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Drawer
          screenOptions={{
            headerStyle: {
              backgroundColor: '#1208cfff',
            },
            headerTintColor: '#fff',
            drawerStyle: {
              backgroundColor: '#f8fafc',
            },
            drawerActiveTintColor: '#1208cfff',
            drawerInactiveTintColor: '#0360e2ff',
          }}
        >
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: '🏠 Inicio',
              title: '',
              headerTitle: () => (
                <HStack alignItems="center" space="md">
                  <User size={24} color="white" />
                  <Text bold color="$white" size="lg">
                    Josue David Hernández Durón
                  </Text>
                </HStack>
              ),
            }}
          />
          <Drawer.Screen
            name="profile" // ✅ Agregar pantalla de perfil
            options={{
              drawerLabel: '👤 Perfil',
              title: 'Perfil de Usuario',
              headerTitle: () => (
                <HStack alignItems="center" space="md">
                  <UserCircle size={24} color="white" />
                  <Text bold color="$white" size="lg">
                    Mi Perfil
                  </Text>
                </HStack>
              ),
              drawerIcon: ({ color, size }) => (
                <UserCircle color={color} size={size} />
              ),
            }}
          />
          <Drawer.Screen
            name="forms"
            options={{
              drawerLabel: '📋 Formularios',
              title: 'Josue David Hernández Durón',
              drawerIcon: ({ color, size }) => (
                <FileText color={color} size={size} />
              ),
            }}
          />
        </Drawer>
      </GestureHandlerRootView>
    </GluestackUIProvider>
  );
}