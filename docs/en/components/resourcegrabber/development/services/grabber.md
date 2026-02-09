# Grabber

Data parsing is handled by the **rgContentGrabber** class, which implements **rgGrabberInterface**. You can use your own class and set it in the **grabber** snippet.

Required methods of `rgGrabberInterface`:

- `init` — Initializes the class.
- `client` — Returns an instance of the handler class.
- `run` — Runs processing and returns data.
