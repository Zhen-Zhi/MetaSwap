import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'n4wvm2mj',
  dataset: 'production',
  apiVersion: '2024-02-03',
  token:
    'skcG1NWatr9DAQ8OjeIwzk7uxBjyTqAmvyiDRL5RonRR8TmoPwe2yjYJEoQ1YX3VXIOL29vnG2EYhWl1kBiJlUbs1Gw6nzcEkrHFlAfmpFrdGP0dlajrC50gL6fxK4uj6R3LVvUWMjMJAtN93xSYeCxBOWJf74pTFdQfCRlvQThgbpjs9Bxs',
  useCdn: false,
})