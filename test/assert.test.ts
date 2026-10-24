import { Assert } from '../src';

describe('Assert.nonBlankString', () => {
  it.each([
    ['plain', 'ok'],
    ['with surrounding spaces', '  ok  '],
  ])('accepts %s', (_label, value) => {
    expect(() =>
      Assert.nonBlankString(value, { propPath: 'props.name' }),
    ).not.toThrow();
  });

  it.each([
    ['empty', ''],
    ['whitespace-only', '   '],
    ['tabs and newlines', '\t\n'],
  ])('rejects %s', (_label, value) => {
    expect(() =>
      Assert.nonBlankString(value, { propPath: 'props.name' }),
    ).toThrow('props.name must be a non-blank string.');
  });
});

describe('Assert.nonEmptyStringList', () => {
  it.each([
    ['single value', ['ok']],
    ['multiple values', ['a', 'b']],
    ['value with surrounding spaces', ['  ok  ']],
  ])('accepts %s', (_label, values) => {
    expect(() =>
      Assert.nonEmptyStringList(values, { propPath: 'props.names' }),
    ).not.toThrow();
  });

  it('rejects an empty list', () => {
    expect(() =>
      Assert.nonEmptyStringList([], { propPath: 'props.names' }),
    ).toThrow('props.names must contain at least one value.');
  });

  it.each([
    ['empty element', ['ok', '']],
    ['whitespace-only element', ['  ']],
    ['blank among values', ['a', '\t', 'b']],
  ])('rejects %s', (_label, values) => {
    expect(() =>
      Assert.nonEmptyStringList(values, { propPath: 'props.names' }),
    ).toThrow('props.names must not contain blank strings.');
  });
});
