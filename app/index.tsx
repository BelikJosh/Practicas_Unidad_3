import React from 'react';
import { 
  Box, 
  Text, 
  VStack, 
  Button, 
  ButtonText, 
  HStack, 
  ScrollView 
} from '@gluestack-ui/themed';
import { Link } from 'expo-router';
import { FormInput, ArrowRight, Star, Rocket, Zap, Shield } from 'lucide-react-native';

const CustomCard = ({ 
  title, 
  description, 
  children,
  variant = 'primary',
  icon: IconComponent = Star
}: any) => {
  const isPrimary = variant === 'primary';
  
  return (
    <Box 
      bg={isPrimary ? '$primary600' : '$white'}
      p="$6"
      borderRadius="$2xl"
      borderWidth={isPrimary ? 0 : 2}
      borderColor={isPrimary ? 'transparent' : '$borderLight300'}
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 10,
      }}
      mb="$5"
    >
      <VStack space="md">
        <HStack alignItems="center" space="md">
          <Box 
            p="$3" 
            borderRadius="$xl" 
            bg={isPrimary ? '$primary500' : '$primary100'}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
          >
            <IconComponent 
              size={24} 
              color={isPrimary ? 'white' : '#4F46E5'} 
            />
          </Box>
          <VStack flex={1}>
            <Text size="xl" fontWeight="$black" color={isPrimary ? '$white' : '$textDark800'}>
              {title}
            </Text>
            <Text size="sm" color={isPrimary ? '$primary100' : '$textDark600'} mt="$1" opacity={0.9}>
              {description}
            </Text>
          </VStack>
        </HStack>
        {children && (
          <Box mt="$4">
            {children}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default function HomeScreen() {
  return (
    <ScrollView 
      bg="$backgroundLight50" 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <Box flex={1} p="$6">
        <VStack space="3xl" alignItems="center" flex={1} justifyContent="center">
          
          {/* Header con icono */}
          <VStack space="lg" alignItems="center" mt="$8">
            <Box 
              p="$4" 
              borderRadius="$full" 
              bg="$primary600"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
            >
              <FormInput size={40} color="white" />
            </Box>
            <Text size="4xl" bold textAlign="center" color="$textDark900">
              Bienvenido
            </Text>
            <Text size="lg" textAlign="center" color="$textDark600" maxWidth="$96">
              Práctica 3.1 - Formularios Avanzados con Gluestack UI
            </Text>
          </VStack>

          {/* Cards informativas */}
          <VStack space="md" width="$full">
            <CustomCard
              title="🎯 Componentes Implementados"
              description="Todos los componentes requeridos en la práctica"
              variant="secondary"
              icon={Shield}
            >
              <VStack space="sm" mt="$2">
                <HStack flexWrap="wrap" space="sm">
                  {['Checkbox', 'Radio', 'Select', 'Slider'].map((item) => (
                    <Box 
                      key={item}
                      bg="$primary100" 
                      px="$3" 
                      py="$2" 
                      borderRadius="$full"
                    >
                      <Text size="xs" color="$primary600" fontWeight="$medium">
                        {item}
                      </Text>
                    </Box>
                  ))}
                </HStack>
                <HStack flexWrap="wrap" space="sm">
                  {['Switch', 'TextArea', 'Link', 'Pressable'].map((item) => (
                    <Box 
                      key={item}
                      bg="$primary100" 
                      px="$3" 
                      py="$2" 
                      borderRadius="$full"
                    >
                      <Text size="xs" color="$primary600" fontWeight="$medium">
                        {item}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </VStack>
            </CustomCard>

            <CustomCard
              title="⭐ Características Extra"
              description="Componentes personalizados y diseño mejorado"
              variant="secondary"
              icon={Star}
            >
              <VStack space="sm" mt="$2">
                <HStack flexWrap="wrap" space="sm">
                  {['Custom Cards', 'Mejor UI/UX', 'Iconos', 'Responsive'].map((item) => (
                    <Box 
                      key={item}
                      bg="$emerald100" 
                      px="$3" 
                      py="$2" 
                      borderRadius="$full"
                    >
                      <Text size="xs" color="$emerald600" fontWeight="$medium">
                        {item}
                      </Text>
                    </Box>
                  ))}
                </HStack>
                <HStack flexWrap="wrap" space="sm">
                  {['Animaciones', 'Modal Interactivo', 'Barra Progreso', 'Feedback Visual'].map((item) => (
                    <Box 
                      key={item}
                      bg="$emerald100" 
                      px="$3" 
                      py="$2" 
                      borderRadius="$full"
                    >
                      <Text size="xs" color="$emerald600" fontWeight="$medium">
                        {item}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </VStack>
            </CustomCard>

            <CustomCard
              title="🚀 Tecnologías Utilizadas"
              description="Stack tecnológico moderno y eficiente"
              variant="secondary"
              icon={Rocket}
            >
              <VStack space="sm" mt="$2">
                <HStack flexWrap="wrap" space="sm">
                  {['React Native', 'Expo', 'Gluestack UI', 'TypeScript'].map((item) => (
                    <Box 
                      key={item}
                      bg="$purple100" 
                      px="$3" 
                      py="$2" 
                      borderRadius="$full"
                    >
                      <Text size="xs" color="$purple600" fontWeight="$medium">
                        {item}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </VStack>
            </CustomCard>

            <CustomCard
              title="⚡ Características Técnicas"
              description="Funcionalidades avanzadas implementadas"
              variant="secondary"
              icon={Zap}
            >
              <VStack space="sm" mt="$2">
                <HStack flexWrap="wrap" space="sm">
                  {['Navegación Drawer', 'Estado React', 'Hooks', 'Componentes'].map((item) => (
                    <Box 
                      key={item}
                      bg="$orange100" 
                      px="$3" 
                      py="$2" 
                      borderRadius="$full"
                    >
                      <Text size="xs" color="$orange600" fontWeight="$medium">
                        {item}
                      </Text>
                    </Box>
                  ))}
                </HStack>
                <HStack flexWrap="wrap" space="sm">
                  {['Responsive Design', 'Touch Feedback', 'Validación', 'Manejo Errores'].map((item) => (
                    <Box 
                      key={item}
                      bg="$orange100" 
                      px="$3" 
                      py="$2" 
                      borderRadius="$full"
                    >
                      <Text size="xs" color="$orange600" fontWeight="$medium">
                        {item}
                      </Text>
                    </Box>
                  ))}
                </HStack>
              </VStack>
            </CustomCard>
          </VStack>

          {/* Información adicional */}
          <VStack space="md" width="$full" alignItems="center">
            <Box 
              bg="$blue50" 
              p="$4" 
              borderRadius="$xl" 
              width="$full"
              borderWidth={1}
              borderColor="$blue200"
            >
              <VStack space="sm" alignItems="center">
                <Text fontWeight="$bold" color="$blue600" textAlign="center">
                  📱 App Móvil Responsive
                </Text>
                <Text size="sm" color="$blue600" textAlign="center">
                  Optimizada para dispositivos iOS y Android
                </Text>
              </VStack>
            </Box>

            <Box 
              bg="$emerald50" 
              p="$4" 
              borderRadius="$xl" 
              width="$full"
              borderWidth={1}
              borderColor="$emerald200"
            >
              <VStack space="sm" alignItems="center">
                <Text fontWeight="$bold" color="$emerald600" textAlign="center">
                  🎨 Diseño Moderno
                </Text>
                <Text size="sm" color="$emerald600" textAlign="center">
                  Interfaz intuitiva con experiencia de usuario mejorada
                </Text>
              </VStack>
            </Box>
          </VStack>

          {/* Botón de acción */}
          <VStack space="md" width="$full" alignItems="center" mb="$10">
            <Link href="/forms" asChild>
              <Button 
                size="xl" 
                borderRadius="$lg"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
                mt="$4"
              >
                <ButtonText>Explorar Formulario </ButtonText>
                <ArrowRight size={20} color="white" style={{ marginLeft: 8 }} />
              </Button>
            </Link>
            
            <Text size="xs" color="$textDark500" textAlign="center">
              Desliza hacia arriba para ver más información ↑
            </Text>
          </VStack>
        </VStack>
      </Box>
    </ScrollView>
  );
}