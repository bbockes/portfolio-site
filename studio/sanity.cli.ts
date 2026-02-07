import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '2fx5od72',
    dataset: 'production'
  },
  deployment: {
    autoUpdates: true,
  },
})
