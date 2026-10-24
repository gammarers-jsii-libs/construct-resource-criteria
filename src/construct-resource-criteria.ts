import { CriteriaAssert } from './criteria-assert';

/**
 * Tag key/value criteria used to match resources.
 */
export interface ConstructResourceTagCriteria {
  /**
   * Tag key to match (for example, `Environment` or `AutoStartPrevent`).
   */
  readonly tagKey: string;

  /**
   * Allowed tag values (for example, `["production"]` or `["YES"]`).
   * At least one value is required.
   */
  readonly tagValues: string[];
}

/**
 * Options for {@link ConstructResourceCriteria} assertion helpers.
 */
export interface ConstructResourceCriteriaAssertOptions {
  /**
   * Property path included in the error message (for example, `tagCriteria`).
   *
   * @default tagCriteria
   */
  readonly propPath?: string;
}

/**
 * Helpers for construct resource criteria.
 */
export class ConstructResourceCriteria {
  /**
   * Throws if `criteria` has a blank tag key or an empty/blank tag value list.
   *
   * @param criteria - Tag criteria to validate.
   * @param options - Assertion options.
   * @throws Error when `criteria` is invalid.
   */
  public static assertTagCriteria(
    criteria: ConstructResourceTagCriteria,
    options: ConstructResourceCriteriaAssertOptions = {},
  ): void {
    const propPath = options.propPath ?? 'tagCriteria';

    CriteriaAssert.nonBlankString(criteria.tagKey, {
      propPath: `${propPath}.tagKey`,
    });
    CriteriaAssert.nonEmptyStringList(criteria.tagValues, {
      propPath: `${propPath}.tagValues`,
    });
  }
}
