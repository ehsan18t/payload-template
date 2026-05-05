import type { CollectionBeforeValidateHook, CollectionConfig } from "payload";

const autoGenerateAlt: CollectionBeforeValidateHook = ({ data, req }) => {
  if (data && !data.alt && req.file?.name) {
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
    description: "Media files stored in Cloudinary",
    useAsTitle: "filename"
  },
  access: {
    read: () => true
  },
  hooks: {
    beforeValidate: [autoGenerateAlt]
  },
  fields: [],
  upload: true
};
