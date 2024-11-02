import axios from 'axios';

export async function getDependabotAlerts(token: string, repo: string) {
  const [owner, repoName] = repo.split('/');
  const url = `https://api.github.com/repos/${owner}/${repoName}/dependabot/alerts`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json'
    }
  });

  return response.data.map((alert: any) => ({
    title: alert.security_advisory.summary,
    recommendation: alert.security_advisory.description,
    createdAt: alert.created_at,
    cveLevel: alert.security_advisory.severity,
  }));
}
