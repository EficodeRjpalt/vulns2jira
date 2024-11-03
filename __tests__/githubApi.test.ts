import { getDependabotAlerts } from '../src/githubApi'
import axios from 'axios'
import { generateMockAlerts } from './__mocks__/mockData'
import { Alert, TransformedAlert } from '../src/types'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('getDependabotAlerts', () => {
  it('fetches Dependabot alerts with necessary fields', async () => {
    const mockAlerts: Alert[] = generateMockAlerts()

    // Mock axios.get to resolve with mockAlerts data
    mockedAxios.get.mockResolvedValue({ data: mockAlerts })

    const alerts: TransformedAlert[] = await getDependabotAlerts('fake-token', 'owner/repo')

    // Verify that the alerts are processed correctly
    expect(alerts).toEqual(mockAlerts.map(alert => ({
      title: alert.security_advisory.summary,
      recommendation: alert.security_advisory.description,
      createdAt: alert.created_at,
      cveLevel: alert.security_advisory.severity
    })))
  })
})
