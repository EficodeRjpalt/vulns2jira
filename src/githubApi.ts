import axios from 'axios'
import { Alert, TransformedAlert } from '../src/types'

export const getDependabotAlerts = async (token: string, repo: string): Promise<TransformedAlert[]> => {
  const response = await axios.get(`https://api.github.com/repos/${repo}/dependabot/alerts`, {
    headers: {
      Authorization: `token ${token}`
    }
  })

  return response.data.map((alert: Alert) => ({
    title: alert.security_advisory.summary,
    recommendation: alert.security_advisory.description,
    createdAt: alert.created_at,
    cveLevel: alert.security_advisory.severity
  }))
}
