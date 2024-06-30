# Documentation

The extension requires a version of **Chrome 120** or higher. Other browsers are not supported at this time.

## Rules

In the context of the extension, a `rule` is JavaScript and/or CSS code that is triggered on web pages that match its URL patterns.

### URL patterns.

- The pattern dares the schema: `<scheme>://<host>/<path>`;
- Can be combined comma-separated: `https://one.com/*, https://two.com/*`;
- An exclusionary pattern is marked with `!`: `!https://excluded.com/*`.

**Changes since version 3.0**

As of version 3.0, the requirements for extension URL patterns have increased, you can read more about them on [Google page](https://developer.chrome.com/docs/extensions/develop/concepts/match-patterns). In brief:

1. The pattern must start strictly with `http|https|*`;
2. Domain and zone must be written without masks: `one.com`, but the subdomain can be `*.one.com`. It is also allowed to specify the entire host with a mask `*`.
3. Regardless of the path, the host is terminated with the separator `/`: `https://one.com/, https://two.com/path*`;
4. The path is optional, the `*` mask is allowed.

**✅ Examples of working patterns:**

```
https://domain.zone/path/*
https://*.site.com/path
https://*/path/
*://*/*
```

**❌ It won't work:**

```
https://domain.*/*
http*://domain.zone/
https://domain.zone
domain.zone
```

::: tip Future changes
Most invalid patterns now work with a temporary URL resolver, but its correctness is not guaranteed, so it is recommended to disable it and rewrite the URL according to the new rules. In the future, the result of its work will be saved as the original, and it will be removed.
:::

If the old URL matching mode is requiredб you can use the script from the [cookbook](/cookbook#url-matches-from-version-2-x)

### JavaScript properties

- `Isolated environment`: if enabled, the JS code runs in an isolated environment where the JS context of the page is not available, but the DOM is available.
- `All Frames`: if enabled, code will be injected into all frames. Each frame is checked against the original URLs separately.
- `Run at start`: If enabled, the script is injected before the DOM is built, otherwise after, but before resources such as images and frames are loaded. Note that the `DOMContentLoaded` event will no longer be triggered in this case.

### CSS Properties

- `Programmatic injection`:
  - **Enabled**: initially low style priority, but maximized when `!important` is used. Live CSS editing mode is available. Can be used without “developer mode”.
  - **Disabled**: higher style priority by placing `<style/>` at the end of the DOM. Unavailable modes: live CSS. This mode is not available without “developer mode”.
- `Automatic !important`: adds `!important` to all CSS properties in already compiled code.

### Shared rules

“Shared rules” allows you to build dependencies between different rules and explicitly control the order in which they are loaded. Any rule can be marked as “shared” - this will add it to the list of modules of other rules. Only JS and CSS content is taken from the included rules, other properties of the rule are ignored.

### Other features

- The `enabled` rule marker is ignored when the rule is shared and is included by another rule;
- The `save to cloud` marker only indicates that the rule is included in the storage during synchronization and does not perform any additional actions;
- The choice of `SASS` or `SCSS` preprocessor syntax is automatic, based on the presence of `{;}` characters in the code.

## Modules

External JS and CSS modules can be attached to rules, they run before the rules. `https://...` links are supported, the resource type is recognized by the extension.

The module content is loaded and cached in the extension storage, to update it you need to click “download again” in the edit window.

## Storage

Improvements to backup and sync functionality are just forthcoming, but for now backups work **only manually and only in full storage replacement mode**.

### Google Sync

If synchronization is enabled in your browser, you can upload backups to the cloud under your Google account. This method requires no additional authorization or configuration, `storage.sync` is the [standard sync type for extensions](https://developer.chrome.com/docs/extensions/reference/api/storage#storage_areas).

But it is limited to 100kb, so before uploading, the content of all external resources is scrubbed from the storage, all generative data is removed, and the resulting output is compressed using `CompressionStream`. If you still don't have enough space, you can disable cloud synchronization on unimportant scripts.
