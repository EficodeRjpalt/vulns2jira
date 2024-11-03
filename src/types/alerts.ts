export interface Package {
  ecosystem: string;
  name: string;
}

export interface Dependency {
  package: Package;
  manifest_path: string;
  scope: string;
}

export interface Vulnerability {
  package: Package;
  severity: string;
  vulnerable_version_range: string;
  first_patched_version: {
    identifier: string;
  };
}

export interface SecurityAdvisory {
  ghsa_id: string;
  cve_id: string;
  summary: string;
  description: string;
  vulnerabilities: Vulnerability[];
  severity: string;
  cvss: {
    vector_string: string;
    score: number;
  };
  cwes: {
    cwe_id: string;
    name: string;
  }[];
  identifiers: {
    type: string;
    value: string;
  }[];
  references: {
    url: string;
  }[];
  published_at: string;
  updated_at: string;
  withdrawn_at: string | null;
}

export interface SecurityVulnerability {
  package: Package;
  severity: string;
  vulnerable_version_range: string;
  first_patched_version: {
    identifier: string;
  };
}

export interface Alert {
  number: number;
  state: string;
  dependency: Dependency;
  security_advisory: SecurityAdvisory;
  security_vulnerability: SecurityVulnerability;
  url: string;
  html_url: string;
  created_at: string;
  updated_at: string;
  dismissed_at: string | null;
  dismissed_by: {
    login: string;
    id: number;
    node_id: string;
    avatar_url: string;
    gravatar_id: string;
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
  } | null;
  dismissed_reason: string | null;
  dismissed_comment: string | null;
  fixed_at: string | null;
}

export interface TransformedAlert {
  title: string;
  recommendation: string;
  createdAt: string;
  cveLevel: string;
}
