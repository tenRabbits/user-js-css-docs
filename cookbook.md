# Cookbook

This page collects frequently requested features that can't make it to the UI for conceptual reasons.

Snippet functionality will be implemented based on this page.

## ES6 Modules

You cannot import or export ES6 modules between rules, but you can use modules from the Internet, for example in this way:

```js
;(async () => {
  const { module } = await import("https://...")
  // your code is here
})()
```

## Loading modules from version 2.x

In version 3.x+, modules are cached after the first load and are only updated manually from the module edit window. They are no longer loaded from the site DOM tree, but are embedded directly into the script.

If you need to load from the DOM or an external script requires frequent updates, it is better not to use the modules functionality in the extension, but to load it directly via JS:

```js
Promise.allSettled([
  loadScript("https://...js"),
  loadScript("https://...js"),
]).then(() => {
  // your code is here
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

## URL matches from version 2.x

If the old URL matching mode is required, the following script can be used for JS by pre-assigning a URL rule (`*://*/*`):

```js
// Your old style patterns
const oldStylePatterns = ["site.com", "localhost", "!192.168.*.1"]

if (oldStylePatterns.some((p) => isUrlMatch(location.href, p))) {
  // Your code here
}

function isUrlMatch(url, pattern) {
  const regStr = pattern.replace(/\W/g, "\\$&").replace(/\\\*/g, ".*")
  const reg = new RegExp(regStr, "i")
  return reg.test(url)
}
```

::: tip Attention
For CSS this option is not suitable, the solution is in development
:::
