"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const githubApi_1 = require("../src/githubApi");
const axios_1 = __importDefault(require("axios"));
jest.mock('axios');
const mockedAxios = axios_1.default;
describe('getDependabotAlerts', () => {
    it('fetches Dependabot alerts with necessary fields', async () => {
        const mockAlerts = [
            {
                security_advisory: { summary: 'Test vulnerability', description: 'Update to fix', severity: 'high' },
                created_at: '2024-10-01T00:00:00Z'
            },
        ];
        // Mock axios.get to resolve with mockAlerts data
        mockedAxios.get.mockResolvedValue({ data: mockAlerts });
        const alerts = await (0, githubApi_1.getDependabotAlerts)('fake-token', 'owner/repo');
        expect(alerts).toEqual([
            {
                title: 'Test vulnerability',
                recommendation: 'Update to fix',
                createdAt: '2024-10-01T00:00:00Z',
                cveLevel: 'high',
            },
        ]);
    });
});
