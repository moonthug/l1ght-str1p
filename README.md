# L1ght-Str1p

---

[![Codeship Status for moonthug/l1ght-str1p](https://app.codeship.com/projects/588bf1d5-3bcd-4726-b006-50f243e2cf91/status?branch=master)](https://app.codeship.com/projects/423215)

The light strip in my lounge.

## Features
- Runs on a Raspberry Pi Zero
- CI/CD integration
- Plugin interface
- IOT (Homekit) compatibility

### Debug Mode

Add the following environment variable(s) to enable debug mode. It is already included in the `start:dev` npm script

```dotenv
DEBUG=1

# Optional
FORCE_COLOR=3 # Enable colour regardless of the terminal (see https://github.com/chalk/chalk#chalksupportscolor)
```
![Debug Mode](./docs/debug.png)
