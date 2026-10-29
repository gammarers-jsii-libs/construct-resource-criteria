# Construct Resource Criteria

[![npm version](https://img.shields.io/npm/v/construct-resource-criteria?style=flat-square)](https://www.npmjs.com/package/construct-resource-criteria)
[![license](https://img.shields.io/npm/l/construct-resource-criteria?style=flat-square)](https://www.npmjs.com/package/construct-resource-criteria)
[![Node.js](https://img.shields.io/node/v/construct-resource-criteria?style=flat-square)](https://www.npmjs.com/package/construct-resource-criteria)
[![build](https://img.shields.io/github/actions/workflow/status/gammarers-jsii-libs/aws-cdk-construct-resource-criteria/build.yml?label=build&style=flat-square)](https://github.com/gammarers-jsii-libs/aws-cdk-construct-resource-criteria/actions/workflows/build.yml)

Helpers for CDK construct resource criteria. Validate tag key/value criteria and reject blank strings in property paths.

## Features

- Validate `ConstructResourceTagCriteria` tag key and values
- Reject empty or whitespace-only strings and string lists
- Include a property path in thrown `Error` messages

## Installation

### npm

```bash
npm install construct-resource-criteria
```

### yarn

```bash
yarn add construct-resource-criteria
```

### pnpm

```bash
pnpm add construct-resource-criteria
```

## Usage

```typescript
import {
  ConstructResourceCriteria,
  ConstructResourceTagCriteria,
} from 'construct-resource-criteria';

const criteria: ConstructResourceTagCriteria = {
  tagKey: 'Environment',
  tagValues: ['production'],
};

ConstructResourceCriteria.assertTagCriteria(criteria);
ConstructResourceCriteria.assertTagCriteria(criteria, {
  propPath: 'props.tagCriteria',
});
```

## Options

### `ConstructResourceCriteriaAssertOptions`

| Option | Type | Description |
| --- | --- | --- |
| `propPath` | `string` | Property path included in the error message (default: `tagCriteria`) |

## API

See [API.md](./API.md).

## Requirements

- Node.js `>= 20.0.0`
- `aws-cdk-lib` `^2`

## License

This project is licensed under the Apache-2.0 License.
