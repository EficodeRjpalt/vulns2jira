"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDependabotAlerts = getDependabotAlerts;
const axios_1 = __importDefault(require("axios"));
async function getDependabotAlerts(token, repo) {
    const [owner, repoName] = repo.split('/');
    const url = `https://api.github.com/repos/${owner}/${repoName}/dependabot/alerts`;
    const response = await axios_1.default.get(url, {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json'
        }
    });
    return response.data.map((alert) => ({
        title: alert.security_advisory.summary,
        recommendation: alert.security_advisory.description,
        createdAt: alert.created_at,
        cveLevel: alert.security_advisory.severity,
    }));
}
