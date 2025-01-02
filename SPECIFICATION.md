# Specification

This document is to outline some initial specifications of what this software should do

# Should Have

- a workflow to scan items

  - (if doesnt exist) enter NAME, DESC, SIZE, EXP DATE and add an entry
  - (if it does exist) add an entry
  - remove an entry

- a workflow to view all items (including search by NAME, DESC, SIZE, EXP DATE)

# Could Have

- Product categorizations

# Design

## Tables

The database tables to be made in sqlite

### Products

This table represents each seen product.

| productID (primary unique) | upc (secondary) | custom (boolean) | name (string) | description (string) | size (string) |
| -------------------------- | --------------- | ---------------- | ------------- | -------------------- | ------------- |
| 12345                      | 123456789       | false            | ragu tomato   | tomato sauce         | 16 oz         |
| ...                        | ...             | ...              | ...           | ...                  | ...           |

The custom field allows us to generate upcs without falling upon one already in use. To difference them, they will be printed using QR codes.

### Inventory

This is the table for each individual inventory entry, this allows us to count them and stuff.

| inventoryId (primary unique) | productId (secondary ref) | added (date) | expiration (date) | removed (date) |
| ---------------------------- | ------------------------- | ------------ | ----------------- | -------------- |
| 12345                        | 12345                     | 01/01/1999   | 01/03/1999        | 01/12/2023     |
| ...                          | ...                       | ...          | ...               | ...            |

**Update:** There should also be a tertiary key that is an ID that points to a location, the location table should look like:

| locationId (primary unique) | name (string) |
| --------------------------- | ------------- |
| ...                         | ...           |
