import React, { useState, useCallback } from 'react';
import { Alert, Platform } from 'react-native';
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
  Box,
  Text,
  VStack,
  HStack,
  Icon,
  Pressable,
  Center,
  Image,
  EditIcon,
  MailIcon,
  PhoneIcon,
  ScrollView,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  InputField,
  Button,
  ButtonText,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  CloseIcon,
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  Badge,
  BadgeText,
  Divider,
} from '@gluestack-ui/themed';
import { MapPin, Calendar, Users, FileText, UserPlus, Camera, X, Heart, Grid3X3, Image as ImageIcon, Link as LinkIcon } from 'lucide-react-native';

// ❌ SIN expo-image-picker
// import * as ImagePicker from 'expo-image-picker';

// Imágenes locales
const localImages = {
  profile: require('../assets/images/Perfil.jpg'),
  photo1: require('../assets/images/Angy.jpg'),
  photo2: require('../assets/images/abuela.jpg'),
  photo3: require('../assets/images/Redes.jpg'),
  photo4: require('../assets/images/sensata.jpg'),
  photo5: require('../assets/images/tiburon.jpg'),
  photo6: require('../assets/images/tiburon.jpg'),
};

const CustomStatsCard = ({ title, value, description, icon: IconComponent, gradient = ['#6366F1', '#8B5CF6'] }) => (
  <Box
    bg="$white"
    p="$4"
    borderRadius="$xl"
    borderWidth={1}
    borderColor="$borderLight300"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 12,
      elevation: 5,
    }}
  >
    <VStack space="sm" alignItems="center">
      <Center
        w={50}
        h={50}
        borderRadius="$full"
        bg={{
          linearGradient: {
            colors: gradient,
            start: [0, 0],
            end: [1, 1],
          },
        }}
      >
        <IconComponent size={24} color="white" />
      </Center>
      <Text fontSize="$xl" fontWeight="$bold" color="$textDark900">
        {value}
      </Text>
      <Text fontSize="$sm" fontWeight="$medium" color="$textDark600" textAlign="center">
        {title}
      </Text>
      <Text fontSize="$xs" color="$textDark500" textAlign="center">
        {description}
      </Text>
    </VStack>
  </Box>
);

const StatusBadge = ({ status = 'online' }) => {
  const statusConfig = {
    online: { color: '$emerald500', text: 'En línea', icon: '🟢' },
    offline: { color: '$red500', text: 'Desconectado', icon: '🔴' },
    busy: { color: '$yellow500', text: 'Ocupado', icon: '🟡' },
  };
  const config = statusConfig[status] || statusConfig.online;

  return (
    <Badge size="md" variant="solid" borderRadius="$full" bg={config.color} px="$3" py="$1">
      <HStack alignItems="center" space="xs">
        <Text fontSize="$xs">{config.icon}</Text>
        <BadgeText color="$white" fontWeight="$bold" fontSize="$xs">
          {config.text}
        </BadgeText>
      </HStack>
    </Badge>
  );
};

