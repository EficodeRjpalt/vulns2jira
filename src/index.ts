import * as core from '@actions/core'
// import * as github from '@actions/github'
import { getDependabotAlerts } from './githubApi'

// Define a type for the alert items
type Alert = {
  title: string
  recommendation: string
  createdAt: string
  cveLevel: string
}

async function run () {
  try {
    const token = core.getInput('github_token')
    const repo = core.getInput('repo')

    // Apply the Alert[] type to the alerts variable
    const alerts: Alert[] = await getDependabotAlerts(token, repo)

    alerts.forEach((alert: Alert) => {
      core.info(`Title: ${alert.title}`)
      core.info(`Description: ${alert.recommendation}`)
      core.info(`Created At: ${alert.createdAt}`)
      core.info(`CVE Level: ${alert.cveLevel}`)
    })
  } catch (error) {
    // Explicitly cast error to Error to access the message property
    core.setFailed((error as Error).message)
  }
}

run()
