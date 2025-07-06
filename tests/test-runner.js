const fs = require('fs');
const path = require('path');

// Simple test framework for Node.js
class SimpleTestRunner {
  constructor() {
    this.tests = [];
    this.suites = [];
    this.currentSuite = null;
    this.beforeEachFn = null;
    this.results = {
      passed: 0,
      failed: 0,
      errors: []
    };
  }

  describe(name, fn) {
    this.currentSuite = { name, tests: [], beforeEach: this.beforeEachFn };
    this.beforeEachFn = null; // Reset for next suite
    fn();
    this.suites.push(this.currentSuite);
    this.currentSuite = null;
  }

  test(name, fn) {
    const testCase = { name, fn };
    if (this.currentSuite) {
      this.currentSuite.tests.push(testCase);
    } else {
      this.tests.push(testCase);
    }
  }

  beforeEach(fn) {
    if (this.currentSuite) {
      this.currentSuite.beforeEach = fn;
    } else {
      this.beforeEachFn = fn;
    }
  }

  expect(value) {
    return {
      toBe: (expected) => {
        if (value !== expected) {
          throw new Error(`Expected ${expected}, got ${value}`);
        }
      },
      toEqual: (expected) => {
        if (JSON.stringify(value) !== JSON.stringify(expected)) {
          throw new Error(`Expected ${JSON.stringify(expected)}, got ${JSON.stringify(value)}`);
        }
      },
      toContain: (expected) => {
        if (!value || !value.includes(expected)) {
          throw new Error(`Expected "${value}" to contain "${expected}"`);
        }
      },
      toBeInstanceOf: (expected) => {
        if (!(value instanceof expected)) {
          throw new Error(`Expected ${value} to be instance of ${expected.name}`);
        }
      },
      toHaveBeenCalled: () => {
        if (!value || !value.called) {
          throw new Error('Expected function to have been called');
        }
      },
      toHaveBeenCalledWith: (...args) => {
        if (!value || !value.calledWith || JSON.stringify(value.calledWith) !== JSON.stringify(args)) {
          throw new Error(`Expected function to have been called with ${JSON.stringify(args)}`);
        }
      }
    };
  }

  async runTest(test, beforeEachFn = null) {
    try {
      if (beforeEachFn) {
        await beforeEachFn();
      }
      await test.fn();
      this.results.passed++;
      console.log(`✓ ${test.name}`);
    } catch (error) {
      this.results.failed++;
      this.results.errors.push({ test: test.name, error: error.message });
      console.log(`✗ ${test.name}: ${error.message}`);
    }
  }

  async runSuite(suite) {
    console.log(`\n📦 ${suite.name}`);
    for (const test of suite.tests) {
      await this.runTest(test, suite.beforeEach);
    }
  }

  async run() {
    console.log('🧪 Running tests...\n');
    
    // Run standalone tests
    for (const test of this.tests) {
      await this.runTest(test, this.beforeEachFn);
    }

    // Run test suites
    for (const suite of this.suites) {
      await this.runSuite(suite);
    }

    // Print summary
    console.log('\n📊 Test Results:');
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    
    if (this.results.errors.length > 0) {
      console.log('\n🔍 Errors:');
      this.results.errors.forEach(({ test, error }) => {
        console.log(`  - ${test}: ${error}`);
      });
    }

    return this.results.failed === 0;
  }
}

// Mock functions for testing
const jest = {
  fn: () => {
    const mockFn = (...args) => {
      mockFn.called = true;
      mockFn.calledWith = args;
      if (mockFn.implementation) {
        return mockFn.implementation(...args);
      }
      return mockFn.mockReturnValue;
    };
    
    mockFn.called = false;
    mockFn.calledWith = null;
    mockFn.mockReturnValue = undefined;
    
    mockFn.mockImplementation = (fn) => {
      mockFn.implementation = fn;
      return mockFn;
    };
    
    mockFn.mockResolvedValue = (value) => {
      mockFn.mockReturnValue = Promise.resolve(value);
      mockFn.implementation = () => Promise.resolve(value);
      return mockFn;
    };
    
    mockFn.mockRejectedValue = (value) => {
      mockFn.mockReturnValue = Promise.reject(value);
      mockFn.implementation = () => Promise.reject(value);
      return mockFn;
    };
    
    mockFn.mockReturnThis = () => {
      mockFn.mockReturnValue = mockFn;
      return mockFn;
    };
    
    mockFn.mockReturnValue = (value) => {
      mockFn._returnValue = value;
      mockFn.implementation = () => value;
      return mockFn;
    };
    
    return mockFn;
  },
  
  clearAllMocks: () => {
    // Implementation for clearing mocks
  }
};

// Global test functions
global.describe = (name, fn) => global.testRunner.describe(name, fn);
global.test = (name, fn) => global.testRunner.test(name, fn);
global.expect = (value) => global.testRunner.expect(value);
global.beforeEach = (fn) => global.testRunner.beforeEach(fn);
global.jest = jest;

// Initialize test runner
global.testRunner = new SimpleTestRunner();

module.exports = SimpleTestRunner;
