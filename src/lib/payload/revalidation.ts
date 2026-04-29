import { revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook
} from "payload";

/**
 * Creates an afterChange hook that revalidates cache tags for a collection.
 * Revalidates: the collection-level tag + slug-specific and id-specific tags.
 */
export function createCollectionAfterChangeHook(collectionTag: string): CollectionAfterChangeHook {
  return async ({ doc }) => {
    try {
      revalidateTag(collectionTag, "default");
      if (doc.slug) {
        revalidateTag(`${collectionTag}-${doc.slug}`, "default");
      }
      revalidateTag(`${collectionTag}-${doc.id}`, "default");
    } catch {
      // No-op outside Next.js request context (e.g., seed scripts, CLI)
    }
    return doc;
  };
}

/**
 * Creates an afterDelete hook that revalidates cache tags for a collection.
 */
export function createCollectionAfterDeleteHook(collectionTag: string): CollectionAfterDeleteHook {
  return async ({ doc }) => {
    try {
      revalidateTag(collectionTag, "default");
      if (doc.slug) {
        revalidateTag(`${collectionTag}-${doc.slug}`, "default");
      }
      revalidateTag(`${collectionTag}-${doc.id}`, "default");
    } catch {
      // No-op outside Next.js request context (e.g., seed scripts, CLI)
    }
    return doc;
  };
}

/**
 * Creates an afterChange hook for a global that revalidates its tag.
 */
export function createGlobalAfterChangeHook(globalTag: string): GlobalAfterChangeHook {
  return async ({ doc }) => {
    try {
      revalidateTag(globalTag, "default");
    } catch {
      // No-op outside Next.js request context (e.g., seed scripts, CLI)
    }
    return doc;
  };
}
