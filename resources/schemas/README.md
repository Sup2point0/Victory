# Victory Card Schemas

These schemas define how *Victory!* cards should be represented in JSON for interaction with the [cards database API](../../create/).


<br>


## Casing

Particular casing styles are used for different attributes.

| key nature | case | instance | notes |
| :--------- | :--- | :------- | :---- |
| in-game properties | `Single` | `Power` `Materials` | Capitalised for visual distinction from other JSON Schema keys. |
| enum values | `KEBAB-CAPS` | `CYBERNETIC` `UPGRADE` | Fully capitalised for consistency while retaining visual distinction from other values. |
