// app/display.tsx
import React, { useState } from 'react';
import {
  Box,
  Text,
  VStack,
  HStack,
  Button,
  ButtonText,
  Card,
  Badge,
  BadgeText,
  Image,
  Toast,
  ToastTitle,
  useToast,
  ScrollView,
  Pressable,
  Input,
  InputField,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormControl,
  FormControlLabel,
  FormControlLabelText,
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
  ChevronDownIcon,
  CloseIcon,
  Icon,
  Progress,
  ProgressFilledTrack
} from '@gluestack-ui/themed';
import { ShoppingCart, PackageX, Plus, Filter, Search, X, Star, Trash2, Eye, Package, ChevronRight } from 'lucide-react-native';

// Datos de ejemplo para la tabla de productos
const initialProductsData = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    price: '$999',
    category: 'Electrónicos',
    stock: 0,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=300',
    rating: 4.8,
    description: 'El último iPhone con chip A17 Pro'
  },
  {
    id: 2,
    name: 'MacBook Air',
    price: '$1,199',
    category: 'Computadoras',
    stock: 15,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300',
    rating: 4.6,
    description: 'Laptop ultradelgada con chip M2'
  },
  {
    id: 3,
    name: 'AirPods Pro',
    price: '$249',
    category: 'Audio',
    stock: 0,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300',
    rating: 4.4,
    description: 'Audífonos inalámbricos con cancelación de ruido'
  },
  {
    id: 4,
    name: 'iPad Air',
    price: '$599',
    category: 'Tablets',
    stock: 8,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
    rating: 4.5,
    description: 'Tablet versátil para trabajo y entretenimiento'
  },
  {
    id: 5,
    name: 'Apple Watch',
    price: '$399',
    category: 'Wearables',
    stock: 20,
    image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=300',
    rating: 4.3,
    description: 'Reloj inteligente con monitor de salud'
  },
  {
    id: 6,
    name: 'Samsung Galaxy S24',
    price: '$899',
    category: 'Electrónicos',
    stock: 12,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
    rating: 4.7,
    description: 'Smartphone Android de última generación'
  }
];

