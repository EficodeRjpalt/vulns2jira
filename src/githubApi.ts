import axios from 'axios'

// Define the structure of the alert data returned by GitHub API
interface DependabotAlert {
  security_advisory: {
    summary: string;
    description: string;
    severity: string;
  };
  created_at: string;
}

// Define the return type for the alerts
interface ProcessedAlert {
  title: string;
  recommendation: string;
  createdAt: string;
  cveLevel: string;
}

export async function getDependabotAlerts (token: string, repo: string): Promise<ProcessedAlert[]> {
  const [owner, repoName] = repo.split('/')
  const url = `https://api.github.com/repos/${owner}/${repoName}/dependabot/alerts`

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json'
    }
  })

  return response.data.map((alert: DependabotAlert) => ({
    title: alert.security_advisory.summary,
    recommendation: alert.security_advisory.description,
    createdAt: alert.created_at,
    cveLevel: alert.security_advisory.severity
  }))
}
