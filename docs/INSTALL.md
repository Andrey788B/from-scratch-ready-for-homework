## Первичная установка приложения

### 1. Создадим проект
```
mkdir from-scratch
cd from-scratch
npm init
```

### 2. Установим Typescript
```
npm i --save-dev typescript
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "allowJs": true,
    "module": "commonjs",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "lib": ["dom", "esnext"],
    "strict": true,
    "sourceMap": true,
    "target": "esnext"
  },
  "include": ["src"],
  "exclude": ["node_modules", "coverage"]
}
```

### 3. Установим webpack и плагины
```
npm i --save-dev webpack webpack-cli webpack-dev-server css-loader html-webpack-plugin mini-css-extract-plugin ts-loader
```

#### webpack.config.js
```js
const prod = process.env.NODE_ENV === 'production';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: prod ? 'production' : 'development',
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.ts', '.tsx', '.js', '.json'],
        },
        use: 'ts-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  devtool: prod ? undefined : 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    hot: true ,
    liveReload:false
  }
};
```

### 4. Добавим скрипты запуска
```json
"scripts": {
    "start": "webpack serve --port 3000",
    "build": "NODE_ENV=production webpack"
  }
```

### 5. Создадим index.html и установим React
```
npm i react react-dom
npm i --save-dev @types/react @types/react-dom
```

#### index.tsx
```tsx
import { createRoot } from 'react-dom/client'
import { App } from './App';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(<App />);
```

### 6. Запустим приложение
npm start


## Установка пакетов тестирования
```
npm install --save-dev @testing-library/react @testing-library/jest-dom
npm install --save-dev jest jest-environment-jsdom ts-jest
npm install --save-dev eslint-plugin-jest
```

### 1. Создадим конфиг jest.config.js
```js
module.exports = {
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  testEnvironment: "jsdom",
  transformIgnorePatterns: ["node_modules"],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less)$': '<rootDir>/spec/__mocks__/styleMock.js',
  }
};
```

#### jest.setup.js
```js
import '@testing-library/jest-dom';
```

#### spec/__mocks__/styleMock.js
```js
module.exports = {};
```

### 2. Добавим ESLint
```
npm install --save-dev eslint-plugin-jest
```

#### eslintrc.json
```json
{
    "env": {
        "browser": true,
        "es2021": true,
        "jest/globals": true
    },
    "extends": [
        "plugin:react/recommended",
        "plugin:jest/recommended"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": ["react", "jest"],
    "rules": {
        "no-underscore-dangle": 0,
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "always",
                "jsx": "always"
            }
        ]
    }
}
```

### 3. Добавим команды для запуска тестов
```json
"scripts": {
    ...,
    "test": "jest"
}
```

