import path from "node:path";
import { fileURLToPath } from "node:url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { nodemailerAdapter } from "@payloadcms/email-nodemailer";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { cloudinaryStorage } from "payload-cloudinary";
import sharp from "sharp";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname, "..")
    },
    meta: {
      titleSuffix: "| Admin",
      description: "Administration panel"
    },
    // components: {
    //   graphics: {
    //     Logo: "/src/components/admin/graphics/Logo#default",
    //     Icon: "/src/components/admin/graphics/Icon#default"
    //   }
    // }
  },
  collections: [Users, Media ],
  editor: lexicalEditor(),
  email: nodemailerAdapter({
    defaultFromAddress: process.env.SMTP_FROM_ADDRESS!,
    defaultFromName: process.env.SMTP_FROM_NAME!,
    transportOptions: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    }
  }),
  secret: process.env.PAYLOAD_SECRET!,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts")
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL!
  }),
  sharp,
  plugins: [
    cloudinaryStorage({
      collections: {
        media: true
      },
      config: {
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!
      },
      folder: "media",
      disableLocalStorage: true,
      supportDynamicFolderMode: true,
      publicID: {
        enabled: true,
        useFilename: true,
        uniqueFilename: true
      },
      customFields: [
        {
          name: "alt",
          type: "text",
          label: "Alt Text",
          admin: {
            description: "Alternative text for accessibility"
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
        }
      ]
    })
  ]
});