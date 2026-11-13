# API Reference <a name="API Reference" id="api-reference"></a>


## Structs <a name="Structs" id="Structs"></a>

### ConstructResourceCriteriaAssertOptions <a name="ConstructResourceCriteriaAssertOptions" id="construct-resource-criteria.ConstructResourceCriteriaAssertOptions"></a>

Options for {@link ConstructResourceCriteria} assertion helpers.

#### Initializer <a name="Initializer" id="construct-resource-criteria.ConstructResourceCriteriaAssertOptions.Initializer"></a>

```typescript
import { ConstructResourceCriteriaAssertOptions } from 'construct-resource-criteria'

const constructResourceCriteriaAssertOptions: ConstructResourceCriteriaAssertOptions = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#construct-resource-criteria.ConstructResourceCriteriaAssertOptions.property.propPath">propPath</a></code> | <code>string</code> | Property path included in the error message. |

---

##### `propPath`<sup>Optional</sup> <a name="propPath" id="construct-resource-criteria.ConstructResourceCriteriaAssertOptions.property.propPath"></a>

```typescript
public readonly propPath: string;
```

- *Type:* string
- *Default:* tagCriteria

Property path included in the error message.

A single object uses a path such as `tagCriteria`.
A list uses a path such as `props.tags` (indexed as `props.tags[0]`).

---

### ConstructResourceTagCriteria <a name="ConstructResourceTagCriteria" id="construct-resource-criteria.ConstructResourceTagCriteria"></a>

Tag key/value criteria used to match resources.

#### Initializer <a name="Initializer" id="construct-resource-criteria.ConstructResourceTagCriteria.Initializer"></a>

```typescript
import { ConstructResourceTagCriteria } from 'construct-resource-criteria'

const constructResourceTagCriteria: ConstructResourceTagCriteria = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#construct-resource-criteria.ConstructResourceTagCriteria.property.tagKey">tagKey</a></code> | <code>string</code> | Tag key to match (for example, `Environment` or `AutoStartPrevent`). |
| <code><a href="#construct-resource-criteria.ConstructResourceTagCriteria.property.tagValues">tagValues</a></code> | <code>string[]</code> | Allowed tag values (for example, `["production"]` or `["YES"]`). |

---

##### `tagKey`<sup>Required</sup> <a name="tagKey" id="construct-resource-criteria.ConstructResourceTagCriteria.property.tagKey"></a>

```typescript
public readonly tagKey: string;
```

- *Type:* string

Tag key to match (for example, `Environment` or `AutoStartPrevent`).

---

##### `tagValues`<sup>Required</sup> <a name="tagValues" id="construct-resource-criteria.ConstructResourceTagCriteria.property.tagValues"></a>

```typescript
public readonly tagValues: string[];
```

- *Type:* string[]

Allowed tag values (for example, `["production"]` or `["YES"]`).

At least one value is required.

---

## Classes <a name="Classes" id="Classes"></a>

### ConstructResourceCriteria <a name="ConstructResourceCriteria" id="construct-resource-criteria.ConstructResourceCriteria"></a>

Helpers for construct resource criteria.

#### Initializers <a name="Initializers" id="construct-resource-criteria.ConstructResourceCriteria.Initializer"></a>

```typescript
import { ConstructResourceCriteria } from 'construct-resource-criteria'

new ConstructResourceCriteria()
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |

---


#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#construct-resource-criteria.ConstructResourceCriteria.assertTagCriteria">assertTagCriteria</a></code> | Throws if `criteria` has a blank tag key or an empty/blank tag value list. |
| <code><a href="#construct-resource-criteria.ConstructResourceCriteria.resolveTagCriteria">resolveTagCriteria</a></code> | Validates a tag criteria list and returns a copy. |

---

##### `assertTagCriteria` <a name="assertTagCriteria" id="construct-resource-criteria.ConstructResourceCriteria.assertTagCriteria"></a>

```typescript
import { ConstructResourceCriteria } from 'construct-resource-criteria'

ConstructResourceCriteria.assertTagCriteria(criteria: ConstructResourceTagCriteria, options?: ConstructResourceCriteriaAssertOptions)
```

Throws if `criteria` has a blank tag key or an empty/blank tag value list.

###### `criteria`<sup>Required</sup> <a name="criteria" id="construct-resource-criteria.ConstructResourceCriteria.assertTagCriteria.parameter.criteria"></a>

- *Type:* <a href="#construct-resource-criteria.ConstructResourceTagCriteria">ConstructResourceTagCriteria</a>

Tag criteria to validate.

---

###### `options`<sup>Optional</sup> <a name="options" id="construct-resource-criteria.ConstructResourceCriteria.assertTagCriteria.parameter.options"></a>

- *Type:* <a href="#construct-resource-criteria.ConstructResourceCriteriaAssertOptions">ConstructResourceCriteriaAssertOptions</a>

Assertion options.

---

##### `resolveTagCriteria` <a name="resolveTagCriteria" id="construct-resource-criteria.ConstructResourceCriteria.resolveTagCriteria"></a>

```typescript
import { ConstructResourceCriteria } from 'construct-resource-criteria'

ConstructResourceCriteria.resolveTagCriteria(criteria: ConstructResourceTagCriteria[], options?: ConstructResourceCriteriaAssertOptions)
```

Validates a tag criteria list and returns a copy.

Rejects an empty list. Each entry is validated with
{@link ConstructResourceCriteria.assertTagCriteria} before `tagKey` uniqueness
is checked. `tagKey` values must be unique by exact match, without trimming.
The result is a new array of new objects, each with a new `tagValues` array.
The input list is left unchanged.

###### `criteria`<sup>Required</sup> <a name="criteria" id="construct-resource-criteria.ConstructResourceCriteria.resolveTagCriteria.parameter.criteria"></a>

- *Type:* <a href="#construct-resource-criteria.ConstructResourceTagCriteria">ConstructResourceTagCriteria</a>[]

Tag criteria list to validate.

---

###### `options`<sup>Optional</sup> <a name="options" id="construct-resource-criteria.ConstructResourceCriteria.resolveTagCriteria.parameter.options"></a>

- *Type:* <a href="#construct-resource-criteria.ConstructResourceCriteriaAssertOptions">ConstructResourceCriteriaAssertOptions</a>

Assertion options.

`propPath` defaults to `tagCriteria`.

---




