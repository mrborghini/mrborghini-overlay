# mrborghini's twitch overlay

## How to setup?

Install NodeJS with NPM and cd into the root of this repository

### Development


```bash
cp .env.example .env
```

```bash
npm install
```

```bash
npm run dev
```

### Production

```bash
cp .env.example .env.production
```

```bash
npm install
```

```bash
npm run build
```

Now you should have a dist folder with your overlay.

### Docker

```bash
cp .env.example .env.production
```

```bash
docker compose up
```

Make sure your .env.production matches your info that you need or else it's not gonna work.