'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {defineConfig} from 'sanity'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId, title} from './sanity/env'
import {schema} from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  apiVersion,
  schema,
  title,
  plugins: [],
})
