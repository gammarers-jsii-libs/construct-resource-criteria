import {
  ConstructResourceCriteria,
  ConstructResourceTagCriteria,
} from '../src';

const validCriteria: ConstructResourceTagCriteria = {
  tagKey: 'Environment',
  tagValues: ['production'],
};

describe('ConstructResourceCriteria.assertTagCriteria', () => {
  it('accepts valid criteria with the default propPath', () => {
    expect(() =>
      ConstructResourceCriteria.assertTagCriteria(validCriteria),
    ).not.toThrow();
  });

  it('accepts valid criteria with a custom propPath', () => {
    expect(() =>
      ConstructResourceCriteria.assertTagCriteria(validCriteria, {
        propPath: 'props.tagCriteria',
      }),
    ).not.toThrow();
  });

  it.each([
    ['empty', ''],
    ['whitespace-only', '   '],
  ])('rejects a %s tagKey', (_label, tagKey) => {
    expect(() =>
      ConstructResourceCriteria.assertTagCriteria(
        { tagKey, tagValues: ['YES'] },
        { propPath: 'props.tagCriteria' },
      ),
    ).toThrow('props.tagCriteria.tagKey must be a non-blank string.');
  });

  it('rejects an empty tagValues list', () => {
    expect(() =>
      ConstructResourceCriteria.assertTagCriteria(
        { tagKey: 'Environment', tagValues: [] },
        { propPath: 'props.tagCriteria' },
      ),
    ).toThrow('props.tagCriteria.tagValues must contain at least one value.');
  });

  it.each([
    ['empty element', ['ok', '']],
    ['whitespace-only element', ['  ']],
  ])('rejects tagValues with a %s', (_label, tagValues) => {
    expect(() =>
      ConstructResourceCriteria.assertTagCriteria(
        { tagKey: 'Environment', tagValues },
        { propPath: 'props.tagCriteria' },
      ),
    ).toThrow('props.tagCriteria.tagValues must not contain blank strings.');
  });

  it('uses tagCriteria as the default propPath in errors', () => {
    expect(() =>
      ConstructResourceCriteria.assertTagCriteria({
        tagKey: '',
        tagValues: ['YES'],
      }),
    ).toThrow('tagCriteria.tagKey must be a non-blank string.');
  });
});
