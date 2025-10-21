import { beforeAll, afterAll, afterEach, describe, expect, it, vi } from 'vitest'
import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './App'

// Simple fetch mock
const mockTracks = {
  data: [
    {
      id: 1,
      attributes: {
        title: 'Track One',
        attachments: [{ url: 'https://example.com/one.mp3' }],
      },
    },
    {
      id: 2,
      attributes: {
        title: 'Track Two',
        attachments: [{ url: 'https://example.com/two.mp3' }],
      },
    },
  ],
}

const fetchSpy = vi.spyOn(globalThis, 'fetch')

beforeAll(() => {
  fetchSpy.mockResolvedValue({
    ok: true,
    json: async () => mockTracks,
  } as unknown as Response)
})

afterEach(() => {
  vi.clearAllMocks()
})

afterAll(() => {
  fetchSpy.mockRestore()
})

describe('App', () => {
  it('рендерит заголовок', () => {
    render(<App />)
    expect(screen.getByRole('heading', { level: 1, name: /Musicfun Player/i })).toBeInTheDocument()
  })

  it('подгружает и отображает список треков', async () => {
    render(<App />)

    await waitFor(() => {
      // после загрузки не должно быть пустого состояния
      expect(screen.queryByText(/No Tracks/i)).not.toBeInTheDocument()
    })

    const list = screen.getByRole('list')
    const items = within(list).getAllByRole('listitem')
    expect(items.length).toBe(2)
    expect(within(items[0]).getByText('Track One')).toBeInTheDocument()
    expect(within(items[1]).getByText('Track Two')).toBeInTheDocument()
  })

  it('подсвечивает выбранный трек после клика и работает reset', async () => {
    const user = userEvent.setup()
    render(<App />)

    const list = await screen.findByRole('list')
    const items = within(list).getAllByRole('listitem')

    await user.click(within(items[1]).getByText('Track Two'))

    expect(items[1].className).toContain('track')

    await user.click(screen.getByRole('button', { name: /reset/i }))
    expect(items[1].className).not.toContain('track')
  })

  it('рендерит тег audio для каждого трека', async () => {
    render(<App />)
    const list = await screen.findByRole('list')
    const items = within(list).getAllByRole('listitem')

    const audios = items.map((li) => li.querySelector('audio'))
    expect(audios.filter(Boolean).length).toBe(2)
  })
})
