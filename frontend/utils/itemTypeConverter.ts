import { ProductType } from '@/domain/interfaces/Product.interface';

export function itemTypeConverter(type: ProductType): string {
  switch (type) {
    case 'beer':
      return 'Cerveja';
    case 'sparkling':
      return 'Espumante';
    case 'chopp':
      return 'Chopp';
    case 'wine':
      return 'Vinho';
    case 'whiskey':
      return 'Whiskey';
    default:
      return 'Cerveja';
  }

}