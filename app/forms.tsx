import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  Textarea,
  TextareaInput,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  CheckIcon,
  Radio,
  RadioGroup,
  RadioIndicator,
  RadioIcon,
  RadioLabel,
  CircleIcon,
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Link,
  LinkText,
  Pressable,
  Button,
  ButtonText,
  ScrollView,
  Progress,
  ProgressFilledTrack,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Heading,
  Badge,
  BadgeText,
  Input,
  InputField,
} from '@gluestack-ui/themed';
import {
  ChevronDown,
  ExternalLink,
  Star,
  User,
  MapPin,
  Bell,
  MessageSquare,
  Send,
  Trophy,
  Heart,
  Zap,
  CheckCircle2,
  Sparkles,
} from 'lucide-react-native';
import { Linking } from 'react-native';


const CustomCard = ({
  title,
  description,
  children,
  variant = 'primary',
  icon: IconComponent = Sparkles
}: any) => {
  const isPrimary = variant === 'primary';

  return (
    <Box
      bg={'$white'} 
      p="$6"
      borderRadius="$2xl"
      borderWidth={2}
      borderColor="$borderLight300"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 15,
        elevation: 10,
      }}
      mb="$6"
    >
      <VStack space="md">
        <HStack alignItems="center" space="md">
          <Box
            p="$3"
            borderRadius="$xl"
            bg={'$primary100'} 
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
              color={'#4F46E5'} 
            />
          </Box>
          <VStack flex={1}>
            <Text size="xl" fontWeight="$black" color={'$textDark800'}>
              {title}
            </Text>
            <Text size="sm" color={'$textDark600'} mt="$1" opacity={0.9}>
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

const FormSection = ({ title, description, children, icon }: any) => {
  return (
    <CustomCard title={title} description={description} icon={icon}>
      <VStack space="lg" mt="$2">
        {children}
      </VStack>
    </CustomCard>
  );
};

const StatusBadge = ({ value }: any) => {
  let color = '$red500';
  let text = 'Bajo';

  if (value >= 80) {
    color = '$emerald500';
    text = 'Excelente';
  } else if (value >= 60) {
    color = '$green500';
    text = 'Bueno';
  } else if (value >= 40) {
    color = '$yellow500';
    text = 'Regular';
  }

  return (
    <Badge size="md" variant="solid" borderRadius="$full" bg={color} px="$3" py="$1">
      <BadgeText color="$white" fontWeight="$bold" fontSize="$xs">
        {text}
      </BadgeText>
    </Badge>
  );
};


