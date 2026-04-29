import type { CollectionBeforeChangeHook, CollectionConfig } from "payload";

const autoGenerateAlt: CollectionBeforeChangeHook = ({ data, req }) => {
  if (!data.alt && req.file?.name) {
    data.alt = req.file.name
      .replace(/\.[^/.]+$/, "")
      .replace(/[-_]/g, " ")
      .replace(/\b\w/g, (char: string) => char.toUpperCase());
  }

  return data;
};

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Assets",
    description: "Media files stored in Cloudinary"
  },
  access: {
    read: () => true
  },
  hooks: {
    beforeChange: [autoGenerateAlt]
  },
  fields: [
    {
      name: "prefix",
      type: "text",
      label: "Folder",
      admin: {
        hidden: true,
        description: "Automatically set based on the collection that uploaded this asset.",
        readOnly: true
      }
    }
  ],
  upload: {
    filesRequiredOnCreate: false
  }
};