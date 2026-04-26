import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { schemaTypes } from "./schemas"

export default defineConfig({
  name: "ortholab-studio",
  title: "OrthoLab Center",
  projectId: "9w7c2bo9",
  dataset: "production",
  plugins: [structureTool()],
  schema: {
    types: schemaTypes,
  },
})
