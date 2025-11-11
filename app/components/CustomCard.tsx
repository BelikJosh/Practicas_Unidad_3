import React from 'react';
import { Box, Text, VStack, HStack } from '@gluestack-ui/themed';
import { LucideIcon } from 'lucide-react-native';

interface CustomCardProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export default function CustomCard({ 
  title, 
  description, 
  icon: Icon, 
  children,
  variant = 'primary' 
}: CustomCardProps) {
  const bgColor = variant === 'primary' ? '$primary600' : '$white';
  const textColor = variant === 'primary' ? '$white' : '$textDark800';
  const descColor = variant === 'primary' ? '$primary100' : '$textDark600';

  return (
    <Box 
      bg={bgColor}
      p="$6"
      borderRadius="$2xl"
      borderWidth={variant === 'primary' ? 0 : 1}
      borderColor="$borderLight200"
      shadowColor="$backgroundLight800"
      shadowOffset={{ width: 0, height: 4 }}
      shadowOpacity={0.1}
      shadowRadius={10}
      elevation={5}
      mb="$5"
    >
      <VStack space="md">
        <HStack alignItems="center" space="md">
          {Icon && (
            <Box 
              p="$2" 
              borderRadius="$full" 
              bg={variant === 'primary' ? '$primary500' : '$primary100'}
            >
              <Icon 
                size={20} 
                color={variant === 'primary' ? '$white' : '$primary600'} 
              />
            </Box>
          )}
          <VStack flex={1}>
            <Text size="xl" fontWeight="$bold" color={textColor}>
              {title}
            </Text>
            <Text size="sm" color={descColor} mt="$1">
              {description}
            </Text>
          </VStack>
        </HStack>
        {children && (
          <Box mt="$3">
            {children}
          </Box>
        )}
      </VStack>
    </Box>
  );
}