export default function DisplayScreen() {
  const toast = useToast();
  const [cart, setCart] = useState<number[]>([]);
  const [productsData, setProductsData] = useState(initialProductsData);
  const [filteredProducts, setFilteredProducts] = useState(initialProductsData);
  const [showNewProductModal, setShowNewProductModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showStockModal, setShowStockModal] = useState(false);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');

  // Estado para nuevo producto
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'Electrónicos',
    stock: '',
    image: '',
    description: ''
  });

  const categories = ['Todos', 'Electrónicos', 'Computadoras', 'Audio', 'Tablets', 'Wearables'];

  // Obtener productos en el carrito
  const getCartProducts = () => {
    return productsData.filter(product => cart.includes(product.id));
  };

  // Calcular total del carrito
  const getCartTotal = () => {
    return getCartProducts().reduce((total, product) => {
      const price = parseInt(product.price.replace('$', ''));
      return total + price;
    }, 0);
  };

  // Remover producto del carrito
  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(id => id !== productId));
    toast.show({
      placement: "bottom",
      render: ({ id }) => (
        <Toast nativeID={id} action="info" variant="accent">
          <ToastTitle>🗑️ Producto removido del carrito</ToastTitle>
        </Toast>
      )
    });
  };

  // Vaciar carrito completo
  const clearCart = () => {
    setCart([]);
    toast.show({
      placement: "bottom",
      render: ({ id }) => (
        <Toast nativeID={id} action="info" variant="accent">
          <ToastTitle>🛒 Carrito vaciado</ToastTitle>
        </Toast>
      )
    });
  };

  // Función para agregar nuevo producto
  const handleAddNewProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.stock) {
      toast.show({
        placement: "top",
        render: ({ id }) => (
          <Toast nativeID={id} action="error" variant="accent">
            <ToastTitle>❌ Completa todos los campos</ToastTitle>
          </Toast>
        )
      });
      return;
    }

    const product = {
      id: productsData.length + 1,
      name: newProduct.name,
      price: `$${newProduct.price}`,
      category: newProduct.category,
      stock: parseInt(newProduct.stock),
      image: newProduct.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300',
      rating: 4.0,
      description: newProduct.description || 'Producto de alta calidad'
    };

    setProductsData(prev => [...prev, product]);
    setFilteredProducts(prev => [...prev, product]);
    
    setNewProduct({
      name: '',
      price: '',
      category: 'Electrónicos',
      stock: '',
      image: '',
      description: ''
    });
    
    setShowNewProductModal(false);
    
    toast.show({
      placement: "top",
      render: ({ id }) => (
        <Toast nativeID={id} action="success" variant="accent">
          <ToastTitle>✅ Producto agregado exitosamente</ToastTitle>
        </Toast>
      )
    });
  };

  // Función para filtrar productos
  const applyFilters = () => {
    let filtered = productsData;

    // Filtro por búsqueda
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtro por categoría
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category === selectedCategory
      );
    }

    // Filtro por stock
    if (stockFilter === 'inStock') {
      filtered = filtered.filter(product => product.stock > 0);
    } else if (stockFilter === 'outOfStock') {
      filtered = filtered.filter(product => product.stock === 0);
    }

    setFilteredProducts(filtered);
    setShowFilterModal(false);
  };

  // Función para resetear filtros
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setStockFilter('all');
    setFilteredProducts(productsData);
    setShowFilterModal(false);
  };

  const handleAddToCart = (productId: number, productName: string) => {
    setCart(prev => [...prev, productId]);
    
    toast.show({
      placement: "bottom",
      render: ({ id }) => (
        <Toast nativeID={id} action="success" variant="accent">
          <ToastTitle>✅ {productName} agregado al carrito</ToastTitle>
        </Toast>
      )
    });
  };

  const isInCart = (productId: number) => cart.includes(productId);

  // Función para renderizar estrellas de rating
  const renderRating = (rating: number) => {
    return (
      <HStack space="xs" alignItems="center">
        <Star size={12} fill="#FFD700" color="#FFD700" />
        <Text size="xs" color="$textDark500">{rating}</Text>
      </HStack>
    );
  };

  // Función para calcular porcentaje de stock
  const getStockPercentage = (stock: number, maxStock: number = 50) => {
    return (stock / maxStock) * 100;
  };

  // Obtener productos con stock bajo (menos del 20%)
  const getLowStockProducts = () => {
    return productsData.filter(product => product.stock > 0 && product.stock <= 10);
  };

  // Función para ver detalle del producto
  const viewProductDetail = (product: any) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  // Componente de tarjeta de producto para móvil
  const ProductCard = ({ product }: { product: any }) => (
    <Card 
      bg="$white" 
      borderRadius="$xl" 
      mb="$4"
      p="$4"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
      }}
    >
      <Pressable onPress={() => viewProductDetail(product)}>
        <VStack space="md">
          {/* Header de la tarjeta */}
          <HStack space="md" alignItems="center">
            <Box
              width={80}
              height={80}
              borderRadius="$lg"
              overflow="hidden"
              bg="$backgroundLight200"
            >
              <Image
                source={{ uri: product.image }}
                alt={product.name}
                width={80}
                height={80}
                resizeMode="cover"
              />
            </Box>
            
            <VStack flex={1} space="xs">
              <Text fontWeight="$bold" size="lg" color="$textDark900">
                {product.name}
              </Text>
              <HStack space="sm" alignItems="center">
                {renderRating(product.rating)}
                <Badge size="sm" variant="outline" bg="$primary50" borderColor="$primary300">
                  <BadgeText color="$primary600" size="xs">
                    {product.category}
                  </BadgeText>
                </Badge>
              </HStack>
              <Text fontWeight="$bold" color="$primary600" size="xl">
                {product.price}
              </Text>
            </VStack>
            
            <ChevronRight size={20} color="$textDark400" />
          </HStack>

          {/* Estado de stock */}
          <VStack space="sm">
            <HStack justifyContent="space-between" alignItems="center">
              <Text color="$textDark600" size="sm">
                Estado de stock:
              </Text>
              <Badge 
                size="sm" 
                variant="solid" 
                borderRadius="$full"
                bg={
                  product.stock === 0 ? "$red500" : 
                  product.stock <= 5 ? "$orange500" : "$emerald500"
                }
              >
                <BadgeText>
                  {product.stock === 0 ? 'Agotado' : 
                   product.stock <= 5 ? 'Stock bajo' : 'Disponible'}
                </BadgeText>
              </Badge>
            </HStack>
            
            <Progress 
              value={getStockPercentage(product.stock)} 
              size="sm" 
              bg="$backgroundLight200"
            >
              <ProgressFilledTrack bg={
                product.stock === 0 ? "$red500" : 
                product.stock <= 5 ? "$orange500" : "$emerald500"
              } />
            </Progress>
            
            <Text size="xs" color="$textDark500" textAlign="center">
              {product.stock} unidades disponibles
            </Text>
          </VStack>

          {/* Botones de acción */}
          <HStack space="sm">
            <Button 
              flex={1}
              size="md"
              borderRadius="$lg"
              onPress={() => handleAddToCart(product.id, product.name)}
              disabled={product.stock === 0}
              opacity={product.stock === 0 ? 0.5 : 1}
              bg={product.stock === 0 ? "$coolGray600" : "$emerald800"}
            >
              <ButtonText>
                {product.stock === 0 ? 'Agotado' : 'Add to cart'}
              </ButtonText>
              <ShoppingCart size={16} color="white" style={{ marginLeft: 8 }} />
            </Button>
            
            <Button 
              size="md"
              bg='$emerald500'
              variant="outline"
              borderRadius="$lg"
              onPress={() => viewProductDetail(product)}
            >
              <Eye size={16} color="white" />
            </Button>
          </HStack>

          {/* Estado en carrito */}
          {isInCart(product.id) && (
            <HStack space="sm" alignItems="center" bg="$emerald50" p="$2" borderRadius="$lg">
              <ShoppingCart size={16} color="#10B981" />
              <Text size="xs" color="$emerald600" fontWeight="$medium">
                Este producto está en tu carrito
              </Text>
            </HStack>
          )}
        </VStack>
      </Pressable>
    </Card>
  );

  // Componente de tabla para desktop

  // Componente de lista móvil
  const MobileList = () => (
    <Box >
      <VStack space="sm">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </VStack>
    </Box>
  );

  return (
    <ScrollView bg="$backgroundLight50" showsVerticalScrollIndicator={false}>
      <Box flex={1} p="$4">
        
        {/* Header Mejorado */}
        <VStack space="lg" alignItems="center" mb="$6">
          <Box 
            p="$4" 
            borderRadius="$full" 
            bg="$primary600"
            style={{
              shadowColor: '#6366F1',
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.4,
              shadowRadius: 12,
              elevation: 8,
            }}
          >
            <ShoppingCart size={32} color="white" />
          </Box>
          <VStack space="sm" alignItems="center">
            <Text size="2xl" bold textAlign="center" color="$textDark900">
              Tienda Belik Josh
            </Text>
            <Text size="md" textAlign="center" color="$primary600" fontWeight="$medium">
              Gestiona tu inventario y ventas
            </Text>
          </VStack>
        </VStack>

        {/* Barra de búsqueda */}
        <Box mb="$4">
          <Input variant="outline" size="lg" borderRadius="$lg" bg="$white">
            <InputField
              placeholder="Buscar productos..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <Pressable onPress={applyFilters} mr="$3">
              <Search size={20} color="$primary600" />
            </Pressable>
          </Input>
        </Box>

        {/* Botones de acción mejorados */}
        <VStack space="md" mb="$4">
          <HStack space="sm" flexWrap="wrap">
            <Button 
              size="md" 
              borderRadius="$lg" 
              flex={1}
              minWidth={120}
              bg="$primary500"
              onPress={() => setShowNewProductModal(true)}
            >
              <ButtonText>Nuevo</ButtonText>
              <Plus size={16} color="white" style={{ marginLeft: 6 }} />
            </Button>
            
            <Button 
              size="md" 
              borderRadius="$lg" 
              variant="outline"
              flex={1}
              minWidth={120}
              borderColor="$primary500"
              onPress={() => setShowFilterModal(true)}
            >
              <ButtonText color="$primary600">Filtrar</ButtonText>
              <Filter size={16} color="#6366F1" style={{ marginLeft: 6 }} />
            </Button>

            <Button 
              size="md" 
              borderRadius="$lg" 
              variant="outline"
              flex={1}
              minWidth={120}
              borderColor="$emerald500"
              onPress={() => setShowCartModal(true)}
            >
              <ButtonText color="$emerald600">Carrito</ButtonText>
              <ShoppingCart size={16} color="#10B981" style={{ marginLeft: 6 }} />
              {cart.length > 0 && (
                <Badge size="sm" variant="solid" bg="$red500" position="absolute" top={-6} right={-6}>
                  <BadgeText color="$white" fontSize="$2xs">{cart.length}</BadgeText>
                </Badge>
              )}
            </Button>

            <Button 
              size="md" 
              borderRadius="$lg" 
              variant="outline"
              flex={1}
              minWidth={120}
              borderColor="$blue500"
              onPress={() => setShowStockModal(true)}
            >
              <ButtonText color="$blue600">Stock</ButtonText>
              <Package size={16} color="#3B82F6" style={{ marginLeft: 6 }} />
            </Button>
          </HStack>

          {/* Contadores rápidos */}
          <HStack space="sm" justifyContent="space-between">
            <Box flex={1} bg="$primary50" p="$2" borderRadius="$lg" alignItems="center">
              <Text size="xs" color="$primary600" fontWeight="$bold">
                {filteredProducts.length} Productos
              </Text>
            </Box>
            <Box flex={1} bg="$emerald50" p="$2" borderRadius="$lg" alignItems="center">
              <Text size="xs" color="$emerald600" fontWeight="$bold">
                {filteredProducts.filter(p => p.stock > 0).length} En Stock
              </Text>
            </Box>
            <Box flex={1} bg="$red50" p="$2" borderRadius="$lg" alignItems="center">
              <Text size="xs" color="$red600" fontWeight="$bold">
                {cart.length} En Carrito
              </Text>
            </Box>
            <Box flex={1} bg="$orange50" p="$2" borderRadius="$lg" alignItems="center">
              <Text size="xs" color="$orange600" fontWeight="$bold">
                ${getCartTotal()}
              </Text>
            </Box>
          </HStack>
        </VStack>

        {/* Tabla de productos dentro de Card mejorada */}
        <Card p="$0" borderRadius="$2xl" mb="$6" 
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.1,
            shadowRadius: 16,
            elevation: 8,
          }}
        >
          <Box 
            p="$4" 
            bg="$primary600"
            borderTopLeftRadius="$2xl" 
            borderTopRightRadius="$2xl"
          >
            <HStack justifyContent="space-between" alignItems="center">
              <VStack>
                <Text size="lg" fontWeight="$bold" color="$white">
                  Inventario de Productos
                </Text>
                <Text size="sm" color="$primary100">
                  {filteredProducts.length} productos encontrados
                </Text>
              </VStack>
              <Badge size="sm" variant="solid" bg="$white">
                <BadgeText color="$primary600" fontWeight="$bold">
                  {productsData.length} total
                </BadgeText>
              </Badge>
            </HStack>
          </Box>

          {/* Contenido responsive */}
          <Box p="$4">
            <MobileList />
          </Box>

          {/* Footer de la card */}
          <Box p="$4" bg="$backgroundLight50" borderBottomLeftRadius="$2xl" borderBottomRightRadius="$2xl">
            <VStack space="sm" alignItems="center">
              <Text size="sm" color="$textDark500" textAlign="center">
                Mostrando {filteredProducts.length} de {productsData.length} productos
              </Text>
              <HStack space="sm" alignItems="center">
                <Badge size="sm" variant="solid" bg="$primary500">
                  <BadgeText color="$white" fontWeight="$bold">
                    {cart.length} en carrito
                  </BadgeText>
                </Badge>
                <Badge size="sm" variant="solid" bg="$emerald500">
                  <BadgeText color="$white" fontWeight="$bold">
                    ${getCartTotal()}
                  </BadgeText>
                </Badge>
              </HStack>
            </VStack>
          </Box>
        </Card>

        {/* Modal de Detalle de Producto */}
        <Modal isOpen={showProductDetail} onClose={() => setShowProductDetail(false)} size="lg">
          <ModalBackdrop />
          <ModalContent bg="$white" borderRadius="$3xl" mx="$4">
            <ModalHeader>
              <VStack space="xs" width="$full">
                <HStack alignItems="center" space="md" justifyContent="space-between">
                  <Text fontSize="$lg" fontWeight="$bold">Detalle del Producto</Text>
                  <Pressable onPress={() => setShowProductDetail(false)}>
                    <Box p="$2" borderRadius="$full" bg="$backgroundLight200">
                      <X size={16} color="$textDark500" />
                    </Box>
                  </Pressable>
                </HStack>
              </VStack>
            </ModalHeader>
            <ModalBody>
              {selectedProduct && (
                <VStack space="lg" py="$4">
                  <HStack space="md" alignItems="center">
                    <Box
                      width={100}
                      height={100}
                      borderRadius="$lg"
                      overflow="hidden"
                      bg="$backgroundLight200"
                    >
                      <Image
                        source={{ uri: selectedProduct.image }}
                        alt={selectedProduct.name}
                        width={100}
                        height={100}
                        resizeMode="cover"
                      />
                    </Box>
                    <VStack flex={1} space="xs">
                      <Text fontWeight="$bold" size="xl" color="$textDark900">
                        {selectedProduct.name}
                      </Text>
                      <Text fontWeight="$bold" color="$primary600" size="2xl">
                        {selectedProduct.price}
                      </Text>
                      <HStack space="sm" alignItems="center">
                        {renderRating(selectedProduct.rating)}
                        <Badge size="sm" variant="outline" bg="$primary50">
                          <BadgeText color="$primary600">{selectedProduct.category}</BadgeText>
                        </Badge>
                      </HStack>
                    </VStack>
                  </HStack>

                  <VStack space="sm">
                    <Text fontWeight="$bold" color="$textDark700">Descripción:</Text>
                    <Text color="$textDark600">{selectedProduct.description}</Text>
                  </VStack>

                  <VStack space="sm">
                    <Text fontWeight="$bold" color="$textDark700">Estado de Stock:</Text>
                    <HStack space="sm" alignItems="center">
                      <Progress 
                        value={getStockPercentage(selectedProduct.stock)} 
                        flex={1}
                        size="md"
                        bg="$backgroundLight200"
                      >
                        <ProgressFilledTrack bg={
                          selectedProduct.stock === 0 ? "$red500" : 
                          selectedProduct.stock <= 5 ? "$orange500" : "$emerald500"
                        } />
                      </Progress>
                      <Text fontWeight="$bold" color={
                        selectedProduct.stock === 0 ? "$red600" : 
                        selectedProduct.stock <= 5 ? "$orange600" : "$emerald600"
                      }>
                        {selectedProduct.stock} unidades
                      </Text>
                    </HStack>
                  </VStack>

                  <Button 
                    size="lg"
                    borderRadius="$lg"
                    onPress={() => {
                      handleAddToCart(selectedProduct.id, selectedProduct.name);
                      setShowProductDetail(false);
                    }}
                    disabled={selectedProduct.stock === 0}
                    opacity={selectedProduct.stock === 0 ? 0.5 : 1}
                    bg={selectedProduct.stock === 0 ? "$coolGray400" : "$emerald500"}
                  >
                    <ButtonText>
                      {selectedProduct.stock === 0 ? 'Producto Agotado' : 'Agregar al Carrito'}
                    </ButtonText>
                    <ShoppingCart size={20} color="white" style={{ marginLeft: 8 }} />
                  </Button>
                </VStack>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>

        {/* Modal para Nuevo Producto */}
        <Modal isOpen={showNewProductModal} onClose={() => setShowNewProductModal(false)} size="lg">
          <ModalBackdrop />
          <ModalContent bg="$white" borderRadius="$3xl" mx="$4">
            <ModalHeader>
              <VStack space="xs" width="$full">
                <HStack alignItems="center" space="md" justifyContent="space-between">
                  <HStack alignItems="center" space="md">
                    <Box p="$2" borderRadius="$full" bg="$primary500">
                      <Plus size={20} color="white" />
                    </Box>
                    <Text fontSize="$lg" fontWeight="$bold">Agregar Nuevo Producto</Text>
                  </HStack>
                  <Pressable onPress={() => setShowNewProductModal(false)}>
                    <Box p="$2" borderRadius="$full" bg="$backgroundLight200">
                      <X size={16} color="$textDark500" />
                    </Box>
                  </Pressable>
                </HStack>
              </VStack>
            </ModalHeader>
            <ModalBody>
              <VStack space="md" py="$4">
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Nombre del Producto</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      placeholder="Ej: iPhone 15 Pro"
                      value={newProduct.name}
                      onChangeText={(text) => setNewProduct(prev => ({...prev, name: text}))}
                    />
                  </Input>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Precio ($)</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      placeholder="Ej: 999"
                      keyboardType="numeric"
                      value={newProduct.price}
                      onChangeText={(text) => setNewProduct(prev => ({...prev, price: text}))}
                    />
                  </Input>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Categoría</FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    selectedValue={newProduct.category}
                    onValueChange={(value) => setNewProduct(prev => ({...prev, category: value}))}
                  >
                    <SelectTrigger>
                      <SelectInput placeholder="Seleccionar categoría" />
                      <SelectIcon as={ChevronDownIcon} mr="$3" />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {categories.filter(cat => cat !== 'Todos').map((category) => (
                          <SelectItem key={category} label={category} value={category} />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Stock Disponible</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      placeholder="Ej: 10"
                      keyboardType="numeric"
                      value={newProduct.stock}
                      onChangeText={(text) => setNewProduct(prev => ({...prev, stock: text}))}
                    />
                  </Input>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Descripción</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      placeholder="Descripción del producto..."
                      value={newProduct.description}
                      onChangeText={(text) => setNewProduct(prev => ({...prev, description: text}))}
                    />
                  </Input>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>URL de Imagen (opcional)</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      placeholder="https://ejemplo.com/imagen.jpg"
                      value={newProduct.image}
                      onChangeText={(text) => setNewProduct(prev => ({...prev, image: text}))}
                    />
                  </Input>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <HStack space="md" width="$full">
                <Button
                  variant="outline"
                  action="secondary"
                  flex={1}
                  onPress={() => setShowNewProductModal(false)}
                >
                  <ButtonText>Cancelar</ButtonText>
                </Button>
                <Button
                  bg="$primary500"
                  flex={1}
                  onPress={handleAddNewProduct}
                >
                  <ButtonText>Agregar Producto</ButtonText>
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal para Filtros */}
        <Modal isOpen={showFilterModal} onClose={() => setShowFilterModal(false)} size="lg">
          <ModalBackdrop />
          <ModalContent bg="$white" borderRadius="$3xl" mx="$4">
            <ModalHeader>
              <VStack space="xs" width="$full">
                <HStack alignItems="center" space="md" justifyContent="space-between">
                  <HStack alignItems="center" space="md">
                    <Box p="$2" borderRadius="$full" bg="$primary500">
                      <Filter size={20} color="white" />
                    </Box>
                    <Text fontSize="$lg" fontWeight="$bold">Filtrar Productos</Text>
                  </HStack>
                  <Pressable onPress={() => setShowFilterModal(false)}>
                    <Box p="$2" borderRadius="$full" bg="$backgroundLight200">
                      <X size={16} color="$textDark500" />
                    </Box>
                  </Pressable>
                </HStack>
              </VStack>
            </ModalHeader>
            <ModalBody>
              <VStack space="lg" py="$4">
                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Buscar</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      placeholder="Buscar por nombre o descripción..."
                      value={searchQuery}
                      onChangeText={setSearchQuery}
                    />
                  </Input>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Categoría</FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    selectedValue={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectInput placeholder="Todas las categorías" />
                      <SelectIcon as={ChevronDownIcon} mr="$3" />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        {categories.map((category) => (
                          <SelectItem 
                            key={category} 
                            label={category} 
                            value={category === 'Todos' ? 'all' : category} 
                          />
                        ))}
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </FormControl>

                <FormControl>
                  <FormControlLabel>
                    <FormControlLabelText>Estado de Stock</FormControlLabelText>
                  </FormControlLabel>
                  <Select
                    selectedValue={stockFilter}
                    onValueChange={setStockFilter}
                  >
                    <SelectTrigger>
                      <SelectInput placeholder="Todos los productos" />
                      <SelectIcon as={ChevronDownIcon} mr="$3" />
                    </SelectTrigger>
                    <SelectPortal>
                      <SelectBackdrop />
                      <SelectContent>
                        <SelectDragIndicatorWrapper>
                          <SelectDragIndicator />
                        </SelectDragIndicatorWrapper>
                        <SelectItem label="Todos" value="all" />
                        <SelectItem label="En Stock" value="inStock" />
                        <SelectItem label="Agotados" value="outOfStock" />
                      </SelectContent>
                    </SelectPortal>
                  </Select>
                </FormControl>

                <VStack space="sm">
                  <Text fontWeight="$bold" size="sm">Resumen de Filtros:</Text>
                  <HStack space="sm" flexWrap="wrap">
                    {selectedCategory !== 'all' && (
                      <Badge size="sm" variant="solid" bg="$primary500">
                        <BadgeText>Categoría: {selectedCategory}</BadgeText>
                      </Badge>
                    )}
                    {stockFilter !== 'all' && (
                      <Badge size="sm" variant="solid" bg={stockFilter === 'inStock' ? '$emerald500' : '$red500'}>
                        <BadgeText>{stockFilter === 'inStock' ? 'En Stock' : 'Agotados'}</BadgeText>
                      </Badge>
                    )}
                    {searchQuery && (
                      <Badge size="sm" variant="solid" bg="$purple500">
                        <BadgeText>Buscar: {searchQuery}</BadgeText>
                      </Badge>
                    )}
                  </HStack>
                </VStack>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <HStack space="md" width="$full">
                <Button
                  variant="outline"
                  action="secondary"
                  flex={1}
                  onPress={resetFilters}
                >
                  <ButtonText>Limpiar</ButtonText>
                </Button>
                <Button
                  variant="outline"
                  action="secondary"
                  flex={1}
                  onPress={() => setShowFilterModal(false)}
                >
                  <ButtonText>Cancelar</ButtonText>
                </Button>
                <Button
                  bg="$primary500"
                  flex={1}
                  onPress={applyFilters}
                >
                  <ButtonText>Aplicar</ButtonText>
                </Button>
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal para Ver Carrito */}
        <Modal isOpen={showCartModal} onClose={() => setShowCartModal(false)} size="lg">
          <ModalBackdrop />
          <ModalContent bg="$white" borderRadius="$3xl" mx="$4" maxHeight={384}>
            <ModalHeader>
              <VStack space="xs" width="$full">
                <HStack alignItems="center" space="md" justifyContent="space-between">
                  <HStack alignItems="center" space="md">
                    <Box p="$2" borderRadius="$full" bg="$emerald500">
                      <ShoppingCart size={20} color="white" />
                    </Box>
                    <Text fontSize="$lg" fontWeight="$bold">Mi Carrito</Text>
                  </HStack>
                  {cart.length > 0 && (
                    <Button size="sm" variant="outline" onPress={clearCart}>
                      <ButtonText color="$red600">Vaciar</ButtonText>
                    </Button>
                  )}
                </HStack>
              </VStack>
            </ModalHeader>
            <ModalBody>
              {cart.length === 0 ? (
                <VStack space="md" alignItems="center" py="$8">
                  <ShoppingCart size={48} color="$coolGray300" />
                  <Text color="$coolGray500" textAlign="center" fontSize="$lg">
                    Tu carrito está vacío
                  </Text>
                  <Text color="$coolGray400" textAlign="center">
                    Agrega algunos productos para verlos aquí
                  </Text>
                </VStack>
              ) : (
                <VStack space="md">
                  {getCartProducts().map((product) => (
                    <HStack key={product.id} space="md" alignItems="center" bg="$backgroundLight50" p="$3" borderRadius="$lg">
                      <Box
                        width={48}
                        height={48}
                        borderRadius={8}
                        overflow="hidden"
                      >
                        <Image
                          source={{ uri: product.image }}
                          alt={product.name}
                          width={48}
                          height={48}
                          resizeMode="cover"
                        />
                      </Box>
                      <VStack flex={1} space="xs">
                        <Text fontWeight="$bold" size="sm">{product.name}</Text>
                        <Text color="$primary600" fontWeight="$bold">{product.price}</Text>
                        <Text size="xs" color="$textDark500">{product.category}</Text>
                      </VStack>
                      <Pressable onPress={() => removeFromCart(product.id)}>
                        <Box p="$2" borderRadius="$full" bg="$red50">
                          <Trash2 size={16} color="#DC2626" />
                        </Box>
                      </Pressable>
                    </HStack>
                  ))}
                  
                  {/* Total */}
                  <Card bg="$emerald50" mt="$4">
                    <HStack justifyContent="space-between" alignItems="center" p="$4">
                      <Text fontWeight="$bold" color="$emerald700">Total del Carrito:</Text>
                      <Text fontWeight="$bold" color="$emerald700" fontSize="$xl">
                        ${getCartTotal()}
                      </Text>
                    </HStack>
                  </Card>
                </VStack>
              )}
            </ModalBody>
            <ModalFooter>
              <HStack space="md" width="$full">
                <Button
                  variant="outline"
                  action="secondary"
                  flex={1}
                  onPress={() => setShowCartModal(false)}
                >
                  <ButtonText>Cerrar</ButtonText>
                </Button>
                {cart.length > 0 && (
                  <Button
                    bg="$emerald500"
                    flex={1}
                    onPress={() => {
                      toast.show({
                        placement: "top",
                        render: ({ id }) => (
                          <Toast nativeID={id} action="success" variant="accent">
                            <ToastTitle>🎉 Compra realizada por ${getCartTotal()}</ToastTitle>
                          </Toast>
                        )
                      });
                      setCart([]);
                      setShowCartModal(false);
                    }}
                  >
                    <ButtonText>Comprar</ButtonText>
                  </Button>
                )}
              </HStack>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal para Visualizar Stock */}
        <Modal isOpen={showStockModal} onClose={() => setShowStockModal(false)} size="lg">
          <ModalBackdrop />
          <ModalContent bg="$white" borderRadius="$3xl" mx="$4" maxHeight={384}>
            <ModalHeader>
              <VStack space="xs" width="$full">
                <HStack alignItems="center" space="md" justifyContent="space-between">
                  <HStack alignItems="center" space="md">
                    <Box p="$2" borderRadius="$full" bg="$blue500">
                      <Package size={20} color="white" />
                    </Box>
                    <Text fontSize="$lg" fontWeight="$bold">Gestión de Stock</Text>
                  </HStack>
                  <Pressable onPress={() => setShowStockModal(false)}>
                    <Box p="$2" borderRadius="$full" bg="$backgroundLight200">
                      <X size={16} color="$textDark500" />
                    </Box>
                  </Pressable>
                </HStack>
              </VStack>
            </ModalHeader>
            <ModalBody>
              <VStack space="lg">
                {/* Resumen de Stock */}
                <Card bg="$blue50">
                  <VStack space="sm" p="$4">
                    <Text fontWeight="$bold" color="$blue700" fontSize="$lg">Resumen de Inventario</Text>
                    <HStack space="md" flexWrap="wrap">
                      <Box flex={1} minWidth={96} bg="$white" p="$3" borderRadius="$lg" alignItems="center">
                        <Text fontWeight="$bold" color="$textDark900" fontSize="$xl">
                          {productsData.length}
                        </Text>
                        <Text color="$textDark600" size="xs">Total Productos</Text>
                      </Box>
                      <Box flex={1} minWidth={96} bg="$white" p="$3" borderRadius="$lg" alignItems="center">
                        <Text fontWeight="$bold" color="$emerald600" fontSize="$xl">
                          {productsData.filter(p => p.stock > 0).length}
                        </Text>
                        <Text color="$textDark600" size="xs">En Stock</Text>
                      </Box>
                      <Box flex={1} minWidth={96} bg="$white" p="$3" borderRadius="$lg" alignItems="center">
                        <Text fontWeight="$bold" color="$red600" fontSize="$xl">
                          {productsData.filter(p => p.stock === 0).length}
                        </Text>
                        <Text color="$textDark600" size="xs">Agotados</Text>
                      </Box>
                    </HStack>
                  </VStack>
                </Card>

                {/* Productos con stock bajo */}
                {getLowStockProducts().length > 0 && (
                  <Card bg="$orange50">
                    <VStack space="sm" p="$4">
                      <Text fontWeight="$bold" color="$orange700">⚠️ Stock Bajo</Text>
                      <VStack space="sm">
                        {getLowStockProducts().map(product => (
                          <HStack key={product.id} space="md" alignItems="center">
                            <Box
                              width={32}
                              height={32}
                              borderRadius={6}
                              overflow="hidden"
                            >
                              <Image
                                source={{ uri: product.image }}
                                alt={product.name}
                                width={32}
                                height={32}
                                resizeMode="cover"
                              />
                            </Box>
                            <VStack flex={1}>
                              <Text size="sm" fontWeight="$medium">{product.name}</Text>
                              <Text size="xs" color="$orange600">Solo {product.stock} unidades</Text>
                            </VStack>
                            <Badge size="sm" variant="solid" bg="$orange500">
                              <BadgeText>Bajo</BadgeText>
                            </Badge>
                          </HStack>
                        ))}
                      </VStack>
                    </VStack>
                  </Card>
                )}

                {/* Productos agotados */}
                {productsData.filter(p => p.stock === 0).length > 0 && (
                  <Card bg="$red50">
                    <VStack space="sm" p="$4">
                      <Text fontWeight="$bold" color="$red700">❌ Productos Agotados</Text>
                      <VStack space="sm">
                        {productsData.filter(p => p.stock === 0).slice(0, 3).map(product => (
                          <HStack key={product.id} space="md" alignItems="center">
                            <Box
                              width={32}
                              height={32}
                              borderRadius={6}
                              overflow="hidden"
                            >
                              <Image
                                source={{ uri: product.image }}
                                alt={product.name}
                                width={32}
                                height={32}
                                resizeMode="cover"
                              />
                            </Box>
                            <VStack flex={1}>
                              <Text size="sm" fontWeight="$medium">{product.name}</Text>
                              <Text size="xs" color="$red600">Stock: 0 unidades</Text>
                            </VStack>
                          </HStack>
                        ))}
                        {productsData.filter(p => p.stock === 0).length > 3 && (
                          <Text size="xs" color="$red600" textAlign="center">
                            +{productsData.filter(p => p.stock === 0).length - 3} más agotados
                          </Text>
                        )}
                      </VStack>
                    </VStack>
                  </Card>
                )}

                {/* Productos mejor surtidos */}
                <Card bg="$emerald50">
                  <VStack space="sm" p="$4">
                    <Text fontWeight="$bold" color="$emerald700">📈 Mejor Stock</Text>
                    <VStack space="sm">
                      {productsData
                        .filter(p => p.stock > 20)
                        .slice(0, 3)
                        .map(product => (
                          <HStack key={product.id} space="md" alignItems="center">
                            <Box
                              width={32}
                              height={32}
                              borderRadius={6}
                              overflow="hidden"
                            >
                              <Image
                                source={{ uri: product.image }}
                                alt={product.name}
                                width={32}
                                height={32}
                                resizeMode="cover"
                              />
                            </Box>
                            <VStack flex={1}>
                              <Text size="sm" fontWeight="$medium">{product.name}</Text>
                              <Text size="xs" color="$emerald600">{product.stock} unidades</Text>
                            </VStack>
                            <Badge size="sm" variant="solid" bg="$emerald500">
                              <BadgeText>Alto</BadgeText>
                            </Badge>
                          </HStack>
                        ))}
                    </VStack>
                  </VStack>
                </Card>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                variant="outline"
                action="secondary"
                width="$full"
                onPress={() => setShowStockModal(false)}
              >
                <ButtonText>Cerrar</ButtonText>
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Box height="$10" />
      </Box>
    </ScrollView>
  );
}