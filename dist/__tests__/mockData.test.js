"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mockData_1 = require("./__mocks__/mockData");
const date_fns_1 = require("date-fns");
describe('generateMockAlerts', () => {
    it('should generate mock alerts with the correct structure and content', () => {
        const mockAlerts = (0, mockData_1.generateMockAlerts)();
        const currentDate = (0, date_fns_1.format)(new Date(), "yyyy-MM-dd'T'HH:mm:ss'Z'");
        expect(mockAlerts).toHaveLength(5);
        expect(mockAlerts[0]).toMatchObject({
            number: expect.any(Number),
            state: expect.any(String),
            dependency: {
                package: {
                    ecosystem: expect.any(String),
                    name: expect.any(String)
                },
                manifest_path: expect.any(String),
                scope: expect.any(String)
            },
            security_advisory: {
                ghsa_id: expect.any(String),
                cve_id: expect.any(String),
                summary: expect.any(String),
                description: expect.any(String),
                vulnerabilities: expect.any(Array),
                severity: expect.any(String),
                cvss: {
                    vector_string: expect.any(String),
                    score: expect.any(Number)
                },
                cwes: expect.any(Array),
                identifiers: expect.any(Array),
                references: expect.any(Array),
                published_at: expect.any(String),
                updated_at: expect.any(String),
                withdrawn_at: null
            },
            security_vulnerability: {
                package: {
                    ecosystem: expect.any(String),
                    name: expect.any(String)
                },
                severity: expect.any(String),
                vulnerable_version_range: expect.any(String),
                first_patched_version: {
                    identifier: expect.any(String)
                }
            },
            url: expect.any(String),
            html_url: expect.any(String),
            created_at: expect.any(String),
            updated_at: expect.any(String),
            dismissed_at: expect.any(String),
            dismissed_by: expect.any(Object),
            dismissed_reason: expect.any(String),
            dismissed_comment: expect.any(String),
            fixed_at: null
        });
        const alertsWithCurrentDate = mockAlerts.filter(alert => alert.created_at === currentDate);
        expect(alertsWithCurrentDate).toHaveLength(2);
    });
});
