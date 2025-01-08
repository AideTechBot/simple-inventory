# simple-inventory

This is a simple self-hosted inventory system.

> :warning: **DO NOT EXPECT THIS SOFTWARE TO BE SAFE**: There are SQL injections galore, this is meant for internal network usage only!

# How to install and run

To install bun go [look it up](https://bun.sh/docs/installation#installing).

To install dependencies:

```bash
bun install
```

To run:

```bash
bun start
```

# Backup

To backup the database, just copy `inventory_database.db` anywhere.

# Files you don't have to worry about

- `tsconfig.json`
- `bun.lockb`
- `.gitignore`
- `node_modules/`
