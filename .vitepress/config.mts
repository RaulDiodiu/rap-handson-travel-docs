import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'RAP Hands-On: Travel',
  description: 'ABAP RESTful Application Programming Model (RAP) Hands-On Training by msg group',
  base: '/rap-handson-travel-docs/',
  srcExclude: ['BACKUP/**', '.ui-samples/**', '**/node_modules/**'],
  ignoreDeadLinks: true,
  vite: {
    assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.JPEG']
  },

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Installation', link: '/installation/Installation' },
      { text: 'Start Training', link: '/part1/README' }
    ],

    sidebar: {
      '/installation/': [
        {
          text: 'Installation & Setup',
          items: [
            { text: 'Installation Guide', link: '/installation/Installation' },
            { text: 'Installation (Mac)', link: '/installation/InstallationMac' },
            { text: 'Installation (Trial)', link: '/installation/InstallationTrial' },
            { text: 'Shortcuts', link: '/installation/Shortcuts' }
          ]
        }
      ],
      '/': [
        { text: 'Part 1 — Introduction', link: '/part1/README' },
        { text: 'Part 2 — Database Tables', link: '/part2/README' },
        {
          text: 'Part 3 — CDS Views (VDM)',
          items: [
            { text: '3a. Creating the Virtual Data Model', link: '/part3/3a' },
            { text: '3b. Adding Master Data Associations', link: '/part3/3b' },
            { text: '3c. Projection Views', link: '/part3/3c' },
            { text: '3d. Creating Metadata Extensions', link: '/part3/3d' },
            { text: '3e. Calculating Virtual Elements', link: '/part3/3e' }
          ]
        },
        {
          text: 'Part 4 — Behavior Definition & Projection',
          items: [
            { text: '4a. Behavior Definition', link: '/part4/4a' },
            { text: '4b. Enabling Draft', link: '/part4/4b' },
            { text: '4c. Projecting the Behavior Definition', link: '/part4/4c' }
          ]
        },
        {
          text: 'Part 5 — Publishing the Business Service',
          items: [
            { text: '5a. Publishing the Business Service', link: '/part5/README' },
            { text: '5b. Basic Authorizations (optional)', link: '/part5/5b' }
          ]
        },
        {
          text: 'Part 6 — Adding Transactional Behavior',
          items: [
            { text: '6a. Behavior Pool & Actions', link: '/part6/6a' },
            { text: '6a. Behavior Pool & Actions (Short)', link: '/part6/6aSHORT' },
            { text: '6b. Determinations', link: '/part6/6b' },
            { text: '6b. Determinations (Short)', link: '/part6/6bSHORT' },
            { text: '6c. Validations', link: '/part6/6c' },
            { text: '6c. Validations (Short)', link: '/part6/6cSHORT' },
            { text: '6d. Feature Control (optional)', link: '/part6/6d' }
          ]
        },
        {
          text: 'Part 7 — SAP Fiori List Report',
          items: [
            { text: '7a. Fiori Tools / BAS Capabilities', link: '/part7/7a' },
            { text: '7b. App Creation', link: '/part7/7b' },
            { text: '7b. App Creation (msg internal)', link: '/part7/7b_s4d' },
            { text: '7c. Object Page Sections for Child Entities', link: '/part7/7c' },
            { text: '7d. Side Effect via Guided Development', link: '/part7/7d' }
          ]
        },
        { text: 'Part 8 — Deployment', link: '/part8/README' },
        { text: 'Part 9 — Extending the List Report', link: '/part9/README' },
        {
          text: 'Part 10 — CDS Custom Entity',
          items: [
            { text: '1. Introduction', link: '/part10/1.CustomEntityIntro' },
            { text: '2. Custom Entity as Value Help', link: '/part10/2.CustomEntity_as_vh' },
            { text: '3. RAP + CDS Custom Entity', link: '/part10/3.Rap-CDS_CustomEntity' }
          ]
        }
      ]
    },

    outline: {
      level: [2, 3]
    },

    footer: {
      message: 'RAP Hands-On Training by msg group'
    }
  }
})
