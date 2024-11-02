import axios from 'axios'

// Define the structure of the alert data returned by GitHub API
interface DependabotAlert {
  number: number;
  state: 'auto_dismissed' | 'dismissed' | 'fixed' | 'open';
  dependency: {
    package: {
      ecosystem: string;
      name: string;
    };
    manifest_path: string;
    scope: 'development' | 'runtime' | null;
  };
  security_advisory: {
    ghsa_id: string;
    cve_id: string | null;
    summary: string;
    description: string;
    vulnerabilities: {
      package: {
        ecosystem: string;
        name: string;
      };
      severity: 'low' | 'medium' | 'high' | 'critical';
      vulnerable_version_range: string;
      first_patched_version: {
        identifier: string;
      } | null;
    }[];
    severity: 'low' | 'medium' | 'high' | 'critical';
    cvss: {
      score: number;
      vector_string: string | null;
    };
    cwes: {
      cwe_id: string;
      name: string;
    }[];
    identifiers: {
      type: 'CVE' | 'GHSA';
      value: string;
    }[];
    references: {
      url: string;
    }[];
    published_at: string;
    updated_at: string;
    withdrawn_at: string | null;
  };
  security_vulnerability: {
    package: {
      ecosystem: string;
      name: string;
    };
    severity: 'low' | 'medium' | 'high' | 'critical';
    vulnerable_version_range: string;
    first_patched_version: {
      identifier: string;
    } | null;
  };
  url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  dismissed_at: string | null;
  dismissed_by: {
    name: string | null;
    email: string | null;
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string | null;
    url: string;
    html_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    starred_url: string;
    subscriptions_url: string;
    organizations_url: string;
    repos_url: string;
    events_url: string;
    received_events_url: string;
    type: string;
    site_admin: boolean;
    starred_at: string;
    user_view_type: string;
  } | null;
  dismissed_reason: 'fix_started' | 'inaccurate' | 'no_bandwidth' | 'not_used' | 'tolerable_risk' | null;
  dismissed_comment: string | null;
  fixed_at: string | null;
  auto_dismissed_at: string | null;
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

  const response = await axios.get<DependabotAlert[]>(url, {
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
