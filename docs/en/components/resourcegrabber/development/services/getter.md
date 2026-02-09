# Getter

Data retrieval is handled by the **rgContentGetter** class, which implements **rgGetterInterface**. You can use your own class and set it in the **getter** snippet.

Required methods of `rgGetterInterface`:

- `init` — Initializes the class.
- `client` — Returns an instance of the handler class.
- `run` — Runs processing and returns data.