export default function ProfileScreen() {
  const [userData, setUserData] = useState({
    name: 'Josue David Hernández Durón',
    email: 'josuehernandez6233@gmail.com',
    phone: '+52 449 455 54 44',
    location: 'Aguascalientes, México',
    joinDate: 'Miembro desde Enero 2025',
    bio: 'Desarrollador móvil especializado en React Native y Gluestack. Apasionado por crear interfaces modernas y funcionales.',
    stats: { posts: 127, followers: 1.8, following: 256, likes: 842 },
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAvatarActions, setShowAvatarActions] = useState(false);
  const [editForm, setEditForm] = useState({ ...userData });
  const [activeTab, setActiveTab] = useState('gallery');

  // Avatar: soporta require y { uri }
  const [profileImage, setProfileImage] = useState(localImages.profile);

  // Picker casero (sin dependencias)
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [avatarUrlInput, setAvatarUrlInput] = useState('');

  const [galleryImages, setGalleryImages] = useState([
    { id: 1, source: localImages.photo1, likes: 42, isLiked: false },
    { id: 2, source: localImages.photo2, likes: 38, isLiked: false },
    { id: 3, source: localImages.photo3, likes: 56, isLiked: true },
    { id: 4, source: localImages.photo4, likes: 29, isLiked: false },
    { id: 5, source: localImages.photo5, likes: 67, isLiked: true },
    { id: 6, source: localImages.photo6, likes: 31, isLiked: false },
  ]);

  // ======= Helpers para URL =======
  const isValidHttpUrl = (str) => {
    try {
      const u = new URL(str);
      return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
      return false;
    }
  };

  const setAvatarFromUrl = useCallback(async () => {
    if (!isValidHttpUrl(avatarUrlInput)) {
      Alert.alert('URL inválida', 'Ingresa una URL que empiece con http(s)://');
      return;
    }
    try {
      // Opcional: prefetch para verificar carga
      await Image.prefetch(avatarUrlInput);
      setProfileImage({ uri: avatarUrlInput });
      setShowAvatarPicker(false);
      setAvatarUrlInput('');
    } catch (e) {
      Alert.alert('No se pudo cargar', 'Verifica la URL o tu conexión.');
    }
  }, [avatarUrlInput]);

  // ======= UI helpers =======
  const toggleLike = (imageId) => {
    setGalleryImages((prev) =>
      prev.map((img) => {
        if (img.id !== imageId) return img;
        const isLiked = !img.isLiked;
        setUserData((prevUser) => ({
          ...prevUser,
          stats: { ...prevUser.stats, likes: prevUser.stats.likes + (isLiked ? 1 : -1) },
        }));
        return { ...img, isLiked, likes: img.likes + (isLiked ? 1 : -1) };
      })
    );
  };

  const getLikedPhotos = () => galleryImages.filter((i) => i.isLiked);

  const handleSaveChanges = () => {
    setUserData(editForm);
    setShowEditModal(false);
  };

  const openImageModal = (imageSource) => {
    setSelectedImage(imageSource);
    setShowImageModal(true);
  };

  const handleAvatarChange = () => setShowAvatarActions(true);

  // Abrir selector casero
  const openLocalAvatarPicker = () => {
    setShowAvatarActions(false);
    setShowAvatarPicker(true);
  };
  const openUrlAvatarPicker = () => {
    setShowAvatarActions(false);
    setShowAvatarPicker(true);
  };

  return (
    <>
      <Box flex={1} bg="$white">
        <ScrollView flex={1} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
          {/* HEADER – no corta el avatar */}
          <Box
            h={220}
            bg={{ linearGradient: { colors: ['#6366F1', '#8B5CF6', '#A855F7'], start: [0, 0], end: [1, 0] } }}
            position="relative"
            overflow="visible"
          >
            {/* decorativos */}
            <Box position="absolute" top={0} left={0} right={0} bottom={0}>
              <Box position="absolute" top={-30} left={-30} w={120} h={120} bg="rgba(255,255,255,0.1)" borderRadius="$full" />
              <Box position="absolute" top={50} right={-20} w={80} h={80} bg="rgba(255,255,255,0.08)" borderRadius="$full" />
            </Box>

            {/* AVATAR */}
            <Center position="absolute" bottom={-60} w="$full" zIndex={10}>
              <Pressable onPress={handleAvatarChange} accessibilityLabel="Cambiar foto de perfil">
                <Box position="relative">
                  <Avatar
                    size="2xl"
                    borderWidth={4}
                    borderColor="$white"
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 10 },
                      shadowOpacity: 0.3,
                      shadowRadius: 20,
                      elevation: 10,
                    }}
                  >
                    <AvatarFallbackText>
                      {userData.name
                        .split(' ')
                        .filter(Boolean)
                        .map((n) => n[0])
                        .join('')
                        .slice(0, 3)}
                    </AvatarFallbackText>
                    <AvatarImage source={profileImage} alt="Foto de perfil" />
                  </Avatar>

                  {/* Check */}
                  <Box
                    position="absolute"
                    bottom={2}
                    right={2}
                    w={24}
                    h={24}
                    bg="$emerald500"
                    borderRadius="$full"
                    borderWidth={3}
                    borderColor="$white"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="$xs" color="$white" fontWeight="$bold">
                      ✓
                    </Text>
                  </Box>
                </Box>
              </Pressable>
            </Center>

            {/* Botón flotante cámara */}
            <Pressable position="absolute" bottom={70} right={25} onPress={handleAvatarChange} zIndex={11}>
              <Center
                w={45}
                h={45}
                bg="$white"
                borderRadius="$full"
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 8,
                  elevation: 6,
                }}
              >
                <Center w={38} h={38} bg="$primary500" borderRadius="$full">
                  <Camera size={18} color="white" />
                </Center>
              </Center>
            </Pressable>
          </Box>

          {/* CONTENIDO */}
          <VStack px="$5" space="lg" mt="$20" pb="$10">
            <VStack space="md" alignItems="center">
              <VStack alignItems="center" space="xs">
                <Text fontSize="$2xl" fontWeight="$bold" color="$textDark900" textAlign="center">
                  {userData.name}
                </Text>
                <HStack alignItems="center" space="sm">
                  <StatusBadge status="online" />
                  <HStack alignItems="center" space="sm" bg="$purple100" px="$3" py="$2" borderRadius="$full">
                    <Icon as={Calendar} size="sm" color="$purple600" />
                    <Text color="$purple600" fontSize="$sm" fontWeight="$medium">
                      {userData.joinDate}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </VStack>

            <Box
              bg="$white"
              p="$5"
              borderRadius="$xl"
              borderWidth={1}
              borderColor="$borderLight300"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <Text color="$textDark600" textAlign="center" lineHeight="$lg" fontSize="$sm">
                {userData.bio}
              </Text>
            </Box>

            <VStack space="md">
              <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
                Estadísticas
              </Text>
              <HStack space="md" flexWrap="wrap">
                <Box flex={1} minWidth="$32">
                  <CustomStatsCard title="Publicaciones" value={userData.stats.posts} description="Posts creados" icon={FileText} gradient={['#10B981', '#059669']} />
                </Box>
                <Box flex={1} minWidth="$32">
                  <CustomStatsCard title="Seguidores" value={`${userData.stats.followers}K`} description="Personas que te siguen" icon={Users} gradient={['#3B82F6', '#1D4ED8']} />
                </Box>
              </HStack>
              <HStack space="md" flexWrap="wrap">
                <Box flex={1} minWidth="$32">
                  <CustomStatsCard title="Siguiendo" value={userData.stats.following} description="Personas que sigues" icon={UserPlus} gradient={['#8B5CF6', '#7C3AED']} />
                </Box>
                <Box flex={1} minWidth="$32">
                  <CustomStatsCard title="Likes" value={userData.stats.likes} description="Reacciones recibidas" icon={Heart} gradient={['#EF4444', '#DC2626']} />
                </Box>
              </HStack>
            </VStack>

            <Divider my="$2" />

            <Pressable
              bg="$purple500"
              py="$3"
              borderRadius="$lg"
              style={{
                shadowColor: '#7C3AED',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 6,
              }}
              onPress={() => {
                setEditForm({ ...userData });
                setShowEditModal(true);
              }}
            >
              <Center>
                <HStack alignItems="center" space="sm">
                  <Icon as={EditIcon} size="md" color="$white" />
                  <Text color="$white" fontWeight="$medium" fontSize="$md">
                    Editar Perfil
                  </Text>
                </HStack>
              </Center>
            </Pressable>

            <VStack bg="$coolGray50" borderRadius="$xl" p="$5" space="md" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 3 }}>
              <Text fontSize="$lg" fontWeight="$bold" color="$textDark900">
                Información de Contacto
              </Text>

              {[
                { icon: MailIcon, label: 'Email', value: userData.email, color: '$blue' },
                { icon: PhoneIcon, label: 'Teléfono', value: userData.phone, color: '$green' },
                { icon: MapPin, label: 'Ubicación', value: userData.location, color: '$red' },
              ].map((c, i) => (
                <HStack key={i} alignItems="center" space="md">
                  <Center w={40} h={40} bg={`${c.color}100`} borderRadius="$full">
                    <Icon as={c.icon} size="md" color={`${c.color}500`} />
                  </Center>
                  <VStack flex={1}>
                    <Text color="$textDark500" fontSize="$sm">
                      {c.label}
                    </Text>
                    <Text color="$textDark800" fontWeight="$medium" fontSize="$sm">
                      {c.value}
                    </Text>
                  </VStack>
                </HStack>
              ))}
            </VStack>

            <VStack space="md">
              <HStack bg="$coolGray100" p="$1" borderRadius="$lg">
                <Pressable flex={1} py="$3" borderRadius="$lg" bg={activeTab === 'gallery' ? '$white' : 'transparent'} onPress={() => setActiveTab('gallery')}>
                  <Center>
                    <HStack alignItems="center" space="sm">
                      <Icon as={Grid3X3} size="sm" color={activeTab === 'gallery' ? '$purple600' : '$coolGray500'} />
                      <Text fontWeight="$medium" color={activeTab === 'gallery' ? '$purple600' : '$coolGray500'}>
                        Galería
                      </Text>
                    </HStack>
                  </Center>
                </Pressable>

                <Pressable flex={1} py="$3" borderRadius="$lg" bg={activeTab === 'liked' ? '$white' : 'transparent'} onPress={() => setActiveTab('liked')}>
                  <Center>
                    <HStack alignItems="center" space="sm">
                      <Icon as={Heart} size="sm" color={activeTab === 'liked' ? '$red600' : '$coolGray500'} />
                      <Text fontWeight="$medium" color={activeTab === 'liked' ? '$red600' : '$coolGray500'}>
                        Me gusta
                      </Text>
                    </HStack>
                  </Center>
                </Pressable>
              </HStack>

              {activeTab === 'gallery' ? (
                <VStack space="md">
                  {[0, 2, 4].map((start) => (
                    <HStack key={start} space="md">
                      {galleryImages.slice(start, start + 2).map((image) => (
                        <Pressable key={image.id} flex={1} aspectRatio={1} borderRadius="$lg" overflow="hidden" onPress={() => openImageModal(image.source)}>
                          <Box position="relative" w="$full" h="$full">
                            <Image source={image.source} alt={`Foto de galería ${image.id}`} w="$full" h="$full" resizeMode="cover" />
                            <Pressable
                              position="absolute"
                              bottom="$2"
                              right="$2"
                              bg="rgba(0,0,0,0.6)"
                              p="$2"
                              borderRadius="$full"
                              onPress={(e) => {
                                e.stopPropagation();
                                toggleLike(image.id);
                              }}
                            >
                              <HStack alignItems="center" space="xs">
                                <Icon as={Heart} size="sm" color={image.isLiked ? '$red400' : '$white'} />
                                <Text color="$white" fontSize="$xs" fontWeight="$bold">
                                  {image.likes}
                                </Text>
                              </HStack>
                            </Pressable>
                          </Box>
                        </Pressable>
                      ))}
                    </HStack>
                  ))}
                </VStack>
              ) : (
                <VStack space="md">
                  {getLikedPhotos().length > 0 ? (
                    [0, 2, 4].map((start) => {
                      const likedSlice = getLikedPhotos().slice(start, start + 2);
                      return likedSlice.length > 0 ? (
                        <HStack key={start} space="md">
                          {likedSlice.map((image) => (
                            <Pressable key={image.id} flex={1} aspectRatio={1} borderRadius="$lg" overflow="hidden" onPress={() => openImageModal(image.source)}>
                              <Box position="relative" w="$full" h="$full">
                                <Image source={image.source} alt={`Foto liked ${image.id}`} w="$full" h="$full" resizeMode="cover" />
                                <Pressable
                                  position="absolute"
                                  bottom="$2"
                                  right="$2"
                                  bg="$red500"
                                  p="$2"
                                  borderRadius="$full"
                                  onPress={(e) => {
                                    e.stopPropagation();
                                    toggleLike(image.id);
                                  }}
                                >
                                  <HStack alignItems="center" space="xs">
                                    <Icon as={Heart} size="sm" color="$white" />
                                    <Text color="$white" fontSize="$xs" fontWeight="$bold">
                                      {image.likes}
                                    </Text>
                                  </HStack>
                                </Pressable>
                              </Box>
                            </Pressable>
                          ))}
                          {likedSlice.length < 2 && <Box flex={1} />}
                        </HStack>
                      ) : null;
                    })
                  ) : (
                    <Center py="$10">
                      <VStack alignItems="center" space="md">
                        <Icon as={Heart} size="xl" color="$coolGray300" />
                        <Text color="$coolGray500" fontSize="$md" fontWeight="$medium">
                          No hay fotos que te gusten
                        </Text>
                        <Text color="$coolGray400" textAlign="center" fontSize="$sm">
                          Dale like a algunas fotos para verlas aquí
                        </Text>
                      </VStack>
                    </Center>
                  )}
                </VStack>
              )}
            </VStack>
          </VStack>
        </ScrollView>
      </Box>

      {/* Editar perfil */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <VStack space="xs">
              <Text fontSize="$lg" fontWeight="$bold">
                Editar Perfil
              </Text>
            </VStack>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack space="md" py="$4">
              {[
                { label: 'Nombre completo', value: editForm.name, key: 'name' },
                { label: 'Email', value: editForm.email, key: 'email', keyboardType: 'email-address' },
                { label: 'Teléfono', value: editForm.phone, key: 'phone', keyboardType: 'phone-pad' },
                { label: 'Ubicación', value: editForm.location, key: 'location' },
              ].map((field, i) => (
                <FormControl key={i}>
                  <FormControlLabel>
                    <FormControlLabelText>{field.label}</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField value={field.value} onChangeText={(t) => setEditForm({ ...editForm, [field.key]: t })} keyboardType={field.keyboardType} />
                  </Input>
                </FormControl>
              ))}

              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Biografía</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    value={editForm.bio}
                    onChangeText={(t) => setEditForm({ ...editForm, bio: t })}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                </Input>
              </FormControl>

              <Button onPress={handleSaveChanges} mt="$4" bg="$purple500">
                <ButtonText>Guardar Cambios</ButtonText>
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Ver imagen ampliada */}
      <Modal isOpen={showImageModal} onClose={() => setShowImageModal(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="$lg" fontWeight="$bold">
              Foto
            </Text>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <Center>
              {selectedImage && <Image source={selectedImage} alt="Imagen ampliada" w="$full" h={400} borderRadius="$lg" resizeMode="contain" />}
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Actionsheet: opciones sin dependencias */}
      <Actionsheet isOpen={showAvatarActions} onClose={() => setShowAvatarActions(false)}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetItem onPress={openLocalAvatarPicker}>
            <HStack alignItems="center" space="md">
              <Icon as={ImageIcon} size="md" color="$green600" />
              <ActionsheetItemText>Elegir de galería (locales)</ActionsheetItemText>
            </HStack>
          </ActionsheetItem>
          <ActionsheetItem onPress={openUrlAvatarPicker}>
            <HStack alignItems="center" space="md">
              <Icon as={LinkIcon} size="md" color="$blue600" />
              <ActionsheetItemText>Usar URL (remota)</ActionsheetItemText>
            </HStack>
          </ActionsheetItem>
          <ActionsheetItem onPress={() => setShowAvatarActions(false)}>
            <HStack alignItems="center" space="md">
              <Icon as={X} size="md" color="$red600" />
              <ActionsheetItemText>Cancelar</ActionsheetItemText>
            </HStack>
          </ActionsheetItem>
        </ActionsheetContent>
      </Actionsheet>

      {/* Picker casero de avatar */}
      <Modal isOpen={showAvatarPicker} onClose={() => setShowAvatarPicker(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text fontSize="$lg" fontWeight="$bold">Cambiar foto de perfil</Text>
            <ModalCloseButton>
              <Icon as={CloseIcon} />
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <VStack space="lg">
              {/* Grid de imágenes locales */}
              <VStack space="sm">
                <Text fontWeight="$bold" color="$textDark800">Imágenes locales</Text>
                <VStack space="md">
                  {[ [localImages.profile, localImages.photo1], [localImages.photo2, localImages.photo3], [localImages.photo4, localImages.photo5] ].map((row, idx) => (
                    <HStack key={idx} space="md">
                      {row.map((img, i) => (
                        <Pressable key={i} flex={1} onPress={() => { setProfileImage(img); setShowAvatarPicker(false); }}>
                          <Image source={img} alt={`avatar-local-${idx}-${i}`} w="$full" h={120} borderRadius="$lg" resizeMode="cover" />
                        </Pressable>
                      ))}
                    </HStack>
                  ))}
                </VStack>
              </VStack>

              <Divider />

              {/* URL remota */}
              <VStack space="sm">
                <Text fontWeight="$bold" color="$textDark800">Desde URL</Text>
                <Input>
                  <InputField
                    value={avatarUrlInput}
                    onChangeText={setAvatarUrlInput}
                    placeholder="https://ejemplo.com/mi-foto.jpg"
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType={Platform.OS === 'android' ? 'url' : 'default'}
                  />
                </Input>
                <Button bg="$purple500" onPress={setAvatarFromUrl}>
                  <ButtonText>Usar esta URL</ButtonText>
                </Button>
              </VStack>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
