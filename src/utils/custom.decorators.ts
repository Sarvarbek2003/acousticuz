import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsObjectWithStringValues(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isObjectWithStringValues',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Agar value null yoki undefined bo'lsa, u holda to'g'ri
          if (value == null) {
            return true;
          }

          // Value obyekti ekanligini tekshiramiz
          if (typeof value !== 'object' || Array.isArray(value)) {
            return false;
          }

          // Obyektdagi har bir key va value string ekanligini tekshiramiz
          for (const key in value) {
            if (value.hasOwnProperty(key)) {
              if (typeof value[key] !== 'string') {
                return false;  // Agar biron-bir qiymat string bo'lmasa, false qaytaradi
              }
            }
          }

          return true;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be an object with string values`;
        },
      },
    });
  };
}