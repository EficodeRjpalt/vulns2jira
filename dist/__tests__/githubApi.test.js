"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const githubApi_1 = require("../src/githubApi");
const axios_1 = __importDefault(require("axios"));
const mockData_1 = require("./__mocks__/mockData");
jest.mock('axios');
const mockedAxios = axios_1.default;
describe('getDependabotAlerts', () => {
    it('fetches Dependabot alerts with necessary fields', async () => {
        const mockAlerts = (0, mockData_1.generateMockAlerts)();
        // Mock axios.get to resolve with mockAlerts data
        mockedAxios.get.mockResolvedValue({ data: mockAlerts });
        const alerts = await (0, githubApi_1.getDependabotAlerts)('fake-token', 'owner/repo');
        // Verify that the alerts are processed correctly
        expect(alerts).toEqual(mockAlerts.map(alert => ({
            title: alert.security_advisory.summary,
            recommendation: alert.security_advisory.description,
            createdAt: alert.created_at,
            cveLevel: alert.security_advisory.severity
        })));
    });
});
