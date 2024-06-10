# Storage

Improvements to backup and sync functionality are just forthcoming, but for now backups work **only manually and only in full storage replacement mode**.

### Google Sync

If synchronization is enabled in your browser, you can upload backups to the cloud under your Google account. This method requires no additional authorization or configuration, `storage.sync` is the [standard sync type for extensions](https://developer.chrome.com/docs/extensions/reference/api/storage#storage_areas).

But it is limited to 100kb, so before uploading, the content of all external resources is scrubbed from the storage, all generative data is removed, and the resulting output is compressed using `CompressionStream`. If you still don't have enough space, you can disable cloud synchronization on unimportant scripts.
