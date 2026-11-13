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
   * Property path included in the error message.
   *
   * A single object uses a path such as `tagCriteria`.
   * A list uses a path such as `props.tags` (indexed as `props.tags[0]`).
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

  /**
   * Validates a tag criteria list and returns a copy.
   *
   * Rejects an empty list. Each entry is validated with
   * {@link ConstructResourceCriteria.assertTagCriteria} before `tagKey` uniqueness
   * is checked. `tagKey` values must be unique by exact match, without trimming.
   * The result is a new array of new objects, each with a new `tagValues` array.
   * The input list is left unchanged.
   *
   * @param criteria - Tag criteria list to validate.
   * @param options - Assertion options. `propPath` defaults to `tagCriteria`.
   * @returns A copy of the validated criteria.
   * @throws Error when the list is empty, an entry is invalid, or a `tagKey` is duplicated.
   */
  public static resolveTagCriteria(
    criteria: ConstructResourceTagCriteria[],
    options: ConstructResourceCriteriaAssertOptions = {},
  ): ConstructResourceTagCriteria[] {
    const propPath = options.propPath ?? 'tagCriteria';

    // An empty list is a list error. Per-entry checks never run.
    if (criteria.length === 0) {
      throw new Error(`${propPath} must contain at least one value.`);
    }

    const seenTagKeys = new Set<string>();
    const normalized: ConstructResourceTagCriteria[] = [];

    for (const [index, entry] of criteria.entries()) {
      // Field errors win over a duplicate key on the same entry.
      ConstructResourceCriteria.assertTagCriteria(entry, {
        propPath: `${propPath}[${index}]`,
      });

      // Exact match, including surrounding spaces, so distinct keys stay distinct.
      if (seenTagKeys.has(entry.tagKey)) {
        throw new Error(`${propPath} contains duplicate tagKey: ${entry.tagKey}`);
      }

      seenTagKeys.add(entry.tagKey);
      normalized.push({
        tagKey: entry.tagKey,
        tagValues: [...entry.tagValues],
      });
    }

    return normalized;
  }
}
