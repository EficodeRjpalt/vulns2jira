"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDependabotAlerts = void 0;
const axios_1 = __importDefault(require("axios"));
const getDependabotAlerts = async (token, repo) => {
    const response = await axios_1.default.get(`https://api.github.com/repos/${repo}/dependabot/alerts`, {
        headers: {
            Authorization: `token ${token}`
        }
    });
    return response.data.map((alert) => ({
        title: alert.security_advisory.summary,
        recommendation: alert.security_advisory.description,
        createdAt: alert.created_at,
        cveLevel: alert.security_advisory.severity
    }));
};
exports.getDependabotAlerts = getDependabotAlerts;
