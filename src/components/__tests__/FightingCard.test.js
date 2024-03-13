import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FighterCard from '../FighterCard.vue'

describe('FighterCard display properly', () => {
  it('renders properly', async () => {
    const wrapperCard = mount(FighterCard, { props: { name: 'Hello Vitest', percentage: 100 } })
    expect(wrapperCard.text()).toContain('Hello Vitest')
  })
})
