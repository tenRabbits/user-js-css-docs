# Книга рецептов

На этой странице собраны часто запрашиваемые функции, которые не могут попасть в UI по концептуальным причинам.

На основе этой страницы будет реализован функционал сниппетов.

## ES6 Модули

Между правилами нельзя импортировать и экспортировать ES6 модули, но можно использовать модули из интернета, например таким образом:

```js
;(async () => {
  const { module } = await import("https://...")
  // Ваш код
})()
```

## Загрузка модулей из версии 2.x

В версии 3.x+ модули кешируются после первой загрузки и обновляются только вручную из окна редактирования модуля. Они больше не загружаются из DOM дерева сайта, а встраиваются напрямую в скрипт.

Если нужна загрузка из DOM или внешний скрипт требует частого обновления, то лучше не использовать функционал модулей в расширении, а загружать его напрямую через JS:

```js
Promise.allSettled([
  loadScript("https://...js"),
  loadScript("https://...js"),
]).then(() => {
  // Ваш код
})

function loadScript(src) {
  return new Promise(function (resolve, reject) {
    const script = document.createElement("script")
    script.src = src
    script.onload = resolve
    script.onerror = reject
    document.head.append(script)
  })
}
```

## URL соответствия из версии 2.x

Если не обойтись без старого режима URL соответствий для JS, можно предварительно назначив правилу общий URL (`*://*/*`) использовать следующий скрипт:

```js
// Ваш набор паттернов
const oldStylePatterns = ["one.ru", "localhost", "!192.168.*.1"]

if (oldStylePatterns.some((p) => isUrlMatch(location.href, p))) {
  // Ваш код
}

function isUrlMatch(url, pattern) {
  const regStr = pattern.replace(/\W/g, "\\$&").replace(/\\\*/g, ".*")
  const reg = new RegExp(regStr, "i")
  return reg.test(url)
}
```

::: tip Внимание
Для CSS такой вариант не подходит, решение в разработке
:::
