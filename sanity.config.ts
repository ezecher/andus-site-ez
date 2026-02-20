"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/env";

// Singleton document types that should not be creatable
const singletonTypes = new Set(["siteSettings", "homePage", "humanOsPage", "approachPage"]);

export default defineConfig({
  name: "andus-labs",
  title: "Andus Labs CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: Site Settings
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.listItem()
              .title("Home Page")
              .id("homePage")
              .child(
                S.document()
                  .schemaType("homePage")
                  .documentId("homePage")
              ),
            S.listItem()
              .title("Human OS Page")
              .id("humanOsPage")
              .child(
                S.document()
                  .schemaType("humanOsPage")
                  .documentId("humanOsPage")
              ),
            S.listItem()
              .title("Approach Page")
              .id("approachPage")
              .child(
                S.document()
                  .schemaType("approachPage")
                  .documentId("approachPage")
              ),
            S.divider(),
            // Team Members
            S.documentTypeListItem("teamMember").title("Team Members"),
            // Field Notes
            S.documentTypeListItem("fieldNoteItem").title("Field Notes"),
          ]),
    }),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
    // Prevent creating new singletons
    templates: (templates) =>
      templates.filter(
        ({ schemaType }) => !singletonTypes.has(schemaType)
      ),
  },
  document: {
    // Prevent singletons from being duplicated/deleted
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action &&
              ["publish", "discardChanges", "restore"].includes(action)
          )
        : input,
  },
});
