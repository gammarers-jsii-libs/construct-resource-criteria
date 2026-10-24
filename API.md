# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### AssertPropOptions <a name="AssertPropOptions" id="construct-resource-criteria.AssertPropOptions"></a>

Options for prop-path assertion helpers.

#### Initializer <a name="Initializer" id="construct-resource-criteria.AssertPropOptions.Initializer"></a>

```typescript
import { AssertPropOptions } from 'construct-resource-criteria'

const assertPropOptions: AssertPropOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#construct-resource-criteria.AssertPropOptions.property.propPath">propPath</a></code> | <code>string</code> | Property path included in the error message (for example, `props.name`). |

---

##### `propPath`<sup>Required</sup> <a name="propPath" id="construct-resource-criteria.AssertPropOptions.property.propPath"></a>

```typescript
public readonly propPath: string;
```

- *Type:* string

Property path included in the error message (for example, `props.name`).

---

## Classes <a name="Classes" id="Classes"></a>

### Assert <a name="Assert" id="construct-resource-criteria.Assert"></a>

Assertion helpers that reject blank strings and empty or blank string lists.

#### Initializers <a name="Initializers" id="construct-resource-criteria.Assert.Initializer"></a>

```typescript
import { Assert } from 'construct-resource-criteria'

new Assert()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#construct-resource-criteria.Assert.nonBlankString">nonBlankString</a></code> | Throws if `value` is empty or whitespace-only. |
| <code><a href="#construct-resource-criteria.Assert.nonEmptyStringList">nonEmptyStringList</a></code> | Throws if `values` is empty or any element is blank. |

---

##### `nonBlankString` <a name="nonBlankString" id="construct-resource-criteria.Assert.nonBlankString"></a>

```typescript
import { Assert } from 'construct-resource-criteria'

Assert.nonBlankString(value: string, options: AssertPropOptions)
```

Throws if `value` is empty or whitespace-only.

###### `value`<sup>Required</sup> <a name="value" id="construct-resource-criteria.Assert.nonBlankString.parameter.value"></a>

- *Type:* string

Candidate string.

---

###### `options`<sup>Required</sup> <a name="options" id="construct-resource-criteria.Assert.nonBlankString.parameter.options"></a>

- *Type:* <a href="#construct-resource-criteria.AssertPropOptions">AssertPropOptions</a>

{@link AssertPropOptions} for the error message path.

---

##### `nonEmptyStringList` <a name="nonEmptyStringList" id="construct-resource-criteria.Assert.nonEmptyStringList"></a>

```typescript
import { Assert } from 'construct-resource-criteria'

Assert.nonEmptyStringList(values: string[], options: AssertPropOptions)
```

Throws if `values` is empty or any element is blank.

###### `values`<sup>Required</sup> <a name="values" id="construct-resource-criteria.Assert.nonEmptyStringList.parameter.values"></a>

- *Type:* string[]

Candidate string list.

---

###### `options`<sup>Required</sup> <a name="options" id="construct-resource-criteria.Assert.nonEmptyStringList.parameter.options"></a>

- *Type:* <a href="#construct-resource-criteria.AssertPropOptions">AssertPropOptions</a>

{@link AssertPropOptions} for the error message path.

---




