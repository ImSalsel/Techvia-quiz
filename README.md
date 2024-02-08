# config
 
to src add config.ts file that looks like this:

export default class Config {

    static apiUrl = import.meta.env.VITE_API_URL;
    static apiKey = 'YOUR_API_KEY'
} 

Api key can be obtained on https://quizapi.io/

# default

## Project setup

```
# yarn
yarn

# npm
npm install

# pnpm
pnpm install
```

### Compiles and hot-reloads for development

```
# yarn
yarn dev

# npm
npm run dev

# pnpm
pnpm dev
```

### Compiles and minifies for production

```
# yarn
yarn build

# npm
npm run build

# pnpm
pnpm build
```

### Customize configuration

See [Configuration Reference](https://vitejs.dev/config/).
