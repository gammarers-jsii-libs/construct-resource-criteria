# AWS CDK Construct Resource Criteria

[![npm version](https://img.shields.io/npm/v/aws-cdk-construct-resource-criteria?style=flat-square)](https://www.npmjs.com/package/aws-cdk-construct-resource-criteria)
[![license](https://img.shields.io/npm/l/aws-cdk-construct-resource-criteria?style=flat-square)](https://www.npmjs.com/package/aws-cdk-construct-resource-criteria)
[![Node.js](https://img.shields.io/node/v/aws-cdk-construct-resource-criteria?style=flat-square)](https://www.npmjs.com/package/aws-cdk-construct-resource-criteria)
[![build](https://img.shields.io/github/actions/workflow/status/higa/aws-cdk-construct-resource-criteria/build.yml?label=build&style=flat-square)](https://github.com/higa/aws-cdk-construct-resource-criteria/actions/workflows/build.yml)

Assertion helpers for CDK construct resource criteria. They reject blank strings and empty or blank string lists, and include the property path in error messages.

## Features

- Reject empty or whitespace-only strings
- Reject empty string lists and lists that contain blank elements
- Include a property path in thrown `Error` messages

## Installation

### npm

```bash
npm install aws-cdk-construct-resource-criteria
```

### yarn

```bash
yarn add aws-cdk-construct-resource-criteria
```

### pnpm

```bash
pnpm add aws-cdk-construct-resource-criteria
```

## Usage

```typescript
import { Assert } from 'aws-cdk-construct-resource-criteria';

Assert.nonBlankString(name, { propPath: 'props.name' });
Assert.nonEmptyStringList(names, { propPath: 'props.names' });
```

## Options

### `AssertPropOptions`

| Option | Type | Description |
| --- | --- | --- |
| `propPath` | `string` | Property path included in the error message (for example, `props.name`) |

## API

See [API.md](./API.md).

## Requirements

- Node.js `>= 20.0.0`

## License

This project is licensed under the Apache-2.0 License.
