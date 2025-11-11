import React from 'react';
import { VStack } from '@gluestack-ui/themed';
import CustomCard from './CustomCard';
import { LucideIcon } from 'lucide-react-native';

interface FormSectionProps {
  title: string;
  description: string;
  children: React.ReactNode;
  icon?: LucideIcon;
}

export default function FormSection({ title, description, children, icon }: FormSectionProps) {
  return (
    <CustomCard title={title} description={description} icon={icon}>
      <VStack space="md" mt="$2">
        {children}
      </VStack>
    </CustomCard>
  );
}