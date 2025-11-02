export type Check =
  | { kind: 'regex'; pattern: string; flags?: string; message: string }
  | { kind: 'exec'; py: string; expect: any; message: string };

export interface CheckResult {
  passed: boolean;
  messages: string[];
}

export const runChecks = (userCode: string, checks: Check[]): CheckResult => {
  const messages: string[] = [];
  let allPassed = true;

  for (const check of checks) {
    if (check.kind === 'regex') {
      const regex = new RegExp(check.pattern, check.flags || '');
      if (!regex.test(userCode)) {
        allPassed = false;
        messages.push(check.message);
      }
    } else if (check.kind === 'exec') {
      // For MVP, we stub runtime checks
      // TODO: Integrate Pyodide for real execution
      messages.push('Runtime checks coming soon!');
    }
  }

  return {
    passed: allPassed,
    messages,
  };
};
