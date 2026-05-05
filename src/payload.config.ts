import path from "node:path";
import { fileURLToPath } from "node:url";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { buildConfig } from "payload";
import { cloudinaryStorage } from "payload-cloudinary";
import sharp from "sharp";
import { Media, Users } from "@/collections";
import { cloudinaryOptions, smtpEmail } from "@/configs";
import { requiredEnv } from "@/lib/utils/env";

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
    }
    // components: {
    //   graphics: {
    //     Logo: "/src/components/admin/graphics/Logo#default",
    //     Icon: "/src/components/admin/graphics/Icon#default"
    //   }
    // }
  },
  collections: [Users, Media],
  editor: lexicalEditor(),
  ...(smtpEmail ? { email: smtpEmail } : {}),
  secret: requiredEnv("PAYLOAD_SECRET"),
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts")
  },
  db: mongooseAdapter({
    url: requiredEnv("DATABASE_URL")
  }),
  sharp,
  plugins: [cloudinaryStorage(cloudinaryOptions)]
});
