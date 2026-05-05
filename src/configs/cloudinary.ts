import type { CloudinaryStorageOptions } from "payload-cloudinary";
import { optionalBooleanEnv, optionalEnv, requiredEnvGroup } from "@/lib/utils/env";

const cloudinaryFolder = optionalEnv("CLOUDINARY_FOLDER");
const cloudinaryVersioningEnabled = optionalBooleanEnv("CLOUDINARY_VERSIONING_ENABLED") === true;

export const cloudinaryOptions: CloudinaryStorageOptions = {
  collections: {
    media: true
  },
  config: requiredEnvGroup("Cloudinary", {
    api_key: "CLOUDINARY_API_KEY",
    api_secret: "CLOUDINARY_API_SECRET",
    cloud_name: "CLOUDINARY_CLOUD_NAME"
  }),
  ...(cloudinaryFolder ? { folder: cloudinaryFolder } : {}),
  customFields: [
    {
      name: "alt",
      type: "text",
      label: "Alt Text",
      required: true,
      admin: {
        description: "Alternative text for accessibility. Generated from the filename on upload."
      }
    },
    {
      name: "caption",
      type: "text",
      label: "Caption"
    },
    {
      name: "tags",
      type: "array",
      label: "Tags",
      fields: [
        {
          name: "tag",
          type: "text",
          required: true
        }
      ]
    },
    {
      name: "prefix",
      type: "text",
      label: "Folder",
      admin: {
        description: "Optional folder prefix inside the configured Cloudinary folder."
      }
    }
  ],
  ...(cloudinaryVersioningEnabled
    ? {
        versioning: {
          autoInvalidate: true,
          enabled: true,
          storeHistory: true
        }
      }
    : {})
};