export default function FormsScreen() {
  const [formData, setFormData] = useState({
    userName: '',
    checkboxValues: [] as string[],
    radioValue: '',
    selectValue: '',
    sliderValue: 50,
    switchValue: false,
    textAreaValue: '',
    isPressed: false,
  });

  const [formProgress, setFormProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const updateFormData = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  React.useEffect(() => {
    const { userName, checkboxValues, radioValue, selectValue, sliderValue, textAreaValue, switchValue, isPressed } = formData;

    let progress = 0;
    if (userName.length > 0) progress += 15;
    if (checkboxValues.length > 0) progress += 15;
    if (radioValue) progress += 15;
    if (selectValue) progress += 15;
    if (sliderValue > 0) progress += 15;
    if (textAreaValue.length > 5) progress += 15;
    if (switchValue) progress += 10;
    if (isPressed) progress += 5;

    setFormProgress(Math.min(progress, 100));
  }, [formData]);

  const handleSubmit = () => {
    setShowModal(true);
  };

  const handleReset = () => {
    setFormData({
      userName: '',
      checkboxValues: [],
      radioValue: '',
      selectValue: '',
      sliderValue: 50,
      switchValue: false,
      textAreaValue: '',
      isPressed: false,
    });
    setShowModal(false);
  };

  const getCountryName = (code: string) => {
    const countries: { [key: string]: string } = {
      mx: 'México', us: 'Estados Unidos', es: 'España',
      co: 'Colombia', ar: 'Argentina'
    };
    return countries[code] || 'No seleccionado';
  };

  const hobbies = [
    { value: 'deportes', label: 'Deportes', icon: '⚽' },
    { value: 'musica', label: 'Música', icon: '🎵' },
    { value: 'lectura', label: 'Lectura', icon: '📚' },
    { value: 'tecnologia', label: 'Tecnología', icon: '💻' },
  ];


  return (
    <>
      <ScrollView bg="$backgroundLight50" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <Box
          bg="$primary600"
          pb="$16"
          borderBottomLeftRadius="$3xl"
          borderBottomRightRadius="$3xl"
        >
          <Box p="$6" mt="$4">
            <Box
              bg="$white"
              p="$6"
              borderRadius="$2xl"
              style={{
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 8 },
                shadowOpacity: 0.15,
                shadowRadius: 15,
                elevation: 10,
              }}
            >
              <VStack space="lg" alignItems="center">
                <HStack alignItems="center" space="md">
                  <Box
                    p="$3"
                    borderRadius="$xl"
                    bg="$primary500"
                  >
                    <Trophy size={24} color="white" />
                  </Box>
                  <VStack flex={1}>
                    <Text size="xl" fontWeight="$black" color="$primary600">
                      Formulario de Práctica
                    </Text>
                    <Text size="sm" color="$primary600" mt="$1" opacity={0.9}>
                      Complete los campos requeridos
                    </Text>
                  </VStack>
                </HStack>

                <VStack space="md" width="$full">
                  <HStack justifyContent="space-between" alignItems="center">
                    <Text color="$textDark600" size="sm">Progreso: {formProgress}%</Text>
                    <StatusBadge value={formProgress} />
                  </HStack>

                  <Progress value={formProgress} size="lg" bg="$primary200">
                    <ProgressFilledTrack bg="$primary500" />
                  </Progress>

                  <Text color="$textDark500" size="xs" textAlign="center">
                    {formProgress >= 70
                      ? '✅ Listo para enviar'
                      : `Complete al menos el 70% (${70 - formProgress}% restante)`
                    }
                  </Text>
                </VStack>
              </VStack>
            </Box>
          </Box>
        </Box>

        {/* Contenido del formulario */}
        <Box p="$6" style={{ marginTop: -48 }}>

          {/* Campo de nombre */}
          <FormSection
            title="👤 Información Personal"
            description="Ingrese su nombre completo"
            icon={User}
          >
            <Input variant="outline" size="lg" borderRadius="$lg">
              <InputField
                placeholder="Nombre completo..."
                value={formData.userName}
                onChangeText={(value: string) => updateFormData('userName', value)}
              />
            </Input>
          </FormSection>

          {/* Checkbox Group */}
          <FormSection
            title="🎯 Intereses"
            description="Seleccione sus intereses"
            icon={Heart}
          >
            <CheckboxGroup
              value={formData.checkboxValues}
              onChange={(values: string[]) => updateFormData('checkboxValues', values)}
            >
              <VStack space="md">
                {hobbies.map((item) => (
                  <Checkbox key={item.value} value={item.value} size="md">
                    <CheckboxIndicator mr="$3" borderColor="$primary500">
                      <CheckboxIcon as={CheckIcon} color="$white" />
                    </CheckboxIndicator>
                    <CheckboxLabel>
                      <HStack alignItems="center" space="sm">
                        <Text fontSize="$xl">{item.icon}</Text>
                        <Text fontWeight="$medium">{item.label}</Text>
                      </HStack>
                    </CheckboxLabel>
                  </Checkbox>
                ))}
              </VStack>
            </CheckboxGroup>
          </FormSection>




          <FormSection
            title="👆 Componente Pressable"
            description="Presione para cambiar color"
            icon={Zap}
          >
            <VStack space="md" alignItems="center">
              <Pressable
                onPressIn={() => updateFormData('isPressed', true)}
                onPressOut={() => updateFormData('isPressed', false)}
                bg={formData.isPressed ? "$red500" : "$primary500"}
                px="$6"
                py="$4"
                borderRadius="$xl"
                alignItems="center"
              >
                <Text color="$white" fontWeight="$bold" size="lg">
                  {formData.isPressed ? "¡Presionado!" : "Presióname"}
                </Text>
              </Pressable>

              {/* Texto que cambia de color */}
              <Text
                color={formData.isPressed ? "$red500" : "$primary500"}
                fontWeight="$bold"
                size="lg"
                textAlign="center"
              >
                {formData.isPressed ? "🎉 Buenos dias" : "📝 Buenas noches"}
              </Text>

              {formData.isPressed && (
                <Box bg="$red50" p="$3" borderRadius="$lg" width="$full">
                  <Text color="$red600" fontWeight="$medium" textAlign="center">
                    ✅ Estado: Presionado - Todo cambió a rojo
                  </Text>
                </Box>
              )}
            </VStack>
          </FormSection>

          {/* Radio Group */}
          <FormSection
            title="👥 Género"
            description="Seleccione su género"
            icon={User}
          >
            <RadioGroup
              value={formData.radioValue}
              onChange={(value: string) => updateFormData('radioValue', value)}
            >
              <VStack space="md">
                <Radio value="masculino" size="md">
                  <RadioIndicator mr="$3" borderColor="$primary500">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel fontWeight="$medium">Masculino</RadioLabel>
                </Radio>
                <Radio value="femenino" size="md">
                  <RadioIndicator mr="$3" borderColor="$primary500">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel fontWeight="$medium">Femenino</RadioLabel>
                </Radio>
                <Radio value="otro" size="md">
                  <RadioIndicator mr="$3" borderColor="$primary500">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                  <RadioLabel fontWeight="$medium">Otro</RadioLabel>
                </Radio>
              </VStack>
            </RadioGroup>
          </FormSection>

          {/* Select */}
          <FormSection
            title="🌎 País"
            description="Seleccione su país"
            icon={MapPin}
          >
            <Select
              selectedValue={formData.selectValue}
              onValueChange={(value: string) => updateFormData('selectValue', value)}
            >
              <SelectTrigger size="lg" borderRadius="$lg">
                <SelectInput placeholder="Seleccione país..." />
                <SelectIcon as={ChevronDown} mr="$3" />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent>
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectItem label="🇲🇽 México" value="mx" />
                  <SelectItem label="🇺🇸 Estados Unidos" value="us" />
                  <SelectItem label="🇪🇸 España" value="es" />
                  <SelectItem label="🇨🇴 Colombia" value="co" />
                  <SelectItem label="🇦🇷 Argentina" value="ar" />
                </SelectContent>
              </SelectPortal>
            </Select>
          </FormSection>

          {/* Slider CORREGIDO - usa "onChange" en lugar de "onValueChange" */}
          <FormSection
            title="📊 Nivel de Satisfacción"
            description="Deslice para indicar su satisfacción"
            icon={Star}
          >
            <VStack space="md">
              <HStack justifyContent="space-between">
                <Text size="sm" color="$textDark600">0</Text>
                <Text size="lg" fontWeight="$bold" color="$primary600">
                  {formData.sliderValue}
                </Text>
                <Text size="sm" color="$textDark600">100</Text>
              </HStack>

              <Slider
                value={formData.sliderValue}
                onChange={(value: number) => updateFormData('sliderValue', value)}
                minValue={0}
                maxValue={100}
                step={1}
                size="md"
              >
                <SliderTrack>
                  <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb />
              </Slider>
            </VStack>
          </FormSection>

          {/* Switch */}
          <FormSection
            title="🔔 Notificaciones"
            description="Active/desactive notificaciones"
            icon={Bell}
          >
            <HStack justifyContent="space-between" alignItems="center">
              <Text fontWeight="$medium">Recibir notificaciones</Text>
              <Switch
                value={formData.switchValue}
                onValueChange={(value: boolean) => updateFormData('switchValue', value)}
                size="md"
              />
            </HStack>
          </FormSection>

          {/* TextArea */}
          <FormSection
            title="💬 Comentarios"
            description="Escriba sus comentarios"
            icon={MessageSquare}
          >
            <Textarea size="lg" borderRadius="$lg">
              <TextareaInput
                placeholder="Escriba aquí..."
                value={formData.textAreaValue}
                onChangeText={(value: string) => updateFormData('textAreaValue', value)}
                multiline
                textAlignVertical="top"
              />
            </Textarea>
          </FormSection>

          {/* Botón de Envío */}
          <Box
            bg="$white"
            p="$6"
            borderRadius="$2xl"
            borderWidth={2}
            borderColor="$primary200"
            mt="$4"
          >
            <VStack space="lg" alignItems="center">
              <Button
                size="xl"
                borderRadius="$lg"
                onPress={handleSubmit}
                bg={formProgress >= 70 ? "$emerald500" : "$primary500"}
                opacity={formProgress >= 70 ? 1 : 0.7}
                disabled={formProgress < 70}
              >
                <ButtonText>
                  {formProgress >= 70 ? "Enviar Formulario" : "Complete más campos"}
                </ButtonText>
                <Send size={20} color="white" style={{ marginLeft: 8 }} />
              </Button>

              <Text size="sm" color="$textDark500" textAlign="center">
                {formProgress >= 70
                  ? "Formulario listo para enviar"
                  : `Progreso: ${formProgress}% (mínimo 70% requerido)`
                }
              </Text>
            </VStack>
          </Box>

          <Box height="$10" />
        </Box>
      </ScrollView>

      {/* Modal de Confirmación */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="lg">
        <ModalBackdrop />
        <ModalContent bg="$white" borderRadius="$3xl" mx="$4">
          <ModalHeader>
            <VStack space="md" alignItems="center" width="$full">
              <Box
                p="$4"
                borderRadius="$full"
                bg="$emerald500"
              >
                <CheckCircle2 size={32} color="white" />
              </Box>
              <VStack alignItems="center" space="sm">
                <Heading size="xl" color="$emerald600" textAlign="center">
                  ¡Formulario Enviado!
                </Heading>
                <Text textAlign="center" color="$textDark500">
                  Información procesada correctamente
                </Text>
              </VStack>
            </VStack>
          </ModalHeader>

          <ModalBody>
            <VStack space="lg" width="$full">
              {/* Resumen de Datos */}
              <Box bg="$white" p="$4" borderRadius="$xl" borderWidth={1} borderColor="$borderLight200">
                <Text size="lg" fontWeight="$bold" color="$textDark800" mb="$3">
                  Resumen de Datos
                </Text>

                <VStack space="sm">
                  {formData.userName && (
                    <HStack justifyContent="space-between">
                      <Text color="$textDark600">Nombre:</Text>
                      <Text fontWeight="$bold">{formData.userName}</Text>
                    </HStack>
                  )}

                  <HStack justifyContent="space-between">
                    <Text color="$textDark600">Intereses:</Text>
                    <Text fontWeight="$bold">
                      {formData.checkboxValues.length > 0 ? formData.checkboxValues.length + ' seleccionados' : 'Ninguno'}
                    </Text>
                  </HStack>

                  {formData.radioValue && (
                    <HStack justifyContent="space-between">
                      <Text color="$textDark600">Género:</Text>
                      <Text fontWeight="$bold" textTransform="capitalize">{formData.radioValue}</Text>
                    </HStack>
                  )}

                  {formData.selectValue && (
                    <HStack justifyContent="space-between">
                      <Text color="$textDark600">País:</Text>
                      <Text fontWeight="$bold">{getCountryName(formData.selectValue)}</Text>
                    </HStack>
                  )}

                  <HStack justifyContent="space-between">
                    <Text color="$textDark600">Satisfacción:</Text>
                    <Text fontWeight="$bold">{formData.sliderValue}/100</Text>
                  </HStack>

                  <HStack justifyContent="space-between">
                    <Text color="$textDark600">Notificaciones:</Text>
                    <Text fontWeight="$bold">{formData.switchValue ? 'Activadas' : 'Desactivadas'}</Text>
                  </HStack>

                  {formData.textAreaValue && (
                    <VStack space="xs">
                      <Text color="$textDark600">Comentarios:</Text>
                      <Text fontStyle="italic" bg="$backgroundLight50" p="$2" borderRadius="$md">
                        "{formData.textAreaValue}"
                      </Text>
                    </VStack>
                  )}
                </VStack>
              </Box>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack space="md" width="$full">
              <Button
                variant="outline"
                action="secondary"
                flex={1}
                onPress={() => setShowModal(false)}
              >
                <ButtonText>Cerrar</ButtonText>
              </Button>
              <Button
                bg="$emerald500"
                flex={1}
                onPress={handleReset}
              >
                <ButtonText>Nuevo Formulario</ButtonText>
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}