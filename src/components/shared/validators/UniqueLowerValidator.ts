import { getRepository, Not, Raw, Repository } from 'typeorm';

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  ValidationOptions,
  registerDecorator,
} from 'class-validator';

export type ScopedValidationOptions = ValidationOptions & { scope?: string[] };

@ValidatorConstraint({ async: true })
export class UniqueLowerValidator implements ValidatorConstraintInterface {
  async validate(value: any, args: ValidationArguments) {
    const repository = getRepository<any>(args.targetName);
    if (args.value == null) return true;
    const entity = await repository.findOne({
      where: this.buildConditions(value, args, repository),
    });

    return !entity;
  }
  private buildConditions(value: any, args: ValidationArguments, repository: Repository<{}>) {
    return {
      ...this.buildScopeConditions(args.object, args.constraints),
      ...this.buildPrimaryColumnConditions(args.object, repository),
      [args.property]: Raw((alias) => `LOWER(${alias}) = :prop`, {
        prop: value.toLowerCase(),
      }),
    };
  }

  private buildScopeConditions(object: any, constraints?: string[]) {
    if (!constraints || !constraints.length) {
      return {};
    }
    return constraints.reduce(
      (acc, key) => ({
        ...acc,
        [key]: object[key],
      }),
      {},
    );
  }

  private buildPrimaryColumnConditions(object: any, repository: Repository<{}>) {
    const primaryColumnNames = repository.metadata.primaryColumns.map(
      ({ propertyName }) => propertyName,
    );

    if (!primaryColumnNames.length) {
      return {};
    }
    return primaryColumnNames.reduce((acc, name) => {
      const pkValue = object[name];
      return pkValue ? { ...acc, [name]: Not(pkValue) } : acc;
    }, {});
  }
}

/**
 * Checks if a lower value is uniq across all records in a database or inside a scope.
 *
 * @param validationOptions accept `scope` options and all `class-validator` options
 */
export const IsUniqLower = (validationOptions?: ScopedValidationOptions) => {
  return (object: object, propertyName: string) => {
    const scope = validationOptions && validationOptions.scope;
    const opts: ScopedValidationOptions = {
      message: scope
        ? `$target with value $value already exists in scope: ${scope.join(', ')}`
        : `$target with value $value already exists`,
      ...validationOptions,
    };
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: opts,
      constraints: scope || [],
      validator: UniqueLowerValidator,
    });
  };
};
