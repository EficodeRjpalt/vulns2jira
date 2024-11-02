import { getDependabotAlerts } from '../src/githubApi'
import axios from 'axios'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('getDependabotAlerts', () => {
  it('fetches Dependabot alerts with necessary fields', async () => {
    const mockAlerts = [
      {
        security_advisory: { summary: 'Test vulnerability', description: 'Update to fix', severity: 'high' },
        created_at: '2024-10-01T00:00:00Z'
      }
    ]

    // Mock axios.get to resolve with mockAlerts data
    mockedAxios.get.mockResolvedValue({ data: mockAlerts })

    const alerts = await getDependabotAlerts('fake-token', 'owner/repo')

    expect(alerts).toEqual([
      {
        title: 'Test vulnerability',
        recommendation: 'Update to fix',
        createdAt: '2024-10-01T00:00:00Z',
        cveLevel: 'high'
      }
    ])
  })
})
