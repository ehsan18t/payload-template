# Cloudinary

This template uses `payload-cloudinary` for the `media` collection. The Cloudinary-specific setup lives in `src/configs/cloudinary.ts`, while `src/payload.config.ts` only wires that config into Payload.

## Required Variables

```bash
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Optional Variables

```bash
CLOUDINARY_FOLDER=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

`CLOUDINARY_FOLDER` sets the root folder passed to `payload-cloudinary`. Leave it blank to use the package default.

`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is only needed when frontend code builds Cloudinary transformation URLs directly.

## Defaults

The template does not override the plugin defaults for:

- local storage disabling
- PDF thumbnails
- Dynamic Folder Mode support
- public ID generation

That keeps the config focused on the parts this template actually wants to customize: custom media fields, folder prefixes, and optional versioning.

If you want to change one of those package defaults later, update `src/configs/cloudinary.ts` directly.

## Versioning

`payload-cloudinary` keeps versioning off by default. Enable it with:

```bash
CLOUDINARY_VERSIONING_ENABLED=true
```

In this template, that single flag enables versioning with CDN invalidation and history tracking.

Accepted boolean values are `true`, `false`, `1`, `0`, `yes`, `no`, `on`, and `off`.

## Folder Prefixes

The `media` collection gets a generic `prefix` field through `cloudinaryStorage.customFields`. `payload-cloudinary` uses `data.prefix` when uploading, so any feature can route media into a contextual folder.

Examples:

```txt
products/123213-sdfjhdsf-dsfujsd
brands/acme
blog/my-post-slug
users/9a2b1c
```

When creating media through the Local API, pass `prefix` with the upload data:

```ts
await payload.create({
  collection: "media",
  data: {
    alt: "Front view",
    prefix: `products/${product.id}`
  },
  file
});
```

Keep folder naming domain-specific in the feature that owns the upload. The template only provides the general `prefix` field and Cloudinary plugin wiring.

## Type Generation

Run this after changing Cloudinary custom fields or toggling versioning, since version history fields depend on the config:

```bash
pnpm generate:types
```
