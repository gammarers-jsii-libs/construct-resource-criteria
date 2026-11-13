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

describe('ConstructResourceCriteria.resolveTagCriteria', () => {
  const pipelineOptions = { propPath: 'targetPipeline.tags' };

  it('returns an equivalent copy and leaves the input unchanged', () => {
    const input: ConstructResourceTagCriteria[] = [
      { tagKey: 'Environment', tagValues: ['production', 'staging'] },
      { tagKey: 'Notify', tagValues: ['YES'] },
    ];
    const snapshot: ConstructResourceTagCriteria[] = [
      { tagKey: 'Environment', tagValues: ['production', 'staging'] },
      { tagKey: 'Notify', tagValues: ['YES'] },
    ];

    const result = ConstructResourceCriteria.resolveTagCriteria(input);

    expect(result).toEqual(snapshot);
    expect(result).not.toBe(input);
    expect(result[0]).not.toBe(input[0]);
    expect(result[0].tagValues).not.toBe(input[0].tagValues);
    expect(result[1]).not.toBe(input[1]);
    expect(result[1].tagValues).not.toBe(input[1].tagValues);

    result[0].tagValues.push('mutated');
    expect(input).toEqual(snapshot);
  });

  it('keeps tag keys that differ only by surrounding spaces', () => {
    const input: ConstructResourceTagCriteria[] = [
      { tagKey: 'Environment', tagValues: ['production'] },
      { tagKey: 'Environment ', tagValues: ['staging'] },
    ];

    expect(ConstructResourceCriteria.resolveTagCriteria(input)).toEqual(input);
  });

  it.each([
    ['the default path', {}, 'tagCriteria must contain at least one value.'],
    ['props.tags', { propPath: 'props.tags' }, 'props.tags must contain at least one value.'],
    ['targetPipeline.tags', pipelineOptions, 'targetPipeline.tags must contain at least one value.'],
  ])('rejects an empty list for %s', (_label, options, message) => {
    expect(() => ConstructResourceCriteria.resolveTagCriteria([], options)).toThrow(message);
  });

  it.each([
    [
      'a blank tagKey',
      [{ tagKey: '   ', tagValues: ['YES'] }],
      'targetPipeline.tags[0].tagKey must be a non-blank string.',
    ],
    [
      'an empty tagValues list',
      [{ tagKey: 'Environment', tagValues: [] }],
      'targetPipeline.tags[0].tagValues must contain at least one value.',
    ],
    [
      'a blank tag value',
      [{ tagKey: 'Environment', tagValues: ['production', '  '] }],
      'targetPipeline.tags[0].tagValues must not contain blank strings.',
    ],
    [
      'a blank tagKey on the second entry',
      [
        { tagKey: 'Environment', tagValues: ['production'] },
        { tagKey: ' ', tagValues: ['YES'] },
      ],
      'targetPipeline.tags[1].tagKey must be a non-blank string.',
    ],
  ])('rejects %s', (_label, criteria, message) => {
    expect(() =>
      ConstructResourceCriteria.resolveTagCriteria(criteria, pipelineOptions),
    ).toThrow(message);
  });

  it('rejects an invalid entry before a duplicate tagKey', () => {
    expect(() =>
      ConstructResourceCriteria.resolveTagCriteria([
        { tagKey: 'Notify', tagValues: ['YES'] },
        { tagKey: 'Notify', tagValues: [] },
      ]),
    ).toThrow('tagCriteria[1].tagValues must contain at least one value.');
  });

  it.each([
    ['the default path', {}, 'tagCriteria contains duplicate tagKey: Notify'],
    ['targetPipeline.tags', pipelineOptions, 'targetPipeline.tags contains duplicate tagKey: Notify'],
  ])('rejects a duplicate tagKey for %s', (_label, options, message) => {
    expect(() =>
      ConstructResourceCriteria.resolveTagCriteria(
        [
          { tagKey: 'Notify', tagValues: ['YES'] },
          { tagKey: 'Environment', tagValues: ['production'] },
          { tagKey: 'Notify', tagValues: ['NO'] },
        ],
        options,
      ),
    ).toThrow(message);
  });
});
