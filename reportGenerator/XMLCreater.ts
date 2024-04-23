import { getJunitXml } from "junit-xml";
import fs from "fs";

require('dotenv').config();
console.log("running test reports generator");

const testSuiteReport = {
  name: "Suites container",
  time: 100,
  suites: [
    {
      name: "Mixed results suite",
      timestamp: new Date(Date.UTC(1989, 10, 3)),
      hostname: "some-hostname",
      time: 1.1337,
      testCases: [
        {
          name: "Successful test",
          assertions: 2,
          classname: "successful-test-class",
          time: 0.72,
        },
        {
          name: "Skipped test",
          assertions: 2,
          skipped: true,
        },
        {
          name: "Unskipped test",
          skipped: false,
        },
        {
          name: "Failing test",
          failures: [
            { message: "First failure", type: "some-type" },
            { message: "Second failure" },
          ],
        },
        {
          name: "Another failing test",
          failures: [{ message: "Just one failure" }],
        },
        {
          name: "Erroring test",
          errors: [
            { message: "First error", type: "some-type" },
            { message: "Second error" },
          ],
        },
        {
          name: "Another erroring test",
          errors: [{ message: "Just one error" }],
        },
        {
          name: "Test with output",
          systemOut: ["First output", "Second output"],
        },
        {
          name: "Test with single output",
          systemOut: ["Only output"],
        },
        {
          name: "Test with error output",
          systemErr: ["First error output", "Second error output"],
        },
        {
          name: "Test with single error output",
          systemErr: ["Only error output"],
        },
      ],
    },
  ],
} as any;

for (let i = 0; i < (process.env.SUITES_COUNT || 1000); i++) {
    const newSuite = {
        name: "Test Suite no: " + i,
        timestamp: new Date(Date.UTC(1989, 10, 3)),
        hostname: "some-hostname " + i,
        time: 2,
        testCases: [] as any,
    }
    if (process.env.STEPLET_NUMBER) {
        newSuite.name = "Test Suite no: " + i + " steplet: " + process.env.STEPLET_NUMBER;
    }
    for (let i = 0; i < (process.env.REPORTS_COUNT || 1000); i++) {
      newSuite.testCases.push({
            name: "Random test " + i,
            assertions: 20,
            classname: "successful-test-class" + i,
            time: 1,
        });
    }
    testSuiteReport.suites.push(newSuite);
}

const junitXml = getJunitXml(testSuiteReport);
// write to a file in the current directory
fs.writeFileSync("junit.xml", junitXml);
