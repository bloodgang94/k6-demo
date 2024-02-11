# k6 Нагрузочное тестирование

Репозиторий представляет из себя шаблон нагрузочного тестирования

## Быстрый старт

Установите K6 [k6 performance test tool](https://docs.k6.io/docs/installation).

Склонируйте репозиторий

Установите зависимости

`npm i`

Запустите тесты в докер командой

`npm run go:k6`

## Запуск с дашбордом графаны

Соберите графану

`npm monitors`

После откройте ссылку **localhost:3000** в браузере и войдите под '**admin**' пароль '**admin**'.

Установите любой понравившийся дашборд [dashboards](https://grafana.com/search/?term=k6&type=dashboard).

Запустите тесты

`npm run go:docker`

### **src**

Исходны код

### **lib** folder

Типы `types` и помошники

#### The types folder

Экспортируемый типы

### **actions** folder

Сценарии взаимодействия с rest api

### **tests** folder

Тесты производительности

## Проверьте ваш код

Используйте:

`npm run check-types`

Чтобы проверить код на безопасность типов и правила, установленные в вашем [файле tsconfig.json](tsconfig.json). Вы также можете запустить это во время работы, используя:

`npm run check-types:watch`.

## Сборка кода

[Babel](https://babeljs.io/) выполняет перенос кода (см. файл [.babelrc](.babelrc) в корневом каталоге), а [Webpack](https://webpack.js. org/) создает его (см. файл [webpack.config.js](webpack.config.js) в корневом каталоге).

## Отладка

Скрипты `k6` легко отлаживать. Подробнее см. в [документации k6](https://docs.k6.io/docs/debugging).
