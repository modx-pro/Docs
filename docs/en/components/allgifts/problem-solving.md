# Problem solving

## Out of memory

If PHP logs show `Allowed memory size of … bytes exhausted`, increase `memory_limit` in PHP config.

- Recommended: `512M`
- Minimum: `256M` (may not be enough)

## 502 error

Although the component has a Manager interface, run the import from the terminal only.

Otherwise the script may run too long for one request and the server may return 502.
